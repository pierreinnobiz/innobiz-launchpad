// Les liens des emails de prospection portent l'adresse du destinataire (?prospect_email=… ou ?ref=…).
// Les formulaires la proposent dans le champ email : une saisie de moins pour la personne qui a cliqué.
// Elle peut toujours la modifier. Rien n'est envoyé nulle part avant qu'elle valide le formulaire.
export const prospectEmailFromUrl = (): string => {
  try {
    const sp = new URLSearchParams(window.location.search);
    const raw = (window.__prospectEmail || sp.get('prospect_email') || sp.get('ref') || '').trim();
    return raw.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : '';
  } catch {
    return '';
  }
};
