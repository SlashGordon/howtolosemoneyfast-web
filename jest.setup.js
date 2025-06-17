// Mock browser globals for tests
if (typeof global.btoa === 'undefined') {
  global.btoa = (str) => Buffer.from(str).toString('base64');
}

if (typeof global.atob === 'undefined') {
  global.atob = (str) => Buffer.from(str, 'base64').toString();
}

// Mock DOM elements for initContactInfo tests
global.document = {
  getElementById: jest.fn()
};