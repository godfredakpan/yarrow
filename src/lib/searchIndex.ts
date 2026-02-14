/**
 * Searchable items across the site. Used by the Search page.
 */
export type SearchItem = {
  title: string;
  path: string;
  snippet: string;
  category: "Page" | "Programme" | "Topic" | "Event";
  keywords?: string[];
};

/** Normalize for matching (lowercase, no diacritics) */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export const searchIndex: SearchItem[] = [
  {
    title: "About us",
    path: "/about",
    snippet: "Our mission and values.",
    category: "Page",
    keywords: ["about", "mission", "values"],
  },
  {
    title: "Programmes",
    path: "/programs",
    snippet: "Topic-based programmes and resources.",
    category: "Page",
    keywords: ["programs", "programmes", "resources"],
  },
  {
    title: "Events",
    path: "/events",
    snippet: "Upcoming workshops and community events.",
    category: "Page",
    keywords: ["event", "events", "workshops", "webinar", "calendar", "upcoming", "past"],
  },
  {
    title: "Contact",
    path: "/contact",
    snippet: "Get in touch or book a free consultation.",
    category: "Page",
    keywords: ["contact", "consultation", "book", "whatsapp"],
  },
  {
    title: "Puberty & periods",
    path: "/programs/foundations",
    snippet: "Puberty, periods, contraception basics, menstrual health.",
    category: "Programme",
    keywords: ["puberty", "periods", "menstrual", "contraception", "first period"],
  },
  {
    title: "Reproductive health & fertility",
    path: "/programs/reproductive",
    snippet: "Family planning, fertility, PCOS, reproductive health.",
    category: "Programme",
    keywords: ["fertility", "pcos", "family planning", "pregnancy", "reproductive"],
  },
  {
    title: "Hormonal changes & perimenopause",
    path: "/programs/hormonal",
    snippet: "Hot flashes, mood, hormones, perimenopause support.",
    category: "Programme",
    keywords: ["perimenopause", "menopause", "hot flashes", "hormones"],
  },
  {
    title: "Long-term wellness",
    path: "/programs/wellness",
    snippet: "Bone health, screenings, vitality, wellness.",
    category: "Programme",
    keywords: ["bone", "menopause", "screenings", "wellness", "vitality"],
  },
  {
    title: "Consultation",
    path: "/contact",
    snippet: "Book a free, confidential consultation.",
    category: "Topic",
    keywords: ["consultation", "book", "free", "appointment"],
  },
  {
    title: "PCOS",
    path: "/programs/reproductive",
    snippet: "Information and support for PCOS.",
    category: "Topic",
    keywords: ["pcos", "polycystic"],
  },
  {
    title: "Fertility",
    path: "/programs/reproductive",
    snippet: "Fertility awareness and family planning.",
    category: "Topic",
    keywords: ["fertility", "family planning", "pregnancy"],
  },
  {
    title: "Menopause",
    path: "/programs/hormonal",
    snippet: "Perimenopause and menopause support.",
    category: "Topic",
    keywords: ["menopause", "perimenopause"],
  },
];

export function search(query: string): SearchItem[] {
  const q = normalize(query).trim();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);
  const scored = searchIndex.map((item) => {
    const titleNorm = normalize(item.title);
    const snippetNorm = normalize(item.snippet);
    const keywordsNorm = (item.keywords || []).join(" ");
    const searchable = `${titleNorm} ${snippetNorm} ${keywordsNorm}`;

    let score = 0;
    for (const term of terms) {
      if (titleNorm.includes(term)) score += 10;
      if (keywordsNorm.includes(term)) score += 5;
      if (snippetNorm.includes(term)) score += 2;
    }
    return { item, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
