export async function GET() {
  const baseUrl = 'https://howtolosemoneyfast.com';
  const buildDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/tutorial', priority: '0.8', changefreq: 'monthly' },
    { url: '/history', priority: '0.8', changefreq: 'weekly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/impressum', priority: '0.3', changefreq: 'yearly' },
    { url: '/de', priority: '1.0', changefreq: 'weekly' },
    { url: '/de/tutorial', priority: '0.8', changefreq: 'monthly' },
    { url: '/de/history', priority: '0.8', changefreq: 'weekly' },
    { url: '/de/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/de/impressum', priority: '0.3', changefreq: 'yearly' },
    { url: '/es', priority: '1.0', changefreq: 'weekly' },
    { url: '/es/tutorial', priority: '0.8', changefreq: 'monthly' },
    { url: '/es/history', priority: '0.8', changefreq: 'weekly' },
    { url: '/es/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/es/impressum', priority: '0.3', changefreq: 'yearly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}