/**
 * Environment-driven API helper for Aditya Gupta's Portfolio.
 * In development, defaults to relative path ('') which is proxied by Vite to port 8000.
 * In production, VITE_API_URL can be set to point to an external FastAPI backend if deployed separately.
 */

export function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_URL;
  if (configuredUrl && typeof configuredUrl === 'string') {
    return configuredUrl.replace(/\/+$/, '');
  }
  return '';
}

export function buildApiUrl(path: string): string {
  const base = getApiBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
