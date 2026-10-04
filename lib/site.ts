/**
 * Canonical site URL.
 * Vercel injects VERCEL_PROJECT_PRODUCTION_URL and VERCEL_URL automatically,
 * so no manual configuration is required for a standard deployment.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const siteTitle = "Ayle / Meow";

export const siteDescription =
  "life is lowkey a string of memories, has anything ever remained besides them?";
