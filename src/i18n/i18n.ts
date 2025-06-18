import { translations } from './translations';

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

interface Translations {
  [locale: string]: TranslationObject;
}

interface I18nEventDetail {
  language: string;
}

class I18nService {
  private currentLanguage: string;
  private translations: Translations;

  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translations = translations;
  }

  init(): void {
    this.setLanguage(this.currentLanguage);
    this.bindLanguageSelector();
  }

  setLanguage(lang: string): void {
    if (!this.translations[lang]) {
      console.error(`Language ${lang} not supported`);
      return;
    }

    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.updateDOM();
  }

  bindLanguageSelector(): void {
    console.log('Binding language selector...');
    
    // Try to find the language selector
    const selector = document.getElementById('language-selector') as HTMLSelectElement | null;
    
    if (!selector) {
      console.warn('Language selector not found, will retry');
      
      // If not found, retry after a delay
      setTimeout(() => {
        const retrySelector = document.getElementById('language-selector') as HTMLSelectElement | null;
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
  
  private _bindSelectorEvents(selector: HTMLSelectElement): void {
    // Set the current language
    selector.value = this.currentLanguage;
    
    // Add event listener with console logging
    selector.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      console.log('Language changed to:', target.value);
      this.setLanguage(target.value);
    });
    
    console.log('Language selector bound successfully');
  }

  updateDOM(): void {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const translation = this.getTranslation(key);
        if (translation) {
          element.textContent = translation;
        }
      }
    });

    // Dispatch event for components to update
    document.dispatchEvent(new CustomEvent<I18nEventDetail>('languageChanged', {
      detail: { language: this.currentLanguage }
    }));
  }

  getTranslation(key: string): string | null {
    const keys = key.split('.');
    let value: TranslationObject | string = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return null;
      }
    }
    
    return typeof value === 'string' ? value : null;
  }

  translate(key: string, params: Record<string, string | number> = {}): string {
    let text = this.getTranslation(key);
    
    if (!text) return key;
    
    // Replace parameters in the text
    Object.entries(params).forEach(([param, value]) => {
      text = text!.replace(`{${param}}`, String(value));
    });
    
    return text;
  }
}

export const i18n = new I18nService();
export default i18n;