/**
 * TypeScript utility functions
 */

// Define a type for a person
export interface Person {
  id: number;
  name: string;
  age: number;
}

// Function with TypeScript types
export function filterAdults(people: Person[]): Person[] {
  return people.filter(person => person.age >= 18);
}

// Generic function example
export function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Type assertion example
export function getFirstItem<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error('Array is empty');
  }
  return items[0];
}

// Utility type example
export type Optional<T> = {
  [P in keyof T]?: T[P];
};

// Example of using the utility type
export function updatePerson(person: Person, updates: Optional<Person>): Person {
  return { ...person, ...updates };
}