// downloadEurojackpotData.ts
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the structure of the raw data from the API
interface RawEurojackpotData {
  regular_numbers: number[];
  bonus_numbers: number[];
  draw_date: string;
  prize_distribution: Record<string, number>;
}

// Define the structure of our processed data
interface EurojackpotNumbers {
  mainNumbers: number[];
  euroNumbers: number[];
  date: string;
  prizeDistribution: Record<string, number>;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '../src/data/historicalEurojackpot.ts');

// GitHub raw content URL for the results.json file
const url = 'https://raw.githubusercontent.com/SlashGordon/howtolosemoneyfast/main/results.json';

console.log('Downloading Eurojackpot data...');

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data) as RawEurojackpotData[];
      
      // Convert the JSON data to EurojackpotNumbers format
      const eurojackpotData: EurojackpotNumbers[] = jsonData.map(item => ({
        mainNumbers: item.regular_numbers.sort((a, b) => a - b),
        euroNumbers: item.bonus_numbers.sort((a, b) => a - b),
        date: item.draw_date,
        prizeDistribution: item.prize_distribution
      }));

      // Generate TypeScript file content
      const tsContent = `import { EurojackpotNumbers } from '../types/eurojackpot';\n\n// Historical EuroJackpot data\n// Auto-generated from https://github.com/SlashGordon/howtolosemoneyfast/blob/main/results.json\nexport const historicalDraws: EurojackpotNumbers[] = ${JSON.stringify(eurojackpotData, null, 2)};\n`;

      // Write to file
      fs.writeFileSync(outputPath, tsContent);
      console.log(`Successfully updated ${outputPath}`);
    } catch (error) {
      console.error('Error processing data:', error);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error('Error downloading data:', error);
  process.exit(1);
});