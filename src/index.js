import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  // Button animation and interaction
  const loseMoneyButton = document.getElementById('loseMoneyButton');
  
  if (loseMoneyButton) {
    loseMoneyButton.addEventListener('click', () => {
      // Create a confetti effect of money falling
      createMoneyRain();
      
      // Show alert after a short delay
      setTimeout(() => {
        alert('Congratulations! You just made a terrible financial decision!');
      }, 500);
    });
  }
  
  // Form submission handling
  const newsletterForm = document.querySelector('form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing! We'll send terrible financial advice to ${emailInput.value} regularly.`);
        emailInput.value = '';
      } else {
        alert('Please enter your email to receive our terrible financial advice!');
      }
    });
  }
});

// Function to create money rain effect
function createMoneyRain() {
  const moneySymbols = ['💸', '💰', '💵', '💴', '💶', '💷', '🪙'];
  const container = document.body;
  
  // Create 50 money symbols
  for (let i = 0; i < 50; i++) {
    const money = document.createElement('div');
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
    const duration = Math.random() * 3 + 2; // 2-5 seconds
    const horizontalMovement = (Math.random() - 0.5) * 100; // Random horizontal drift
    
    money.animate([
      { top: '-20px', left: `${parseFloat(money.style.left)}`, opacity: 1, transform: `rotate(0deg)` },
      { top: '105vh', left: `calc(${parseFloat(money.style.left)} + ${horizontalMovement}px)`, opacity: 0, transform: `rotate(${Math.random() * 720}deg)` }
    ], {
      duration: duration * 1000,
      easing: 'ease-in',
      iterations: 1
    }).onfinish = () => {
      money.remove();
    };
  }
}
