// src/data/projects/index.ts
import type { ProjectData } from './types';
import { aguy_contracting } from './aguy_contracting';
import { atlas_motion } from './atlas_motion';
import { choo_choo_world } from './choo_choo_world';
import { ddd_2024 } from './ddd_2024';
import { devin_ai } from './devin_ai';
import { everswap } from './everswap';
import { infinite_passerella } from './infinite_passerella';
import { lusion_labs } from './lusion_labs';
import { maxmara_bearings_gifts } from './maxmara_bearings_gifts';
import { my_little_story_book } from './my_little_story_book';
import { of_the_oak } from './of_the_oak';
import { oryzo_ai } from './oryzo_ai';
import { porsche_dream_machine } from './porsche_dream_machine';
import { soda_experience } from './soda_experience';
import { spaace } from './spaace';
import { spatial_fusion } from './spatial_fusion';
import { synthetic_human } from './synthetic_human';
import { the_turn_of_the_screw } from './the_turn_of_the_screw';
import { worldcoin } from './worldcoin';
import { zero_tech } from './zero_tech';

export * from './types';
export { aguy_contracting } from './aguy_contracting';
export { atlas_motion } from './atlas_motion';
export { choo_choo_world } from './choo_choo_world';
export { ddd_2024 } from './ddd_2024';
export { devin_ai } from './devin_ai';
export { everswap } from './everswap';
export { infinite_passerella } from './infinite_passerella';
export { lusion_labs } from './lusion_labs';
export { maxmara_bearings_gifts } from './maxmara_bearings_gifts';
export { my_little_story_book } from './my_little_story_book';
export { of_the_oak } from './of_the_oak';
export { oryzo_ai } from './oryzo_ai';
export { porsche_dream_machine } from './porsche_dream_machine';
export { soda_experience } from './soda_experience';
export { spaace } from './spaace';
export { spatial_fusion } from './spatial_fusion';
export { synthetic_human } from './synthetic_human';
export { the_turn_of_the_screw } from './the_turn_of_the_screw';
export { worldcoin } from './worldcoin';
export { zero_tech } from './zero_tech';

export const projectsData: Record<string, ProjectData> = {
  aguy_contracting: aguy_contracting,
  atlas_motion: atlas_motion,
  choo_choo_world: choo_choo_world,
  ddd_2024: ddd_2024,
  devin_ai: devin_ai,
  everswap: everswap,
  infinite_passerella: infinite_passerella,
  lusion_labs: lusion_labs,
  maxmara_bearings_gifts: maxmara_bearings_gifts,
  my_little_story_book: my_little_story_book,
  of_the_oak: of_the_oak,
  oryzo_ai: oryzo_ai,
  porsche_dream_machine: porsche_dream_machine,
  soda_experience: soda_experience,
  spaace: spaace,
  spatial_fusion: spatial_fusion,
  synthetic_human: synthetic_human,
  the_turn_of_the_screw: the_turn_of_the_screw,
  worldcoin: worldcoin,
  zero_tech: zero_tech,
};

export const projectsList: ProjectData[] = Object.values(projectsData);
