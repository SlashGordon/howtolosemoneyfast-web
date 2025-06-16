import { validateNumbers } from '../../src/utils/eurojackpotService';
import * as eurojackpotService from '../../src/utils/eurojackpotService';

// Mock the historicalDraws import
jest.mock('../../src/data/historicalEurojackpot', () => ({
  historicalDraws: [
    {
      date: '2023-01-01',
      mainNumbers: [1, 2, 3, 4, 5],
      euroNumbers: [1, 2],
      prizeDistribution: {
        '5 + 2': 10000000,
        '3 + 1': 15
      }
    },
    {
      date: '2023-01-08',
      mainNumbers: [6, 7, 8, 9, 10],
      euroNumbers: [3, 4],
      prizeDistribution: {
        '5 + 2': 12000000,
        '3 + 1': 18
      }
    }
  ]
}));

describe('eurojackpotService', () => {
  describe('validateNumbers', () => {
    it('should return true for valid numbers', () => {
      const mainNumbers = [1, 10, 20, 30, 40];
      const euroNumbers = [2, 8];
      
      const result = validateNumbers(mainNumbers, euroNumbers);
      
      expect(result).toBe(true);
    });
    
    it('should return false if main numbers are not unique', () => {
      const mainNumbers = [1, 1, 20, 30, 40];
      const euroNumbers = [2, 8];
      
      const result = validateNumbers(mainNumbers, euroNumbers);
      
      expect(result).toBe(false);
    });
    
    it('should return false if euro numbers are not unique', () => {
      const mainNumbers = [1, 10, 20, 30, 40];
      const euroNumbers = [2, 2];
      
      const result = validateNumbers(mainNumbers, euroNumbers);
      
      expect(result).toBe(false);
    });
    
    it('should return false if main numbers are out of range', () => {
      const mainNumbers = [0, 10, 20, 30, 40];
      const euroNumbers = [2, 8];
      
      const result = validateNumbers(mainNumbers, euroNumbers);
      
      expect(result).toBe(false);
    });
    
    it('should return false if euro numbers are out of range', () => {
      const mainNumbers = [1, 10, 20, 30, 40];
      const euroNumbers = [2, 13];
      
      const result = validateNumbers(mainNumbers, euroNumbers);
      
      expect(result).toBe(false);
    });
  });
  
  describe('compareWithHistorical', () => {
    it('should filter draws by date range', () => {
      const numbers = {
        mainNumbers: [1, 2, 3, 4, 5],
        euroNumbers: [1, 2],
        date: '2023-01-01',
        ticketPrice: 2.5
      };
      
      const startDate = '2023-01-01';
      const endDate = '2023-01-05';
      
      const result = eurojackpotService.compareWithHistorical(numbers, startDate, endDate);
      
      expect(result.length).toBe(1);
      expect(result[0].draw.date).toBe('2023-01-01');
    });
  });
});