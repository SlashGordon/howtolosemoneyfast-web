/**
 * Safely get an HTML element by ID with type checking
 * @param id The ID of the element to get
 * @returns The element or null if not found
 */
export function getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/**
 * Safely query an HTML element with type checking
 * @param selector The CSS selector to query
 * @returns The element or null if not found
 */
export function querySelector<T extends HTMLElement = HTMLElement>(selector: string): T | null {
  return document.querySelector(selector) as T | null;
}

/**
 * Safely query all HTML elements with type checking
 * @param selector The CSS selector to query
 * @returns NodeList of elements
 */
export function querySelectorAll<T extends HTMLElement = HTMLElement>(selector: string): NodeListOf<T> {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}

/**
 * Add an event listener with proper typing
 * @param element The element to add the listener to
 * @param event The event type
 * @param handler The event handler
 */
export function addEventListenerTyped<K extends keyof HTMLElementEventMap>(
  element: HTMLElement | null,
  event: K,
  handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
): void {
  if (element) {
    element.addEventListener(event, handler);
  }
}
