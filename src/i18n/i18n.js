import { translations } from './translations';

class I18nService {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translations = translations;
  }

  init() {
    this.setLanguage(this.currentLanguage);
    this.bindLanguageSelector();
  }

  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.error(`Language ${lang} not supported`);
      return;
    }

    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.updateDOM();
  }

  bindLanguageSelector() {
    console.log('Binding language selector...');
    
    // Try to find the language selector
    const selector = document.getElementById('language-selector');
    
    if (!selector) {
      console.warn('Language selector not found, will retry');
      
      // If not found, retry after a delay
      setTimeout(() => {
        const retrySelector = document.getElementById('language-selector');
        if (retrySelector) {
          console.log('Language selector found on retry');
          this._bindSelectorEvents(retrySelector);
        } else {
          console.error('Language selector still not found after retry');
        }
      }, 500);
      return;
    }
    
    // If found immediately, bind events
    this._bindSelectorEvents(selector);
  }
  
  _bindSelectorEvents(selector) {
    // Set the current language
    selector.value = this.currentLanguage;
    
    // Add event listener with console logging
    selector.addEventListener('change', (e) => {
      console.log('Language changed to:', e.target.value);
      this.setLanguage(e.target.value);
    });
    
    console.log('Language selector bound successfully');
  }

  updateDOM() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        element.textContent = translation;
      }
    });

    // Dispatch event for components to update
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: this.currentLanguage }
    }));
  }

  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return null;
      }
    }
    
    return value;
  }

  translate(key, params = {}) {
    let text = this.getTranslation(key);
    
    if (!text) return key;
    
    // Replace parameters in the text
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
    
    return text;
  }
}

export const i18n = new I18nService();
export default i18n;