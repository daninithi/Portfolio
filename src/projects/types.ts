import type { IconType } from "react-icons";

// ---------- Architecture diagram ----------
// Boxes are placed on a fixed canvas (viewBox), arrows are drawn between box edges.
export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;        // small second line, e.g. port or tech
  icon?: IconType;
  color?: string;      // accent for the icon / border
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  both?: boolean;      // arrow heads at both ends
  dashed?: boolean;    // for optional / background links
  vertical?: boolean;  // straight down/up from the source's centre (e.g. into a wide DB bar)
  labelDx?: number;    // nudge the label so it doesn't sit on a box
  labelDy?: number;
};

export type DiagramGroup = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  color?: string;
};

export type Diagram = {
  width: number;
  height: number;
  groups?: DiagramGroup[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

// ---------- Project ----------
export type StackItem = { name: string; icon?: IconType; color?: string };

export type Project = {
  slug: string;              // used in the URL: #/projects/<slug>
  title: string;
  tagline: string;           // one line, shown on the card
  description: string;       // short paragraph, shown on the detail page
  repo: string;
  accent: string;            // main color for the cover and highlights
  accent2: string;           // second color for the cover gradient
  coverIcon: IconType;       // faint background logo on the card cover
  highlights: string[];      // 3–4 short feature points
  mainStack: string[];       // chips on the home card
  stack: { group: string; items: StackItem[] }[];
  diagram: Diagram;
  diagramCaption: string;
  flow: { title: string; detail: string }[];
  learned: string[];
  challenges: { problem: string; solution: string }[];
};
