# AGENTS.md

- Inter is self-hosted via @fontsource/inter (weights 300-700 imported in src/main.tsx); never reintroduce Google Fonts, to avoid an external connection on first load.
- The hero Vimeo player mounts only on screens >= 1024 px without reduced motion or data saver; elsewhere the still image is the hero, to keep mobile LCP and data usage low.
