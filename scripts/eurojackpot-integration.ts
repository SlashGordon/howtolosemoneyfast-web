// eurojackpot-integration.ts
import type { AstroIntegration } from 'astro';
import { downloadEurojackpotData } from './downloadEurojackpotData';

export default function eurojackpotIntegration(): AstroIntegration {
  return {
    name: 'eurojackpot-data-integration',
    hooks: {
      'astro:build:setup': async () => {
        // Download Eurojackpot data before build starts
        await downloadEurojackpotData();
      }
    }
  };
}