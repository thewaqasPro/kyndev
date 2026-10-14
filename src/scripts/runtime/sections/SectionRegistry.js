/**
 * Dynamic Section Registry & Lifecycle Coordinator
 * Enables modular, decoupled, per-component section controllers across multi-page architecture.
 */
class SectionRegistry {
  definitions = new Map();

  /**
   * Registers a section controller by its DOM root selector
   * @param {string} selector - e.g. '#home-reel', '#home-goal', '#services-process'
   * @param {Function|Object} getter - Function returning the section singleton or the singleton itself
   */
  register(selector, getter) {
    this.definitions.set(selector, getter);
  }

  /**
   * Unregisters a section selector
   * @param {string} selector
   */
  unregister(selector) {
    this.definitions.delete(selector);
  }

  /**
   * Scans container DOM and discovers all matching registered sections
   * @param {HTMLElement} container - Page DOM root or document
   * @param {Object} hostPage - The active Page instance hosting these sections
   * @returns {Array<Object>} List of initialized active section controllers
   */
  detectSections(container, hostPage) {
    const el = container || document;
    if (!el || !el.querySelector) return [];
    const active = [];

    for (const [selector, getter] of this.definitions.entries()) {
      try {
        if (el.querySelector(selector)) {
          const section = typeof getter === 'function' ? getter() : getter;
          if (section) {
            if (typeof section.preInit === 'function') {
              section.preInit(el, hostPage);
            }
            active.push(section);
          }
        }
      } catch (err) {
        console.warn(`[SectionRegistry] Error initializing section for "${selector}":`, err);
      }
    }

    return active;
  }
}

export const sectionRegistry = new SectionRegistry();
globalThis.sectionRegistry = sectionRegistry;

export { SectionRegistry };
export default sectionRegistry;
