# Financial Folly: How To Lose Money Fast

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 🚨 About This Project

This satirical educational website demonstrates the financial impact of lottery games like EuroJackpot. It helps users visualize how much money they're likely to lose over time compared to smarter investment options.

**Live Demo:** [[https://howtolosemoneyfast.github.io](https://slashgordon.github.io/howtolosemoneyfast_web/)

## ✨ Key Features

- **EuroJackpot Number Checker**: Compare your numbers against historical draws
- **Money Wasted Tracker**: Visualize lottery spending vs investment growth
- **Multi-language Support**: Available in English, German, and Spanish
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technologies

- TypeScript for type-safe code
- Tailwind CSS for responsive styling
- Chart.js for data visualization
- Webpack for bundling
- i18n for internationalization

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/financial-folly.git
cd financial-folly

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Type check without emitting files
npm run type-check
```

## 📁 Project Structure

```
financial-folly/
├── src/
│   ├── components/            # UI components
│   │   └── eurojackpot.ts     # EuroJackpot component
│   ├── data/                  # Historical lottery data
│   │   └── historicalEurojackpot.ts # EuroJackpot data
│   ├── i18n/                  # Translations
│   │   ├── i18n.js            # i18n initialization
│   │   └── translations.js    # Language translations
│   ├── types/                 # TypeScript definitions
│   │   ├── eurojackpot.ts     # EuroJackpot types
│   │   └── index.d.ts         # General type definitions
│   ├── utils/                 # Helper functions
│   │   ├── animations.ts      # Animation utilities
│   │   ├── cookieService.ts   # Cookie management
│   │   ├── dateUtils.ts       # Date utilities
│   │   ├── dom.ts             # DOM manipulation
│   │   ├── eurojackpotService.ts # EuroJackpot logic
│   │   ├── moneyWastedService.ts # Money tracking
│   │   └── profitLossCalculator.ts # Financial calculations
│   ├── index.html             # Main HTML file
│   ├── main.js                # Main JavaScript entry
│   └── styles.css             # Tailwind CSS styles
├── scripts/                   # Build scripts
│   └── downloadEurojackpotData.js # Data fetching script
├── webpack.config.js          # Webpack configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Project dependencies and scripts
```

## 📊 How It Works

The application simulates lottery participation over time, calculating:
- Money spent on tickets
- Probability of winning
- Potential returns
- Comparison with index fund investments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

This project uses GitHub Actions to automatically deploy to GitHub Pages. The workflow:

1. Triggers on pushes to the main branch
2. Builds the project using npm
3. Deploys the built files to GitHub Pages

You can view the deployment workflow in `.github/workflows/deploy.yml`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Contact

Questions? Suggestions? Feel free to open an issue or reach out directly.
