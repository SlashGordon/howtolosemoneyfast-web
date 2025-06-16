import { EurojackpotNumbers, EurojackpotResult } from '../types/eurojackpot';
import { historicalDraws } from '../data/historicalEurojackpot';
import { calculateProfitLoss, isWinner } from './profitLossCalculator';
import { getNumbersFromCookie } from './cookieService';

/**
 * Validate Eurojackpot numbers
 * @param mainNumbers The 5 main numbers (1-50)
 * @param euroNumbers The 2 euro numbers (1-12)
 * @returns True if numbers are valid
 */
export function validateNumbers(
  mainNumbers: number[],
  euroNumbers: number[]
): boolean {
  // Check if we have the correct number of selections
  if (mainNumbers.length !== 5 || euroNumbers.length !== 2) {
    return false;
  }
  
  // Check for duplicates
  const uniqueMain = new Set(mainNumbers);
  const uniqueEuro = new Set(euroNumbers);
  if (uniqueMain.size !== 5 || uniqueEuro.size !== 2) {
    return false;
  }
  
  // Check ranges
  const validMain = mainNumbers.every(num => num >= 1 && num <= 50);
  const validEuro = euroNumbers.every(num => num >= 1 && num <= 12);
  
  return validMain && validEuro;
}

/**
 * Get a specific draw by date
 * @param date The date of the draw
 * @returns The draw data or undefined if not found
 */
export function getDrawByDate(date: string): EurojackpotNumbers | undefined {
  return historicalDraws.find(draw => draw.date === date);
}

/**
 * Check a ticket against a specific draw
 * @param mainNumbers The 5 main numbers selected (1-50)
 * @param euroNumbers The 2 euro numbers selected (1-12)
 * @param drawDate The date of the draw to check against
 * @returns Result object with match information and win status
 */
export function checkTicket(
  mainNumbers: number[],
  euroNumbers: number[],
  drawDate: string
): EurojackpotResult | null {
  const draw = getDrawByDate(drawDate);
  
  if (!draw) {
    return null;
  }
  
  // Count matches
  const matchedMain = mainNumbers.filter(num => 
    draw.mainNumbers.includes(num)).length;
  
  const matchedEuro = euroNumbers.filter(num => 
    draw.euroNumbers.includes(num)).length;
  
  // Determine if winner and calculate profit/loss
  const winner = isWinner(draw, matchedMain, matchedEuro);
  
  return {
    draw,
    matches: {
      mainNumbers: matchedMain,
      euroNumbers: matchedEuro
    },
    isWinner: winner
  };
}

/**
 * Compare numbers with historical draws
 * @param numbers The numbers to compare
 * @param startDate Optional start date to filter draws (inclusive)
 * @param endDate Optional end date to filter draws (inclusive)
 * @returns Array of results for each historical draw
 */
export function compareWithHistorical(
  numbers: EurojackpotNumbers,
  startDate?: string,
  endDate?: string
): EurojackpotResult[] {
  const results: EurojackpotResult[] = [];
  
  // Filter draws by date range if provided
  const filteredDraws = historicalDraws.filter(draw => {
    if (!draw.date) return false;
    if (startDate && draw.date < startDate) return false;
    if (endDate && draw.date > endDate) return false;
    return true;
  });
  
  // Use all draws if no filtered results
  const drawsToCheck = filteredDraws.length > 0 ? filteredDraws : historicalDraws;
  
  drawsToCheck.forEach(draw => {
    // Count matches
    const matchedMain = numbers.mainNumbers.filter(num => 
      draw.mainNumbers.includes(num)).length;
    
    const matchedEuro = numbers.euroNumbers.filter(num => 
      draw.euroNumbers.includes(num)).length;
    
    // Determine if winner
    const winner = isWinner(draw, matchedMain, matchedEuro);
    
    if (matchedMain > 0 || matchedEuro > 0) {
      results.push({
        draw,
        matches: {
          mainNumbers: matchedMain,
          euroNumbers: matchedEuro
        },
        isWinner: winner
      });
    }
  });
  
  return results.sort((a, b) => {
    // Sort by winner status first
    if (a.isWinner && !b.isWinner) return -1;
    if (!a.isWinner && b.isWinner) return 1;
    
    // Then by total matches
    const aTotal = a.matches.mainNumbers + a.matches.euroNumbers;
    const bTotal = b.matches.mainNumbers + b.matches.euroNumbers;
    if (aTotal !== bTotal) return bTotal - aTotal;
    
    // Then by date (newest first)
    if (a.draw.date && b.draw.date) {
      return new Date(b.draw.date).getTime() - new Date(a.draw.date).getTime();
    }
    
    return 0;
  });
}

/**
 * Compare numbers with saved numbers
 * @param numbers The numbers to compare
 * @returns Array of results for each saved number set
 */
export function compareWithSavedNumbers(
  numbers: EurojackpotNumbers
): EurojackpotResult[] {
  const savedNumbers = getNumbersFromCookie();
  const results: EurojackpotResult[] = [];
  
  savedNumbers.forEach(savedSet => {
    // Count matches
    const matchedMain = numbers.mainNumbers.filter(num => 
      savedSet.mainNumbers.includes(num)).length;
    
    const matchedEuro = numbers.euroNumbers.filter(num => 
      savedSet.euroNumbers.includes(num)).length;
    
    // Add to results if there are any matches
    if (matchedMain > 0 || matchedEuro > 0) {
      results.push({
        draw: savedSet,
        matches: {
          mainNumbers: matchedMain,
          euroNumbers: matchedEuro
        },
        isWinner: matchedMain === 5 && matchedEuro === 2
      });
    }
  });
  
  return results.sort((a, b) => {
    // Sort by total matches
    const aTotal = a.matches.mainNumbers + a.matches.euroNumbers;
    const bTotal = b.matches.mainNumbers + b.matches.euroNumbers;
    return bTotal - aTotal;
  });
}

/**
 * Calculate total profit or loss for a ticket across multiple draws
 * @param mainNumbers The 5 main numbers selected
 * @param euroNumbers The 2 euro numbers selected
 * @param startDate Start date for calculation
 * @param endDate End date for calculation
 * @param ticketPrice Price per ticket
 * @returns Total profit or loss amount
 */
export function calculateTotalProfitLoss(
  mainNumbers: number[],
  euroNumbers: number[],
  startDate: string,
  endDate: string,
  ticketPrice: number = 2
): number {
  const relevantDraws = historicalDraws.filter(
    draw => {
      if (!draw.date) return false;
      return draw.date >= startDate && draw.date <= endDate;
    }
  );
  
  let total = 0;
  
  relevantDraws.forEach(draw => {
    // Count matches
    const matchedMain = mainNumbers.filter(num => 
      draw.mainNumbers.includes(num)).length;
    
    const matchedEuro = euroNumbers.filter(num => 
      draw.euroNumbers.includes(num)).length;
    
    // Add profit/loss for this draw
    total += calculateProfitLoss(draw, matchedMain, matchedEuro, ticketPrice);
  });
  
  return total;
}