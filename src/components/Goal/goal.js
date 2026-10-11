/**
 * Goal Section Controller
 * Manages the Goal and 3D Tunnel section hooks and interactive states.
 */

export class GoalController {
  constructor() {
    this.section = document.querySelector('#home-goal');
    this.title = document.querySelector('#home-goal-title');
    this.tunnelTitle = document.querySelector('#home-goal-tunnel-title');
    this.tunnelLines = document.querySelectorAll('.home-goal-tunnel-title-line');

    if (!this.section) return;
    this.init();
  }

  init() {
    // Expose lifecycle hooks or custom events if needed
  }
}

// Auto-initialize when the DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GoalController());
  } else {
    new GoalController();
  }
}
