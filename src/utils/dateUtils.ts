/**
 * Determines the first and latest dates from historical Eurojackpot data
 * @param draws Array of draw objects with date properties
 * @returns Object containing firstDate and latestDate
 */
export function getDateRange(draws: { date?: string }[]): { firstDate: string; latestDate: string } {
  if (!draws || draws.length === 0) {
    return { firstDate: '', latestDate: '' };
  }

  // Filter out draws without dates
  const drawsWithDates = draws.filter(draw => draw.date);
  
  if (drawsWithDates.length === 0) {
    return { firstDate: '', latestDate: '' };
  }

  let firstDate = drawsWithDates[0].date!;
  let latestDate = drawsWithDates[0].date!;

  for (const draw of drawsWithDates) {
    if (draw.date! < firstDate) {
      firstDate = draw.date!;
    }
    if (draw.date! > latestDate) {
      latestDate = draw.date!;
    }
  }

  return { firstDate, latestDate };
}