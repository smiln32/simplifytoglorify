import type { RefObject } from 'react';

export type SectionRef = RefObject<HTMLElement | null>;

export type SectionRefs = {
  heroRef: SectionRef;
  aboutRef: SectionRef;
  topicsRef: SectionRef;
  articlesRef: SectionRef;
  freeResourceRef: SectionRef;
  contactRef: SectionRef;
};

export type ScrollFn = (ref: SectionRef) => void;
