/**
 * Simple encryption/decryption utility for contact information
 */

// Encrypted data (encoded with Base64 + simple shift cipher)
export const encName: string = "RGlzanR1cHFpIUVqZmRs";
export const encEmail: string = "dG1idGkvaHBzZXBvL2Vmd0FobmJqbS9kcG4=";
export const encPhone: string = "LDU6Mjg1NDY2Mzc6Nw==";
export const encAddress1: string = "Qm4hSWJvaCE4";
export const encAddress2: string = "MzIzNTUhQ3ZkaWlwbXsham8hZWZzIU9wc2VpZmplZg==";

/**
 * Cross-environment base64 encoding (works in both browser and Node.js)
 */
function safeBase64Encode(str: string): string {
  if (typeof btoa !== 'undefined') {
    return btoa(str);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64');
  }
  throw new Error('No base64 encoding function available');
}

/**
 * Cross-environment base64 decoding (works in both browser and Node.js)
 */
function safeBase64Decode(str: string): string {
  if (typeof atob !== 'undefined') {
    return atob(str);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString();
  }
  throw new Error('No base64 decoding function available');
}

/**
 * Encrypts a string using character shift and Base64 encoding
 * @param text - Plain text string to encrypt
 * @returns Encrypted string
 */
export function encrypt(text: string): string {
  const shifted = text.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 1)).join('');
  return safeBase64Encode(shifted);
}

/**
 * Decrypts an encoded string
 * @param encoded - Base64 encoded string with character shift
 * @returns Decrypted string
 */
export function decrypt(encoded: string): string {
  const decoded = safeBase64Decode(encoded);
  return decoded.split('').map(c => String.fromCharCode(c.charCodeAt(0) - 1)).join('');
}

/**
 * Initializes contact information on the page using data attributes
 */
export function initContactInfo(): void {
  const elements = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    address1: document.getElementById('address1'),
    address2: document.getElementById('address2'),
    phone: document.getElementById('phone'),
    address1_2: document.getElementById('address1_2'),
    address2_2: document.getElementById('address2_2'),
    name1_2: document.getElementById('name1_2')
  };

  // Apply data attributes instead of text content
  if (elements.address1) applyObfuscatedText(elements.address1, encAddress1);
  if (elements.address2) applyObfuscatedText(elements.address2, encAddress2);
  if (elements.phone) applyObfuscatedText(elements.phone, encPhone);
  if (elements.address1_2) applyObfuscatedText(elements.address1_2, encAddress1);
  if (elements.address2_2) applyObfuscatedText(elements.address2_2, encAddress2);
  if (elements.name1_2) applyObfuscatedText(elements.name1_2, encName);
  if (elements.name) applyObfuscatedText(elements.name, encName);
  if (elements.email) applyObfuscatedEmail(elements.email, encEmail);
}

/**
 * Applies obfuscated text to an element using data attributes and CSS
 * @param element - DOM element to apply text to
 * @param encodedText - Encoded text to decrypt and apply
 */
function applyObfuscatedText(element: HTMLElement, encodedText: string): void {
  const text = decrypt(encodedText);
  element.innerHTML = '';
  
  // Split text into individual characters and apply as data attributes
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.setAttribute('data-char', text[i]);
    span.className = 'obfuscated-char';
    element.appendChild(span);
  }
  
  // Add CSS if not already present
  if (!document.getElementById('obfuscation-css')) {
    const style = document.createElement('style');
    style.id = 'obfuscation-css';
    style.textContent = `
      .obfuscated-char::before {
        content: attr(data-char);
      }
      .obfuscated-email::before {
        content: attr(data-user) '\\0040' attr(data-domain);
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Applies obfuscated email to an element using data attributes
 * @param element - DOM element to apply email to
 * @param encodedEmail - Encoded email to decrypt and apply
 */
function applyObfuscatedEmail(element: HTMLElement, encodedEmail: string): void {
  const email = decrypt(encodedEmail);
  const [user, domain] = email.split('@');
  
  element.innerHTML = '';
  element.className = 'obfuscated-email';
  element.setAttribute('data-user', user);
  element.setAttribute('data-domain', domain);
}