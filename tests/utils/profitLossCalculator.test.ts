import { calculateProfitLoss, isWinner } from '../../src/utils/profitLossCalculator';

describe('profitLossCalculator', () => {
  describe('calculateProfitLoss', () => {
    it('should calculate profit when prize exceeds ticket price', () => {
      const draw = {
        mainNumbers: [1, 2, 3, 4, 5],
        euroNumbers: [1, 2],
        prizeDistribution: {
          '5 + 2': 10000000,
          '5 + 1': 500000,
          '5 + 0': 100000,
          '4 + 2': 4000,
          '4 + 1': 200,
          '3 + 2': 100,
          '2 + 2': 20,
          '3 + 1': 15,
          '3 + 0': 14,
          '1 + 2': 10,
          '2 + 1': 8
        }
      };
      
      const result = calculateProfitLoss(draw, 3, 2, 2.5);
      
      expect(result).toEqual(97.5); // 100 - 2.5
    });
    
    it('should calculate loss when no prize is won', () => {
      const draw = {
        mainNumbers: [1, 2, 3, 4, 5],
        euroNumbers: [1, 2],
        prizeDistribution: {
          '5 + 2': 10000000
        }
      };
      
      const result = calculateProfitLoss(draw, 1, 0, 2.5);
      
      expect(result).toEqual(-2.5); // 0 - 2.5
    });
    
    it('should handle missing prize distribution', () => {
      const draw = {
        mainNumbers: [1, 2, 3, 4, 5],
        euroNumbers: [1, 2]
      };
      
      const result = calculateProfitLoss(draw, 5, 2, 2.5);
      
      expect(result).toEqual(-2.5);
    });
  });
  
  describe('isWinner', () => {
    it('should return true when prize is available', () => {
      const draw = {
        mainNumbers: [1, 2, 3, 4, 5],
        euroNumbers: [1, 2],
        prizeDistribution: {
          '3 + 2': 100
        }
      };
      
      const result = isWinner(draw, 3, 2);
      
      expect(result).toBe(true);
    });
    
    it('should return false when prize is not available', () => {
      const draw = {
        mainNumbers: [1, 2, 3, 4, 5],
        euroNumbers: [1, 2],
        prizeDistribution: {
          '5 + 2': 10000000
        }
      };
      
      const result = isWinner(draw, 2, 0);
      
      expect(result).toBe(false);
    });
    
    it('should return false when prize distribution is missing', () => {
      const draw = {
        mainNumbers: [1, 2, 3, 4, 5],
        euroNumbers: [1, 2]
      };
      
      const result = isWinner(draw, 5, 2);
      
      expect(result).toBe(false);
    });
  });
});