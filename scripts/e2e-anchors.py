#!/usr/bin/env python3
"""
Mobile end-to-end check for in-page anchors on the home page.

Verifies, on a mobile viewport:
  1. The home page renders without a crash (visible content, no blank screen)
     and without runtime/console errors.
  2. A direct deep link (/#contact and other anchors) lands on the matching
     section, even though those sections load in a deferred chunk.
  3. The page stays where the anchor put it (the hero video player used to
     steal focus and drag the page back to the top).
  4. Clicking the header CTA scrolls to the sample request form.
  5. Loading the home page WITHOUT an anchor stays at the top.

Usage: python3 scripts/e2e-anchors.py [base_url]
Exit code 1 on any failure.
"""
import asyncio
import sys

from playwright.async_api import async_playwright

BASE_URL = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080").rstrip("/")
MOBILE_VIEWPORT = {"width": 390, "height": 844}
# Anchors reachable from the home page: the form plus lazily rendered sections.
ANCHORS = ["contact", "faq", "rse", "two-ways", "market-proof", "business-math", "closet-syndrome"]
# How long the anchor may take to settle (deferred chunk + fonts + video).
SETTLE_MS = 6000
IGNORED_CONSOLE = (
    "vimeo",
    "favicon",
    "googletagmanager",
    "google-analytics",
    "preload",
    "cannot be given refs",
)

failures: list[str] = []
checks: list[str] = []


def check(condition: bool, label: str, detail: str = "") -> None:
    if condition:
        checks.append(f"ok   {label}")
    else:
        failures.append(f"{label}{f' -> {detail}' if detail else ''}")


async def anchor_offset(page, anchor: str):
    """Distance in px between the top of the target section and the viewport top."""
    return await page.evaluate(
        """(id) => {
             const el = document.getElementById(id);
             if (!el) return null;
             return Math.round(el.getBoundingClientRect().top);
           }""",
        anchor,
    )


async def page_is_alive(page) -> bool:
    return await page.evaluate(
        "() => { const r = document.getElementById('root');"
        " return !!r && r.children.length > 0 && document.body.innerText.trim().length > 200; }"
    )


async def run() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport=MOBILE_VIEWPORT, is_mobile=True, has_touch=True)
        page = await context.new_page()

        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        page.on(
            "console",
            lambda m: errors.append(f"console.error: {m.text}")
            if m.type == "error" and not any(s in m.text.lower() for s in IGNORED_CONSOLE)
            else None,
        )

        # --- 1. home page without an anchor stays at the top ----------------
        await page.goto(f"{BASE_URL}/", wait_until="domcontentloaded")
        await page.wait_for_timeout(SETTLE_MS)
        check(await page_is_alive(page), "home page renders content (no blank screen)")
        scroll_y = await page.evaluate("() => Math.round(window.scrollY)")
        check(scroll_y < 100, "home page without an anchor stays at the top", f"scrollY={scroll_y}")

        # --- 2. deep links land on their section ----------------------------
        for anchor in ANCHORS:
            errors.clear()
            await page.goto(f"{BASE_URL}/#{anchor}", wait_until="domcontentloaded")
            await page.wait_for_timeout(SETTLE_MS)

            check(await page_is_alive(page), f"/#{anchor} renders content (no crash)")

            offset = await anchor_offset(page, anchor)
            check(offset is not None, f"/#{anchor} renders the target section")
            if offset is not None:
                # The section top must sit at the top of the viewport (small
                # tolerance for sticky headers and rounding).
                check(abs(offset) <= 120, f"/#{anchor} lands on its section", f"section top at {offset}px")

                # And it must stay there, not be dragged away afterwards.
                await page.wait_for_timeout(1500)
                after = await anchor_offset(page, anchor)
                check(
                    after is not None and abs(after) <= 120,
                    f"/#{anchor} stays on its section after settling",
                    f"section top at {after}px",
                )

            check(not errors, f"/#{anchor} loads without runtime errors", "; ".join(errors[:3]))

        # --- 3. header CTA scrolls to the form ------------------------------
        errors.clear()
        await page.goto(f"{BASE_URL}/", wait_until="domcontentloaded")
        await page.wait_for_timeout(SETTLE_MS)
        cta = page.locator("a[href='#contact']").first
        await cta.click()
        await page.wait_for_timeout(2500)
        offset = await anchor_offset(page, "contact")
        check(
            offset is not None and offset < MOBILE_VIEWPORT["height"] * 0.6,
            "header CTA scrolls to the sample request form",
            f"section top at {offset}px",
        )
        check(await page_is_alive(page), "page still alive after the CTA click")
        check(not errors, "CTA navigation produces no runtime errors", "; ".join(errors[:3]))

        await browser.close()


asyncio.run(run())

for line in checks:
    print(line)

if failures:
    print(f"\nE2E anchor checks FAILED ({len(failures)}):", file=sys.stderr)
    for f in failures:
        print(f"  - {f}", file=sys.stderr)
    sys.exit(1)

print(f"\nE2E anchor checks passed ({len(checks)} assertions) on {BASE_URL}")
