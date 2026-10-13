export function slugify(input) {
  const str = String(input ?? "").trim().toLowerCase();
  if (!str) return "";

  // Basic latin + Uzbek/Russian friendly normalization
  const normalized = str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/['"’”“]/g, "")
    .replace(/&/g, " and ");

  return normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

