import { getDateRange } from '../../src/utils/dateUtils';

describe('dateUtils', () => {
  describe('getDateRange', () => {
    it('should return empty dates when no draws are provided', () => {
      const result = getDateRange([]);
      expect(result).toEqual({ firstDate: '', latestDate: '' });
    });

    it('should return first and latest date from draws', () => {
      const draws = [
        { date: '2022-01-01', mainNumbers: [1, 2, 3, 4, 5], euroNumbers: [1, 2] },
        { date: '2022-02-15', mainNumbers: [6, 7, 8, 9, 10], euroNumbers: [3, 4] },
        { date: '2022-03-30', mainNumbers: [11, 12, 13, 14, 15], euroNumbers: [5, 6] }
      ];
      
      const result = getDateRange(draws);
      
      expect(result).toEqual({
        firstDate: '2022-01-01',
        latestDate: '2022-03-30'
      });
    });

    it('should handle draws without dates', () => {
      const draws = [
        { mainNumbers: [1, 2, 3, 4, 5], euroNumbers: [1, 2] },
        { date: '2022-02-15', mainNumbers: [6, 7, 8, 9, 10], euroNumbers: [3, 4] }
      ];
      
      const result = getDateRange(draws);
      
      expect(result).toEqual({
        firstDate: '2022-02-15',
        latestDate: '2022-02-15'
      });
    });
  });
});