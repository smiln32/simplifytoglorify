import type { RefObject } from 'react';

export type SectionRef = RefObject<HTMLDivElement | null>;

export type SectionRefs = {
  heroRef: SectionRef;
  aboutRef: SectionRef;
  collectionRef: SectionRef;
  featuredRef: SectionRef;
  howItWorksRef: SectionRef;
  topicsRef: SectionRef;
  articlesRef: SectionRef;
  blogRef: SectionRef;
  freeResourceRef: SectionRef;
  contactRef: SectionRef;
};

export type ScrollFn = (ref: SectionRef) => void;
