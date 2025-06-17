import { encrypt, decrypt, initContactInfo } from '../../src/utils/contactEncryption';

describe('Contact Encryption Utils', () => {
  test('encrypt should correctly encrypt strings', () => {
    expect(encrypt('test')).toBe('dWZ0dQ==');
    expect(encrypt('Am Platz 5')).toBe('Qm4hUW1idXshNg==');
    expect(encrypt('123')).toBe('MjM0');
  

  });

  test('decrypt should correctly decrypt strings', () => {
    expect(decrypt('dWZ0dQ==')).toBe('test');
    expect(decrypt('Qm4hUW1idXshNg==')).toBe('Am Platz 5');
    expect(decrypt('MjM0')).toBe('123');
  });

  test('encrypt and decrypt should be reversible', () => {
    const testStrings = [
      'Am Tank',
      'dsds Baba in der Berla',
      'sdsdsd',
      'test@example.com',
      'Special chars: !@#$%^&*()'
    ];

    testStrings.forEach(str => {
      expect(decrypt(encrypt(str))).toBe(str);
    });
  });
  
});