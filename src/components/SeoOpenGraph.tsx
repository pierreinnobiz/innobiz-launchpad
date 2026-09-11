import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  SITE_URL,
  ogImageAltFor,
  ogImageFor,
  ogLocaleAlternates,
  ogLocaleFor,
} from '@/lib/seo';

interface SeoOpenGraphProps {
  title: string;
  description: string;
  /** Route path, e.g. "/" or "/legal". */
  path: string;
  type?: 'website' | 'article';
}

/**
 * Localised Open Graph and Twitter tags. Rendered per route; Helmet dedupes
 * by property/name so these replace the static fallbacks in index.html.
 */
const SeoOpenGraph: React.FC<SeoOpenGraphProps> = ({
  title,
  description,
  path,
  type = 'website',
}) => {
  const { language } = useLanguage();
  const url = `${SITE_URL}${path}`;
  const image = ogImageFor(language);

  return (
    <Helmet>
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Tolia by Innobiz" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAltFor(language)} />
      <meta property="og:locale" content={ogLocaleFor(language)} />
      {ogLocaleAlternates(language).map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={ogImageAltFor(language)} />
    </Helmet>
  );
};

export default SeoOpenGraph;
