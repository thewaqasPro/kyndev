// src/data/common/endSection.ts

export interface EndSectionData {
  /** Upper callout question */
  subtitle: string;
  /** Primary call-to-action line 1 */
  titleLine1: string;
  /** Primary call-to-action line 2 */
  titleLine2: string;
  /** Scroll invitation caption */
  scrollText: string;
}

export const endSectionData: EndSectionData = {
  subtitle: 'Is Your Big Idea Ready to Go Wild?',
  titleLine1: "Let's work",
  titleLine2: 'together!',
  scrollText: 'CONTINUE TO SCROLL',
};
