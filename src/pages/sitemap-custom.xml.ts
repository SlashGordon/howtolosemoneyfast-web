import type { APIRoute } from 'astro';

// Define the sitemap entry type
interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Define the pages for the sitemap
const pages: SitemapEntry[] = [
  // English pages
  {
    url: 'https://howtolosemoneyfast.com/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0
  },
  {
    url: 'https://howtolosemoneyfast.com/impressum',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    url: 'https://howtolosemoneyfast.com/privacy',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.3
  },
  
  // German pages
  {
    url: 'https://howtolosemoneyfast.com/de/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 0.9
  },
  {
    url: 'https://howtolosemoneyfast.com/de/impressum',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    url: 'https://howtolosemoneyfast.com/de/privacy',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.3
  },
  
  // Spanish pages
  {
    url: 'https://howtolosemoneyfast.com/es/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 0.9
  },
  {
    url: 'https://howtolosemoneyfast.com/es/impressum',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    url: 'https://howtolosemoneyfast.com/es/privacy',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.3
  }
];

// Generate the sitemap XML
export const GET: APIRoute = async () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    ${page.changefreq ? `<changefreq>${page.changefreq}</changefreq>` : ''}
    ${page.priority !== undefined ? `<priority>${page.priority.toFixed(1)}</priority>` : ''}
    ${
      // Add language alternates for each page
      page.url.includes('/de/') || page.url === 'https://howtolosemoneyfast.com/de/' ? 
      `<xhtml:link rel="alternate" hreflang="de" href="${page.url}" />
      <xhtml:link rel="alternate" hreflang="en" href="${page.url.replace('/de/', '/').replace('/de', '')}" />
      <xhtml:link rel="alternate" hreflang="es" href="${page.url.replace('/de/', '/es/').replace('/de', '/es')}" />` :
      page.url.includes('/es/') || page.url === 'https://howtolosemoneyfast.com/es/' ?
      `<xhtml:link rel="alternate" hreflang="es" href="${page.url}" />
      <xhtml:link rel="alternate" hreflang="en" href="${page.url.replace('/es/', '/').replace('/es', '')}" />
      <xhtml:link rel="alternate" hreflang="de" href="${page.url.replace('/es/', '/de/').replace('/es', '/de')}" />` :
      `<xhtml:link rel="alternate" hreflang="en" href="${page.url}" />
      <xhtml:link rel="alternate" hreflang="de" href="${page.url.replace('https://howtolosemoneyfast.com/', 'https://howtolosemoneyfast.com/de/').replace(/\/$/, '/de')}" />
      <xhtml:link rel="alternate" hreflang="es" href="${page.url.replace('https://howtolosemoneyfast.com/', 'https://howtolosemoneyfast.com/es/').replace(/\/$/, '/es')}" />`
    }
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
};