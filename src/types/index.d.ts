// Custom type definitions

// Example: Money symbol type
export type MoneySymbol = '💸' | '💰' | '💵' | '💴' | '💶' | '💷' | '🪙';

// Example: Financial advice type
export interface FinancialAdvice {
  id: number;
  title: string;
  description: string;
  effectiveness: 1 | 2 | 3 | 4 | 5;
  emoji: string;
}

// Example: Testimonial type
export interface Testimonial {
  id: number;
  name: string;
  initials: string;
  rating: number;
  comment: string;
  avatarColor: string;
}
