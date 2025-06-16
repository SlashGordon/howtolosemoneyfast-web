import Chart from 'chart.js/auto';
import { EurojackpotNumbers, EurojackpotResult } from '../types/eurojackpot';
import { addNumbers, getNumbersFromCookie, saveNumbersToCookie } from '../utils/cookieService';
import { validateNumbers, compareWithHistorical } from '../utils/eurojackpotService';
import { calculateMoneyWasted } from '../utils/moneyWastedService';
import { i18n } from '../i18n/i18n';
import { getDateRange } from '../utils/dateUtils';
import { historicalDraws } from '../data/historicalEurojackpot';

export class EurojackpotComponent {
  private container: HTMLElement;
  private savedNumbersContainer: HTMLElement;
  private resultsContainer: HTMLElement;
  private moneyWastedChart: Chart | null = null;
  private readonly DEFAULT_TICKET_PRICE = 2.60;
  
  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement;
    if (!this.container) {
      throw new Error(`Container with ID ${containerId} not found`);
    }
    
    this.render();
    
    // Create containers for saved numbers and results
    this.savedNumbersContainer = document.getElementById('saved-numbers') as HTMLElement;
    this.resultsContainer = document.getElementById('results-container') as HTMLElement;
    
    this.bindEvents();
    this.loadSavedNumbers();
    
    // Initialize chart with a longer delay to ensure DOM is fully ready
    setTimeout(() => {
      console.log('Delayed chart initialization starting');
      this.initMoneyWastedChart();
    }, 500);
    
    // Listen for language changes
    document.addEventListener('languageChanged', () => {
      this.updateTranslations();
    });
  }
  
  private render(): void {
    this.container.innerHTML = `
      <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 p-6 mb-8">
        <h2 class="text-2xl font-bold mb-4 text-red-300" data-i18n="eurojackpot.title">EuroJackpot Number Checker</h2>
        <p class="text-gray-300 mb-6" data-i18n="eurojackpot.description">Enter your EuroJackpot numbers to see if they match any historical draws.</p>
        
        <div class="flex flex-wrap lg:flex-nowrap gap-6">
          <form id="eurojackpot-form" class="mb-6 flex-1">
            <div class="mb-6">
              <label class="block text-gray-300 mb-3 text-sm font-medium" data-i18n="eurojackpot.mainNumbers">Main Numbers (5 numbers from 1-50)</label>
              <div class="flex flex-wrap gap-3 mb-2">
                <input type="number" min="1" max="50" class="w-16 px-3 py-2 bg-gray-800 border-b-2 border-red-400 focus:border-red-300 outline-none text-white text-center transition-all" required aria-label="Main number 1" title="Enter a number between 1 and 50">
                <input type="number" min="1" max="50" class="w-16 px-3 py-2 bg-gray-800 border-b-2 border-red-400 focus:border-red-300 outline-none text-white text-center transition-all" required aria-label="Main number 2" title="Enter a number between 1 and 50">
                <input type="number" min="1" max="50" class="w-16 px-3 py-2 bg-gray-800 border-b-2 border-red-400 focus:border-red-300 outline-none text-white text-center transition-all" required aria-label="Main number 3" title="Enter a number between 1 and 50">
                <input type="number" min="1" max="50" class="w-16 px-3 py-2 bg-gray-800 border-b-2 border-red-400 focus:border-red-300 outline-none text-white text-center transition-all" required aria-label="Main number 4" title="Enter a number between 1 and 50">
                <input type="number" min="1" max="50" class="w-16 px-3 py-2 bg-gray-800 border-b-2 border-red-400 focus:border-red-300 outline-none text-white text-center transition-all" required aria-label="Main number 5" title="Enter a number between 1 and 50">
              </div>
            </div>
            
            <div class="mb-6">
              <label class="block text-gray-300 mb-3 text-sm font-medium" data-i18n="eurojackpot.euroNumbers">Euro Numbers (2 numbers from 1-12)</label>
              <div class="flex gap-3 mb-2">
                <input type="number" min="1" max="12" class="w-16 px-3 py-2 bg-gray-800 border-b-2 border-yellow-400 focus:border-yellow-300 outline-none text-white text-center transition-all" required aria-label="Euro number 1" title="Enter a number between 1 and 12">
                <input type="number" min="1" max="12" class="w-16 px-3 py-2 bg-gray-800 border-b-2 border-yellow-400 focus:border-yellow-300 outline-none text-white text-center transition-all" required aria-label="Euro number 2" title="Enter a number between 1 and 12">
              </div>
            </div>
            
            <div class="mb-6">
              <label class="block text-gray-300 mb-3 text-sm font-medium" data-i18n="eurojackpot.ticketPrice">Ticket Price (€)</label>
              <div class="flex gap-3 mb-2">
                <input type="number" id="ticket-price" min="0" step="0.10" value="${this.DEFAULT_TICKET_PRICE}" class="w-24 px-3 py-2 bg-gray-800 border-b-2 border-green-400 focus:border-green-300 outline-none text-white text-center transition-all" aria-label="Ticket price in euros" title="Enter the ticket price">
              </div>
            </div>
            
            <div class="mb-6">
              <label class="block text-gray-300 mb-3 text-sm font-medium" data-i18n="eurojackpot.dateRange">Date Range (Optional)</label>
              <div class="flex flex-wrap gap-3 mb-2">
                <div>
                  <label class="text-xs text-gray-400 mb-1 block" data-i18n="eurojackpot.startDate">Start Date</label>
                  <input type="date" id="start-date" class="w-40 px-3 py-2 bg-gray-800 border-b-2 border-blue-400 focus:border-blue-300 outline-none text-white text-center transition-all" aria-label="Start date" title="Select start date">
                </div>
                <div>
                  <label class="text-xs text-gray-400 mb-1 block" data-i18n="eurojackpot.endDate">End Date</label>
                  <input type="date" id="end-date" class="w-40 px-3 py-2 bg-gray-800 border-b-2 border-blue-400 focus:border-blue-300 outline-none text-white text-center transition-all" aria-label="End date" title="Select end date">
                </div>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-3">
              <button type="submit" class="inline-flex bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg items-center justify-center">
                <span data-i18n="eurojackpot.saveCheck">Save & Check Numbers</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <button type="button" id="bulk-import" class="inline-flex bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg items-center justify-center">
                <span data-i18n="eurojackpot.bulkImport">Bulk Import</span>
              </button>
            </div>
          </form>
          
          <div id="overall-stats" class="bg-gray-700 rounded-lg p-4 shadow-md w-full lg:w-80 h-fit">
            <h3 class="text-xl font-semibold mb-3 text-red-300" data-i18n="eurojackpot.overallStats">Overall Stats</h3>
            <div class="space-y-4">
              <div>
                <p class="text-gray-300 text-sm mb-1" data-i18n="eurojackpot.totalTickets">Total Tickets</p>
                <p class="text-2xl font-bold text-white" id="total-tickets">0</p>
              </div>
              <div>
                <p class="text-gray-300 text-sm mb-1" data-i18n="eurojackpot.totalSpent">Total Spent</p>
                <p class="text-2xl font-bold text-red-400" id="total-spent">€0.00</p>
              </div>
              <div>
                <p class="text-gray-300 text-sm mb-1" data-i18n="eurojackpot.totalWon">Total Won</p>
                <p class="text-2xl font-bold text-green-400" id="total-won">€0.00</p>
              </div>
              <div class="pt-2 border-t border-gray-600">
                <p class="text-gray-300 text-sm mb-1" data-i18n="eurojackpot.netProfit">Net Profit/Loss</p>
                <p class="text-2xl font-bold" id="net-profit">€0.00</p>
              </div>
              <div class="pt-2 border-t border-gray-600">
                <p class="text-gray-300 text-sm mb-1" data-i18n="eurojackpot.bestWin">Best Win</p>
                <p class="text-xl font-bold text-green-400" id="best-win">€0.00</p>
                <p class="text-xs text-gray-400" id="best-win-date"></p>
              </div>
              <div>
                <p class="text-gray-300 text-sm mb-1" data-i18n="eurojackpot.roi">Return on Investment</p>
                <p class="text-xl font-bold" id="roi">0%</p>
              </div>
            </div>
          </div>
        </div>
        
        <div id="saved-numbers" class="mb-6">
          <h3 class="text-xl font-semibold mb-2 text-red-300" data-i18n="eurojackpot.savedNumbers">Your Saved Numbers</h3>
          <div class="saved-numbers-list text-gray-300">
            <!-- Saved numbers will be displayed here -->
            <p class="text-gray-500 italic" data-i18n="eurojackpot.noNumbersSaved">No numbers saved yet.</p>
          </div>
        </div>
        
        <div id="results-container" class="hidden">
          <h3 class="text-xl font-semibold mb-2 text-red-300" data-i18n="eurojackpot.results">Results</h3>
          <div class="results-list">
            <!-- Results will be displayed here -->
          </div>
        </div>
      </div>
    `;
  }
  
  private updateTranslations(): void {
    // Update all elements with data-i18n attribute in this component
    this.container.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        element.textContent = i18n.translate(key);
      }
    });
    
    // Re-render saved numbers and results with new language
    this.loadSavedNumbers();
    
    // Update chart labels
    this.updateMoneyWastedChart();
  }
  
  private bindEvents(): void {
    const form = document.getElementById('eurojackpot-form') as HTMLFormElement;
    const bulkImportBtn = document.getElementById('bulk-import') as HTMLButtonElement;
    const startDateInput = document.getElementById('start-date') as HTMLInputElement;
    const endDateInput = document.getElementById('end-date') as HTMLInputElement;
    
    // Set default date range using the getDateRange function
    const dateRange = getDateRange(historicalDraws);
    if (dateRange.firstDate) {
      startDateInput.value = dateRange.firstDate;
    }
    if (dateRange.latestDate) {
      endDateInput.value = dateRange.latestDate;
    }
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit(form);
    });
    
    bulkImportBtn.addEventListener('click', () => {
      this.showBulkImportDialog();
    });
    
    // Add event listeners for date inputs
    startDateInput.addEventListener('change', () => {
      this.updateResultsForDateChange();
      this.updateMoneyWastedChart();
    });
    
    endDateInput.addEventListener('change', () => {
      this.updateResultsForDateChange();
      this.updateMoneyWastedChart();
    });
  }
  
  private updateResultsForDateChange(): void {
    // Update overall stats
    const savedNumbers = getNumbersFromCookie();
    this.updateOverallStats(savedNumbers);
    
    // Update money wasted chart
    this.updateMoneyWastedChart();
    
    // If results are currently displayed, update them
    if (!this.resultsContainer.classList.contains('hidden')) {
      const lastCheckedNumbers = this.resultsContainer.dataset.lastCheckedNumbers;
      if (lastCheckedNumbers) {
        const numbers = JSON.parse(lastCheckedNumbers);
        this.compareAndDisplayResults(numbers);
      }
    }
  }
  
  private showBulkImportDialog(): void {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 max-w-lg w-full mx-4';
    
    modal.innerHTML = `
      <h3 class="text-xl font-semibold mb-4 text-red-300" data-i18n="eurojackpot.bulkImport">Bulk Import</h3>
      <p class="text-gray-300 mb-4" data-i18n="eurojackpot.bulkImportDescription">
        Paste JSON array of number sets. Format: [[main1, main2, main3, main4, main5, euro1, euro2], ...]
      </p>
      <label for="bulk-import-text" class="sr-only">Enter JSON array of number sets</label>
      <textarea id="bulk-import-text" class="w-full h-48 bg-gray-900 text-white p-3 rounded-md mb-4 font-mono text-sm" 
        placeholder='[
  [3, 12, 26, 28, 47, 2, 11],
  [8, 11, 18, 19, 47, 4, 6]
]' aria-label="Enter JSON array of number sets" title="Enter JSON array of number sets"></textarea>
      <div class="flex justify-end gap-3">
        <button id="bulk-import-cancel" class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-300">
          ${i18n.translate('eurojackpot.cancel')}
        </button>
        <button id="bulk-import-submit" class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-300">
          ${i18n.translate('eurojackpot.import')}
        </button>
      </div>
    `;
    
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    
    // Add event listeners
    const cancelBtn = document.getElementById('bulk-import-cancel');
    const submitBtn = document.getElementById('bulk-import-submit');
    const textArea = document.getElementById('bulk-import-text') as HTMLTextAreaElement;
    
    cancelBtn?.addEventListener('click', () => {
      document.body.removeChild(backdrop);
    });
    
    submitBtn?.addEventListener('click', () => {
      this.processBulkImport(textArea.value);
      document.body.removeChild(backdrop);
    });
  }
  
  private processBulkImport(jsonText: string): void {
    try {
      // Parse JSON
      const numberSets = JSON.parse(jsonText);
      
      if (!Array.isArray(numberSets)) {
        throw new Error('Input must be an array');
      }
      
      let importedCount = 0;
      const ticketPrice = parseFloat((document.getElementById('ticket-price') as HTMLInputElement).value) || this.DEFAULT_TICKET_PRICE;
      
      // Process each set
      numberSets.forEach(set => {
        if (!Array.isArray(set) || set.length !== 7) {
          console.warn('Skipping invalid set:', set);
          return;
        }
        
        const mainNumbers = set.slice(0, 5);
        const euroNumbers = set.slice(5, 7);
        
        // Validate numbers
        if (!validateNumbers(mainNumbers, euroNumbers)) {
          console.warn('Skipping invalid numbers:', set);
          return;
        }
        
        // Create EuroJackpot numbers object
        const numbers: EurojackpotNumbers = {
          mainNumbers,
          euroNumbers,
          date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
          ticketPrice
        };
        
        // Save to cookie
        addNumbers(numbers);
        importedCount++;
      });
      
      // Update UI
      this.loadSavedNumbers();
      this.updateMoneyWastedChart();
      
      // Show success message
      alert(i18n.translate('eurojackpot.bulkImportSuccess', { count: importedCount }));
      
    } catch (error) {
      console.error('Bulk import error:', error);
      alert(i18n.translate('eurojackpot.bulkImportError'));
    }
  }
  
  private handleFormSubmit(form: HTMLFormElement): void {
    // Get all main number inputs
    const mainNumberInputs = Array.from(
      form.querySelectorAll('input[type="number"][min="1"][max="50"]')
    ) as HTMLInputElement[];
    
    // Get all euro number inputs
    const euroNumberInputs = Array.from(
      form.querySelectorAll('input[type="number"][min="1"][max="12"]')
    ) as HTMLInputElement[];
    
    // Get ticket price
    const ticketPriceInput = document.getElementById('ticket-price') as HTMLInputElement;
    const ticketPrice = parseFloat(ticketPriceInput.value) || this.DEFAULT_TICKET_PRICE;
    
    // Extract values
    const mainNumbers = mainNumberInputs.map(input => parseInt(input.value, 10));
    const euroNumbers = euroNumberInputs.map(input => parseInt(input.value, 10));
    
    // Validate numbers
    if (!validateNumbers(mainNumbers, euroNumbers)) {
      alert(i18n.translate('eurojackpot.invalidNumbers'));
      return;
    }
    
    // Create EuroJackpot numbers object
    const numbers: EurojackpotNumbers = {
      mainNumbers,
      euroNumbers,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      ticketPrice
    };
    
    // Save to cookie
    addNumbers(numbers);
    
    // Update saved numbers display
    this.loadSavedNumbers();
    
    // Compare with historical draws
    this.compareAndDisplayResults(numbers);
    
    // Update money wasted chart
    this.updateMoneyWastedChart();
    
    // Reset form (except ticket price)
    mainNumberInputs.forEach(input => input.value = '');
    euroNumberInputs.forEach(input => input.value = '');
  }
  

  
  private loadSavedNumbers(): void {
    const savedNumbers = getNumbersFromCookie();
    const listContainer = this.savedNumbersContainer.querySelector('.saved-numbers-list') as HTMLElement;
    
    if (savedNumbers.length === 0) {
      listContainer.innerHTML = `<p class="text-gray-500 italic">${i18n.translate('eurojackpot.noNumbersSaved')}</p>`;
      this.updateOverallStats(savedNumbers);
      return;
    }
    
    listContainer.innerHTML = '';
    
    savedNumbers.forEach((numbers, index) => {
      const numbersElement = document.createElement('div');
      numbersElement.className = 'bg-gray-700 p-2 rounded mb-2 flex justify-between items-center';
      
      const mainNumbersStr = numbers.mainNumbers.join(', ');
      const euroNumbersStr = numbers.euroNumbers.join(', ');
      const dateStr = numbers.date ? ` (${numbers.date})` : '';
      const priceStr = numbers.ticketPrice ? ` - €${numbers.ticketPrice.toFixed(2)}` : '';
      
      numbersElement.innerHTML = `
        <span>
          <span class="font-semibold">${i18n.translate('eurojackpot.set')} ${index + 1}${dateStr}${priceStr}:</span> 
          <span class="text-white">${mainNumbersStr}</span> | 
          <span class="text-yellow-400">${euroNumbersStr}</span>
        </span>
        <div class="flex gap-2">
          <button class="check-btn text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md shadow-sm transition-all duration-300" data-index="${index}">
            ${i18n.translate('eurojackpot.check')}
          </button>
          <button class="delete-btn text-xs bg-gray-600 hover:bg-gray-500 text-white p-1.5 rounded-md shadow-sm transition-all duration-300" data-index="${index}" title="${i18n.translate('eurojackpot.delete')}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      `;
      
      listContainer.appendChild(numbersElement);
      
      // Add event listener to check button
      const checkBtn = numbersElement.querySelector('.check-btn') as HTMLButtonElement;
      checkBtn.addEventListener('click', () => {
        this.compareAndDisplayResults(numbers);
      });
      
      // Add event listener to delete button
      const deleteBtn = numbersElement.querySelector('.delete-btn') as HTMLButtonElement;
      deleteBtn.addEventListener('click', () => {
        this.deleteSet(index);
      });
    });
    
    // Update overall stats
    this.updateOverallStats(savedNumbers);
  }
  
  private deleteSet(index: number): void {
    const savedNumbers = getNumbersFromCookie();
    if (index >= 0 && index < savedNumbers.length) {
      savedNumbers.splice(index, 1);
      saveNumbersToCookie(savedNumbers);
      this.loadSavedNumbers();
      this.updateMoneyWastedChart();
    }
  }
  
  private updateOverallStats(savedNumbers: EurojackpotNumbers[]): void {
    // Get DOM elements
    const totalTicketsEl = document.getElementById('total-tickets') as HTMLElement;
    const totalSpentEl = document.getElementById('total-spent') as HTMLElement;
    const totalWonEl = document.getElementById('total-won') as HTMLElement;
    const netProfitEl = document.getElementById('net-profit') as HTMLElement;
    const bestWinEl = document.getElementById('best-win') as HTMLElement;
    const roiEl = document.getElementById('roi') as HTMLElement;
    
    if (!totalTicketsEl) return; // Stats section not found
    
    // Calculate stats
    const totalTickets = savedNumbers.length;
    let totalWon = 0;
    let bestWin = 0;
    let bestWinDate = '';
    
    // Get date range for historical draws
    const startDateInput = document.getElementById('start-date') as HTMLInputElement;
    const endDateInput = document.getElementById('end-date') as HTMLInputElement;
    const startDate = startDateInput?.value || undefined;
    const endDate = endDateInput?.value || undefined;
    
    // Count number of draws in the date range
    const drawsInRange = historicalDraws.filter(draw => {
      if (!draw.date) return false;
      if (startDate && draw.date < startDate) return false;
      if (endDate && draw.date > endDate) return false;
      return true;
    });
    
    const numberOfDraws = drawsInRange.length || historicalDraws.length;
    
    // Calculate total spent (ticket price × number of draws)
    let totalSpent = 0;
    savedNumbers.forEach(ticket => {
      const ticketPrice = ticket.ticketPrice || this.DEFAULT_TICKET_PRICE;
      totalSpent += (ticketPrice * numberOfDraws);
      
      // Find best matches for this ticket across all historical draws
      const results = compareWithHistorical(ticket, startDate, endDate);
      
      // Calculate winnings for this ticket
      results.forEach(result => {
        if (result.isWinner && result.draw.prizeDistribution) {
          const matchKey = `${result.matches.mainNumbers} + ${result.matches.euroNumbers}`;
          const prize = result.draw.prizeDistribution[matchKey] || 0;
          
          // Track best win and its date
          if (prize > bestWin) {
            bestWin = prize;
            bestWinDate = result.draw.date || '';
          }
          
          // Add all winnings
          totalWon += prize;
        }
      });
    });
    
    // Calculate net profit/loss and ROI
    const netProfit = totalWon - totalSpent;
    const roi = totalSpent > 0 ? (totalWon / totalSpent) * 100 : 0;
    
    // Update UI
    totalTicketsEl.textContent = totalTickets.toString();
    totalSpentEl.textContent = `€${totalSpent.toFixed(2)}`;
    totalWonEl.textContent = `€${totalWon.toFixed(2)}`;
    
    // Set net profit color based on value
    netProfitEl.textContent = `€${netProfit.toFixed(2)}`;
    netProfitEl.className = netProfit >= 0 ? 'text-2xl font-bold text-green-400' : 'text-2xl font-bold text-red-400';
    
    // Format best win with date if available
    if (bestWin > 0 && bestWinDate) {
      const formattedDate = new Date(bestWinDate).toLocaleDateString();
      bestWinEl.textContent = `€${bestWin.toFixed(2)} (${formattedDate})`;
    } else {
      bestWinEl.textContent = `€${bestWin.toFixed(2)}`;
    }
    
    // Set ROI color based on value
    roiEl.textContent = `${roi.toFixed(1)}%`;
    roiEl.className = roi >= 100 ? 'text-xl font-bold text-green-400' : 'text-xl font-bold text-red-400';
  }
  
  private compareAndDisplayResults(numbers: EurojackpotNumbers): void {
    // Get date range inputs
    const startDateInput = document.getElementById('start-date') as HTMLInputElement;
    const endDateInput = document.getElementById('end-date') as HTMLInputElement;
    
    // Get date values (if provided)
    const startDate = startDateInput?.value || undefined;
    const endDate = endDateInput?.value || undefined;
    
    // Compare with historical draws using date range if provided
    const results = compareWithHistorical(numbers, startDate, endDate);
    
    // Store the numbers for later use (when date range changes)
    this.resultsContainer.dataset.lastCheckedNumbers = JSON.stringify(numbers);
    
    // Display results
    this.displayResults(results, 'eurojackpot.historicalDraws');
  }
  
  private displayResults(results: EurojackpotResult[], comparisonTypeKey: string): void {
    this.resultsContainer.classList.remove('hidden');
    const resultsListContainer = this.resultsContainer.querySelector('.results-list') as HTMLElement;
    
    resultsListContainer.innerHTML = '';
    
    if (results.length === 0) {
      resultsListContainer.innerHTML = `<p class="text-gray-500 italic">${i18n.translate('eurojackpot.noResults')}</p>`;
      return;
    }
    
    // Add header for the comparison type
    const headerElement = document.createElement('div');
    headerElement.className = 'mb-3 text-gray-300 font-medium';
    headerElement.textContent = `${i18n.translate('eurojackpot.comparing')} ${i18n.translate(comparisonTypeKey)}:`;
    resultsListContainer.appendChild(headerElement);
    
    // Count matches and calculate stats
    const matchCount = results.filter(r => r.isWinner).length;
    const totalResults = results.length;
    const winPercentage = totalResults > 0 ? ((matchCount / totalResults) * 100).toFixed(1) : '0';
    
    // Add stats summary
    const statsElement = document.createElement('div');
    statsElement.className = 'mb-4 p-3 rounded bg-gray-700';
    statsElement.innerHTML = `
      <div class="flex justify-between items-center">
        <div>
          <p class="text-gray-300">${i18n.translate('eurojackpot.totalChecked')}: <span class="font-bold text-white">${totalResults}</span></p>
          <p class="text-gray-300">${i18n.translate('eurojackpot.winningDraws')}: <span class="font-bold ${matchCount > 0 ? 'text-green-400' : 'text-white'}">${matchCount}</span></p>
        </div>
        <div class="text-right">
          <p class="text-gray-300">${i18n.translate('eurojackpot.winPercentage')}</p>
          <p class="text-2xl font-bold ${Number(winPercentage) > 0 ? 'text-green-400' : 'text-white'}">${winPercentage}%</p>
        </div>
      </div>
    `;
    resultsListContainer.appendChild(statsElement);
    
    // Add match summary for saved numbers comparison
    if (comparisonTypeKey === 'eurojackpot.savedNumbersLabel') {
      const summaryElement = document.createElement('div');
      summaryElement.className = `mb-4 p-3 rounded ${matchCount > 0 ? 'bg-green-800' : 'bg-gray-700'}`;
      
      if (matchCount === 0) {
        summaryElement.innerHTML = `<p class="text-gray-300">${i18n.translate('eurojackpot.noMatches')}</p>`;
      } else {
        const translationKey = matchCount === 1 ? 'eurojackpot.matchesFound' : 'eurojackpot.matchesFoundPlural';
        summaryElement.innerHTML = `<p class="font-bold text-white">${i18n.translate(translationKey, { count: matchCount })}</p>`;
      }
      
      resultsListContainer.appendChild(summaryElement);
    }
    
    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.className = `bg-gray-700 p-4 rounded-md mb-3 shadow-md ${result.isWinner ? 'border-l-4 border-yellow-400' : ''}`;
      
      const drawDate = result.draw.date || 'Unknown date';
      const mainNumbersStr = result.draw.mainNumbers.join(', ');
      const euroNumbersStr = result.draw.euroNumbers.join(', ');
      
      resultElement.innerHTML = `
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">${drawDate}</span>
          ${result.isWinner ? `<span class="text-yellow-400 font-bold">MATCH!</span>` : ''}
        </div>
        <div class="mb-1">
          <span class="text-gray-400">Numbers:</span> 
          <span class="text-white">${mainNumbersStr}</span> | 
          <span class="text-yellow-400">${euroNumbersStr}</span>
        </div>
        <div>
          <span class="text-gray-400">Matches:</span> 
          <span class="text-white">${result.matches.mainNumbers} main</span>, 
          <span class="text-yellow-400">${result.matches.euroNumbers} euro</span>
        </div>
      `;
      
      resultsListContainer.appendChild(resultElement);
    });
  }
  
  private initMoneyWastedChart(): void {
    console.log('Initializing money wasted chart');
    
    // Use the existing chart container from the HTML
    const chartContainer = document.getElementById('money-wasted-container');
    if (!chartContainer) {
      console.error('Chart container not found');
      return;
    }
    console.log('Chart container found:', chartContainer);
    
    // Get saved numbers
    const savedNumbers = getNumbersFromCookie();
    console.log('Saved numbers for chart:', savedNumbers);
    
    // Ensure the canvas container exists
    const canvasContainer = chartContainer.querySelector('.h-80');
    if (!canvasContainer) {
      console.error('Canvas container not found');
      return;
    }
    console.log('Canvas container found:', canvasContainer);
    
    // Ensure the canvas exists
    let chartCanvas = document.getElementById('money-wasted-chart') as HTMLCanvasElement;
    if (!chartCanvas) {
      console.log('Chart canvas not found, creating it');
      
      // Create a new canvas element
      chartCanvas = document.createElement('canvas');
      chartCanvas.id = 'money-wasted-chart';
      
      // Clear the container and add the canvas
      canvasContainer.innerHTML = '';
      canvasContainer.appendChild(chartCanvas);
      
      console.log('Created new canvas element:', chartCanvas);
    } else {
      console.log('Existing canvas found:', chartCanvas);
    }
    
    // If no saved numbers, show message and return
    if (savedNumbers.length === 0) {
      const chartParent = chartCanvas.parentElement;
      if (chartParent) {
        chartParent.innerHTML = `<p class="text-gray-500 italic text-center py-12">${i18n.translate('eurojackpot.noNumbersSaved')}</p>`;
      }
      return;
    }
    
    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;
    
    // Calculate data for the chart
    const data = calculateMoneyWasted();
    
    // If no data points, show message and return
    if (data.dates.length === 0) {
      const chartParent = chartCanvas.parentElement;
      if (chartParent) {
        chartParent.innerHTML = `<p class="text-gray-500 italic text-center py-12">No data available for the selected date range.</p>`;
      }
      return;
    }
    
    // If we already have a chart, destroy it
    if (this.moneyWastedChart) {
      this.moneyWastedChart.destroy();
    }
    
    // Create new chart
    this.moneyWastedChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [
          {
            label: i18n.translate('moneyWasted.title'),
            data: data.amounts,
            backgroundColor: function(context) {
              const value = context.dataset.data[context.dataIndex];
              return (value as number) >= 0 ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)';
            },
            borderColor: function(context) {
              const value = context.dataset.data[context.dataIndex];
              return (value as number) >= 0 ? 'rgba(74, 222, 128, 1)' : 'rgba(239, 68, 68, 1)';
            },
            borderWidth: 2,
            fill: true,
            tension: 0.4
          },
          {
            label: i18n.translate('moneyWasted.etfGrowth', 'ETF Growth'),
            data: data.etfAmounts,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `€${Number(context.raw).toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              callback: function(value) {
                return '€' + Number(value).toFixed(2);
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              maxTicksLimit: 12,
              autoSkip: true,
              maxRotation: 0
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });
    
    // Update total wasted amount
    const moneyWastedContainer = document.getElementById('money-wasted-container');
    if (!moneyWastedContainer) return;
    
    const totalElement = document.createElement('div');
    totalElement.className = 'mt-4 text-center grid grid-cols-2 gap-4';
    
    // Use green for profit, red for loss
    const isProfit = data.totalWasted >= 0;
    const colorClass = isProfit ? 'text-green-500' : 'text-red-500';
    const labelKey = isProfit ? 'moneyWasted.totalProfit' : 'moneyWasted.total';
    
    totalElement.innerHTML = `
      <div>
        <p class="text-gray-300">${i18n.translate(labelKey, i18n.translate('moneyWasted.total'))}</p>
        <p class="text-3xl font-bold ${colorClass}">€${data.totalWasted.toFixed(2)}</p>
      </div>
      <div>
        <p class="text-gray-300">${i18n.translate('moneyWasted.etfTotal', 'ETF Value')}</p>
        <p class="text-3xl font-bold text-blue-500">€${data.totalEtfValue.toFixed(2)}</p>
      </div>
    `;
    
    // Clear any existing total elements and add the new one
    const existingTotal = moneyWastedContainer.querySelector('.mt-4');
    if (existingTotal) {
      existingTotal.remove();
    }
    moneyWastedContainer.appendChild(totalElement);
  }
  
  private updateMoneyWastedChart(): void {
    // If chart doesn't exist, initialize it
    if (!this.moneyWastedChart) {
      this.initMoneyWastedChart();
      return;
    }
    
    const data = calculateMoneyWasted();
    
    // If no data, destroy chart and show message
    if (data.dates.length === 0) {
      this.moneyWastedChart.destroy();
      this.moneyWastedChart = null;
      
      const chartCanvas = document.getElementById('money-wasted-chart') as HTMLCanvasElement;
      if (chartCanvas && chartCanvas.parentElement) {
        chartCanvas.parentElement.innerHTML = `<p class="text-gray-500 italic text-center py-12">${i18n.translate('eurojackpot.noNumbersSaved')}</p>`;
      }
      return;
    }
    
    // Update chart with new data
    this.moneyWastedChart.data.labels = data.dates;
    this.moneyWastedChart.data.datasets[0].data = data.amounts;
    this.moneyWastedChart.data.datasets[0].label = i18n.translate('moneyWasted.title');
    
    // Update ETF dataset
    if (this.moneyWastedChart.data.datasets.length > 1) {
      this.moneyWastedChart.data.datasets[1].data = data.etfAmounts;
      this.moneyWastedChart.data.datasets[1].label = i18n.translate('moneyWasted.etfGrowth', 'ETF Growth');
    } else {
      // Add ETF dataset if it doesn't exist
      this.moneyWastedChart.data.datasets.push({
        label: i18n.translate('moneyWasted.etfGrowth', 'ETF Growth'),
        data: data.etfAmounts,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      });
    }
    
    this.moneyWastedChart.update();
    
    // Update total wasted amount
    let totalElement = document.querySelector('#money-wasted-container .total-wasted');
    if (!totalElement) {
      totalElement = document.createElement('div');
      totalElement.className = 'total-wasted mt-4 text-center';
      const moneyWastedContainer = document.getElementById('money-wasted-container');
      if (moneyWastedContainer) {
        moneyWastedContainer.appendChild(totalElement);
      }
    }
    
    if (totalElement) {
      // Use green for profit, red for loss
      const isProfit = data.totalWasted >= 0;
      const colorClass = isProfit ? 'text-green-500' : 'text-red-500';
      const labelKey = isProfit ? 'moneyWasted.totalProfit' : 'moneyWasted.total';
      
      const prefix = data.totalWasted < 0 ? '-' : '';
      totalElement.innerHTML = `
        <p class="text-gray-300">${i18n.translate(labelKey, i18n.translate('moneyWasted.total'))}</p>
        <p class="text-3xl font-bold ${colorClass}">${prefix}€${Math.abs(data.totalWasted).toFixed(2)}</p>
      `;
    }
  }
}