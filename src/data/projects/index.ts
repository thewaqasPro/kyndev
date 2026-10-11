// src/data/projects/index.ts
import type { ProjectData } from './types';
import { oryzo_ai } from './oryzo_ai';
import { atlas_motion } from './atlas_motion';
import { devin_ai } from './devin_ai';
import { of_the_oak } from './of_the_oak';
import { everswap } from './everswap';
import { porsche_dream_machine } from './porsche_dream_machine';
import { synthetic_human } from './synthetic_human';
import { ddd_2024 } from './ddd_2024';
import { spaace } from './spaace';
import { choo_choo_world } from './choo_choo_world';
import { zero_tech } from './zero_tech';
import { spatial_fusion } from './spatial_fusion';
import { worldcoin } from './worldcoin';
import { lusion_labs } from './lusion_labs';
import { my_little_story_book } from './my_little_story_book';
import { soda_experience } from './soda_experience';
import { infinite_passerella } from './infinite_passerella';
import { the_turn_of_the_screw } from './the_turn_of_the_screw';
import { maxmara_bearings_gifts } from './maxmara_bearings_gifts';

export * from './types';
export { oryzo_ai } from './oryzo_ai';
export { atlas_motion } from './atlas_motion';
export { devin_ai } from './devin_ai';
export { of_the_oak } from './of_the_oak';
export { everswap } from './everswap';
export { porsche_dream_machine } from './porsche_dream_machine';
export { synthetic_human } from './synthetic_human';
export { ddd_2024 } from './ddd_2024';
export { spaace } from './spaace';
export { choo_choo_world } from './choo_choo_world';
export { zero_tech } from './zero_tech';
export { spatial_fusion } from './spatial_fusion';
export { worldcoin } from './worldcoin';
export { lusion_labs } from './lusion_labs';
export { my_little_story_book } from './my_little_story_book';
export { soda_experience } from './soda_experience';
export { infinite_passerella } from './infinite_passerella';
export { the_turn_of_the_screw } from './the_turn_of_the_screw';
export { maxmara_bearings_gifts } from './maxmara_bearings_gifts';

export const projectsData: Record<string, ProjectData> = {
  oryzo_ai: oryzo_ai,
  atlas_motion: atlas_motion,
  devin_ai: devin_ai,
  of_the_oak: of_the_oak,
  everswap: everswap,
  porsche_dream_machine: porsche_dream_machine,
  synthetic_human: synthetic_human,
  ddd_2024: ddd_2024,
  spaace: spaace,
  choo_choo_world: choo_choo_world,
  zero_tech: zero_tech,
  spatial_fusion: spatial_fusion,
  worldcoin: worldcoin,
  lusion_labs: lusion_labs,
  my_little_story_book: my_little_story_book,
  soda_experience: soda_experience,
  infinite_passerella: infinite_passerella,
  the_turn_of_the_screw: the_turn_of_the_screw,
  maxmara_bearings_gifts: maxmara_bearings_gifts,
};

export const projectsList: ProjectData[] = Object.values(projectsData);
