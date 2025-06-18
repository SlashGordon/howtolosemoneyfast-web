import { type EurojackpotNumbers } from '../types/eurojackpot';

/**
 * Calculate profit or loss for a Eurojackpot ticket
 * @param draw The draw data including prize distribution
 * @param matchedMain Number of matched main numbers
 * @param matchedEuro Number of matched euro numbers
 * @param ticketPrice Price of the ticket (default: 2)
 * @returns Profit (positive) or loss (negative) amount
 */
export function calculateProfitLoss(
  draw: EurojackpotNumbers,
  matchedMain: number,
  matchedEuro: number,
  ticketPrice: number = 2
): number {
  if (!draw.prizeDistribution) {
    return -ticketPrice; // No prize data available, return loss
  }

  const matchKey = `${matchedMain} + ${matchedEuro}`;
  const prize = draw.prizeDistribution[matchKey] || 0;
  
  return prize - ticketPrice;
}

/**
 * Check if a ticket is a winner
 * @param draw The draw data including prize distribution
 * @param matchedMain Number of matched main numbers
 * @param matchedEuro Number of matched euro numbers
 * @returns True if the ticket won any prize
 */
export function isWinner(
  draw: EurojackpotNumbers,
  matchedMain: number,
  matchedEuro: number
): boolean {
  if (!draw.prizeDistribution) {
    return false;
  }

  const matchKey = `${matchedMain} + ${matchedEuro}`;
  return !!draw.prizeDistribution[matchKey] && draw.prizeDistribution[matchKey] > 0;
}