/**
 * Section Controllers Index
 * Central export for modular, independent section controllers
 */
import sectionRegistry from "./SectionRegistry.js";
import { homeHeroSection, HomeHeroSection } from "./HeroSection.js";
import { homeReelSection, HomeReelSection } from "./ReelSection.js";
import { homeFeaturedSection, HomeFeaturedSection } from "./FeaturedSection.js";

// Register default sections with registry
sectionRegistry.register("#home-hero", () => homeHeroSection);
sectionRegistry.register("#home-reel", () => homeReelSection);
sectionRegistry.register("#home-featured", () => homeFeaturedSection);
sectionRegistry.register("#home-goal", () => window.homeGoalSection);

// About page sections
sectionRegistry.register("#about-who", () => window.aboutWhoSection);
sectionRegistry.register("#about-clients", () => window.aboutClientSection);
sectionRegistry.register("#about-awards", () => window.aboutAwardSection);
sectionRegistry.register("#about-capability", () => window.aboutCapabilitySection);

// Projects sections
sectionRegistry.register("#projects-main", () => window.projectsMainSection);
sectionRegistry.register("#project-details", () => window.projectDetailsSection);

export * from "./SectionRegistry.js";
export * from "./HeroSection.js";
export * from "./ReelSection.js";
export * from "./FeaturedSection.js";
