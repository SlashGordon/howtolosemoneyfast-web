import type { MoneySymbol } from '../types/eurojackpot';

/**
 * Creates a money rain animation effect on the page
 */
export function createMoneyRain(): void {
  const moneySymbols: MoneySymbol[] = ['💸', '💰', '💵', '💴', '💶', '💷', '🪙'];
  const container: HTMLElement = document.body;
  
  // Create 50 money symbols
  for (let i = 0; i < 50; i++) {
    const money: HTMLDivElement = document.createElement('div');
    money.textContent = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
    money.style.position = 'fixed';
    money.style.fontSize = `${Math.random() * 20 + 10}px`;
    money.style.left = `${Math.random() * 100}vw`;
    money.style.top = '-20px';
    money.style.opacity = '1';
    money.style.zIndex = '9999';
    money.style.pointerEvents = 'none';
    money.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(money);
    
    // Animate falling
    const duration: number = Math.random() * 3 + 2; // 2-5 seconds
    const horizontalMovement: number = (Math.random() - 0.5) * 100; // Random horizontal drift
    
    const animation = money.animate([
      { top: '-20px', left: `${parseFloat(money.style.left)}`, opacity: 1, transform: `rotate(0deg)` },
      { top: '105vh', left: `calc(${parseFloat(money.style.left)} + ${horizontalMovement}px)`, opacity: 0, transform: `rotate(${Math.random() * 720}deg)` }
    ], {
      duration: duration * 1000,
      easing: 'ease-in',
      iterations: 1
    });
    
    animation.onfinish = () => {
      money.remove();
    };
  }
}
