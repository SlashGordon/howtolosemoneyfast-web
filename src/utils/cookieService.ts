import { type EurojackpotNumbers } from '../types/eurojackpot';

const COOKIE_NAME = 'eurojackpot_numbers';
const COOKIE_EXPIRY_DAYS = 30;

export const saveNumbersToCookie = (numbers: EurojackpotNumbers[]): void => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
  
  // Encode the JSON string to handle special characters
  const encodedValue = encodeURIComponent(JSON.stringify(numbers));
  
  // Set the cookie with proper encoding
  document.cookie = `${COOKIE_NAME}=${encodedValue};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
  
  // Debug log
  console.log('Saved numbers to cookie:', numbers);
};

export const getNumbersFromCookie = (): EurojackpotNumbers[] => {
  const cookies = document.cookie.split(';');
  
  // Add debug logging
  console.log('All cookies:', document.cookie);
  
  // Improved cookie parsing
  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(`${COOKIE_NAME}=`)) {
      const cookieValue = trimmedCookie.substring(COOKIE_NAME.length + 1);
      console.log('Found cookie value:', cookieValue);
      
      try {
        const parsedValue = JSON.parse(decodeURIComponent(cookieValue));
        console.log('Parsed cookie value:', parsedValue);
        return parsedValue;
      } catch (error) {
        console.error('Error parsing EuroJackpot numbers from cookie:', error);
      }
    }
  }
  
  console.log('No cookie found or parsing failed, returning empty array');
  return [];
};

export const addNumbers = (numbers: EurojackpotNumbers): void => {
  const savedNumbers = getNumbersFromCookie();
  console.log('Current saved numbers:', savedNumbers);
  
  savedNumbers.push(numbers);
  console.log('After adding new numbers:', savedNumbers);
  
  saveNumbersToCookie(savedNumbers);
  
  // Verify the numbers were saved correctly
  const verifyNumbers = getNumbersFromCookie();
  console.log('Verification - numbers after saving:', verifyNumbers);
};