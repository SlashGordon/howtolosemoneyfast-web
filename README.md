# How To Lose Money Fast

A satirical educational website about lottery games and financial decisions, built with Astro.

## 🚀 Project Structure

```
/
├── public/
│   ├── robots.txt
│   └── .htaccess
├── src/
│   ├── components/
│   │   ├── ConsentManager.astro
│   │   ├── EurojackpotComponent.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── eurojackpot.ts
│   ├── data/
│   │   └── historicalEurojackpot.ts
│   ├── i18n/
│   │   ├── i18n.ts
│   │   └── translations.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── impressum.astro
│   │   ├── privacy.astro
│   │   ├── 404.astro
│   │   ├── sitemap-custom.xml.ts
│   │   ├── de/
│   │   │   ├── index.astro
│   │   │   ├── impressum.astro
│   │   │   └── privacy.astro
│   │   └── es/
│   │       ├── index.astro
│   │       ├── impressum.astro
│   │       └── privacy.astro
│   ├── types/
│   │   ├── eurojackpot.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── cookieService.ts
│   │   ├── dateUtils.ts
│   │   ├── eurojackpotService.ts
│   │   ├── moneyWastedService.ts
│   │   └── profitLossCalculator.ts
│   ├── main.ts
│   └── styles.css
├── scripts/
│   └── downloadEurojackpotData.ts
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       └── test.yml
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
└── tsconfig.scripts.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run test`            | Run tests                                        |
| `npm run test:watch`      | Run tests in watch mode                          |
| `npm run test:coverage`   | Run tests with coverage                          |
| `npm run type-check`      | Run TypeScript type checking                     |
| `npm run compile-scripts` | Compile TypeScript scripts to JavaScript         |

## 🧠 Features

- EuroJackpot number checker
- Historical draw comparison
- Money wasted tracker
- Multi-language support (English, German, Spanish)
- Responsive design with Tailwind CSS
- Automatic sitemap generation
- Internationalization (i18n) with file-based routing
- Fully TypeScript-based codebase

## 🌐 Internationalization

The website supports three languages:
- English (default): `/`
- German: `/de`
- Spanish: `/es`

The language switcher component automatically detects the current language from the URL and provides links to the equivalent pages in other languages.

## 🗺️ Sitemap

The website implements two sitemap approaches:
1. **Automatic Sitemap**: Using the `@astrojs/sitemap` integration that automatically generates a sitemap based on the pages in the project.
2. **Custom Sitemap**: A manually created sitemap at `/sitemap-custom.xml` that includes language alternates using the `xhtml:link` tag.

Both sitemaps include:
- Proper language alternates for each page
- Custom priorities based on page importance
- Custom change frequencies
- Last modification dates

## 📝 License

MIT