import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://howtolosemoneyfast.com',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          de: 'de-DE',
          es: 'es-ES'
        }
      },
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.7,
      serialize: (item) => {
        // Customize priority based on the page
        if (item.url === 'https://howtolosemoneyfast.com/' || 
            item.url === 'https://howtolosemoneyfast.com/de/' || 
            item.url === 'https://howtolosemoneyfast.com/es/') {
          return {
            ...item,
            priority: 1.0,
            changefreq: 'daily'
          };
        }
        
        // Lower priority for legal pages
        if (item.url.includes('/impressum') || item.url.includes('/privacy')) {
          return {
            ...item,
            priority: 0.3,
            changefreq: 'monthly'
          };
        }
        
        return item;
      }
    })
  ],
  output: 'static',
  build: {
    assets: 'assets'
  }
});