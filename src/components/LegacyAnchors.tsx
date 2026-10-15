import React from 'react';

/**
 * Anciennes ancres de la page d'accueil (#two-ways, #rse, #twist-and-mist…) : les sections ont été regroupées,
 * mais les liens déjà partagés (emails, favoris, tests) continuent d'atterrir au bon endroit.
 */
const LegacyAnchors: React.FC<{ ids: string[] }> = ({ ids }) => (
  <>
    {ids.map((id) => (
      <span key={id} id={id} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 block h-0 w-0" />
    ))}
  </>
);

export default LegacyAnchors;
