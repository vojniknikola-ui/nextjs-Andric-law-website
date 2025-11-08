export type Entity = "BiH" | "FBiH" | "RS";

export type CaseLaw = {
  caseId: string;
  court?: string;
  description?: string;
  url?: string;
};

export type Amendment = {
  amendmentId?: string;
  date?: string;
  note?: string;
  text?: string;
};

export type Article = {
  number: number;
  title?: string;
  text: string;
  history?: { date?: string; text: string }[] | null;
  caseLaw?: CaseLaw[] | null;
  amendments?: Amendment[] | null;
  extraInfo?: string | null;
  // Per-article feature overrides (optional)
  features?: Partial<LawFeatures>;
};

export type LawFeatures = {
  history: boolean;
  caseLaw: boolean;
  amendments: boolean;
  extraInfo: boolean;
  // Optional: control PDF button visibility for UI
  pdfExport?: boolean;
};

export type LawMeta = {
  adoptionDate?: string;
  entryIntoForce?: string;
  notes?: string;
};

export type LawIndexItem = {
  id: string;
  title: string;
  entity: Entity;
  // Optional direct blob URL (for remote fetch)
  href?: string;
};

export type Law = {
  id: string;
  title: string;
  entity: Entity;
  officialGazette?: string | { no: string; date?: string }[];
  features: LawFeatures;
  articles: Article[];
  amendingLaws?: { id: string; title: string; date?: string }[];
  metadata?: LawMeta;
};

export type LawIndex = {
  items: LawIndexItem[];
  // optional version or timestamp
  version?: string;
  updatedAt?: string;
};

