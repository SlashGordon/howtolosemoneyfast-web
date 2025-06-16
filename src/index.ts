import './styles.css';
import { EurojackpotComponent } from './components/eurojackpot';
import { calculateMoneyWasted } from './utils/moneyWastedService';
import { i18n } from './i18n/i18n';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the EuroJackpot component
  try {
    new EurojackpotComponent('eurojackpot-container');
    console.log('EuroJackpot component initialized');
  } catch (error) {
    console.error('Failed to initialize EuroJackpot component:', error);
  }
  
  // Initialize the Money Wasted Chart
  try {
    initMoneyWastedChart();
    console.log('Money Wasted chart initialized');
  } catch (error) {
    console.error('Failed to initialize Money Wasted chart:', error);
  }
  
  // Add event listener to the "Lose Money" button
  const loseMoneyButton = document.getElementById('loseMoneyButton');
  if (loseMoneyButton) {
    loseMoneyButton.addEventListener('click', () => {
      alert('Congratulations! You just lost some virtual money. Try the EuroJackpot for a chance to lose real money!');
      
      // Scroll to the EuroJackpot section
      const eurojackpotContainer = document.getElementById('eurojackpot-container');
      if (eurojackpotContainer) {
        eurojackpotContainer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Function to initialize the Money Wasted Chart
function initMoneyWastedChart(): void {
  const chartCanvas = document.getElementById('money-wasted-chart') as HTMLCanvasElement;
  if (!chartCanvas) {
    console.error('Money wasted chart canvas not found');
    return;
  }
  
  const ctx = chartCanvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get 2D context for chart canvas');
    return;
  }
  
  // Calculate data for the chart
  const data = calculateMoneyWasted();
  
  // If no data points, show message and return
  if (data.dates.length === 0) {
    const chartParent = chartCanvas.parentElement;
    if (chartParent) {
      chartParent.innerHTML = `<p class="text-gray-500 italic text-center py-12">${i18n.translate('eurojackpot.noNumbersSaved') || 'No numbers saved yet.'}</p>`;
    }
    return;
  }
  
  // Update total wasted amount
  const moneyWastedContainer = document.getElementById('money-wasted-container');
  if (!moneyWastedContainer) return;
  
  const totalElement = document.createElement('div');
  totalElement.className = 'mt-4 text-center total-wasted';
  totalElement.innerHTML = `
    <p class="text-gray-300">${i18n.translate('moneyWasted.total') || 'Total Money Wasted'}</p>
    <p class="text-3xl font-bold text-red-500">€${data.totalWasted.toFixed(2)}</p>
  `;
  
  // Clear any existing total elements and add the new one
  const existingTotal = moneyWastedContainer.querySelector('.total-wasted');
  if (existingTotal) {
    existingTotal.remove();
  }
  moneyWastedContainer.appendChild(totalElement);
}