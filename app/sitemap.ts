import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

const ROUTES = [
  '/',
  '/roles/',
  '/sectors/',
  '/candidates/',
  '/employers/',
  '/team/',
  '/contact/',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((path) => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
