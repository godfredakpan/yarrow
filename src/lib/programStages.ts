/**
 * Topic-based programmes – shared by homepage pathways and programme pages.
 * No age ranges; topics are for everyone.
 * Images are in public/images/.
 */
import type { LucideIcon } from "lucide-react";
import { GraduationCap, Heart, Flower2, Sun, Droplets, Users, Sparkles, ThermometerSun, Brain, Stethoscope, UsersRound } from "lucide-react";

export type StageId = "foundations" | "reproductive" | "hormonal" | "wellness";

export interface ProgramStage {
  id: StageId;
  title: string;
  description: string;
  /** Full description for the individual page */
  descriptionLong: string;
  /** Image path under public/ (e.g. /images/teenimages.jpeg) */
  image: string;
  /** Theme color key for UI (tailwind: teen, young, peri, senior) */
  color: "teen" | "young" | "peri" | "senior";
  icon: LucideIcon;
  /** Optional small icons for homepage cards */
  extraIcons?: LucideIcon[];
  topics: string[];
}

const IMG = "/images";

export const programStages: ProgramStage[] = [
  {
    id: "foundations",
    title: "Puberty & periods",
    extraIcons: [Droplets, Users, Sparkles],
    description:
      "Understanding your body, menstrual health, and first steps. Resources on puberty, periods, contraception basics, and building healthy habits.",
    descriptionLong:
      "Whether you’re new to periods or want clear, reliable information, this programme covers the foundations: puberty and body changes, menstrual health and hygiene, contraception basics, and tips for staying well and confident.",
    image: `${IMG}/teenimages.jpeg`,
    color: "teen",
    icon: GraduationCap,
    topics: [
      "Understanding puberty and body changes",
      "Menstrual health and hygiene",
      "Healthy relationships and boundaries",
      "Nutrition and physical wellness",
      "Mental health awareness",
      "Contraception education",
    ],
  },
  {
    id: "reproductive",
    title: "Reproductive health & fertility",
    description:
      "Family planning, fertility awareness, and managing conditions like PCOS or endometriosis. Compare contraceptive options and preconception health.",
    descriptionLong:
      "Focused on reproductive health for anyone who wants it: fertility awareness, family planning, managing conditions like PCOS and endometriosis, comparing contraceptive options, and preconception health. No age limits — just evidence-based support.",
    image: `${IMG}/youngwomen.jpeg`,
    color: "young",
    icon: Heart,
    topics: [
      "Fertility awareness and family planning",
      "Managing PCOS, endometriosis, and other conditions",
      "Contraceptive options comparison",
      "Preconception health",
      "Work-life balance and stress management",
      "Regular screening guidelines",
    ],
  },
  {
    id: "hormonal",
    title: "Hormonal changes & perimenopause",
    extraIcons: [ThermometerSun, Brain, Stethoscope],
    description:
      "Understanding and managing hormonal changes, hot flashes, mood, sleep, and perimenopause. HRT, lifestyle, and community support.",
    descriptionLong:
      "Hormonal changes can affect anyone. This programme covers perimenopause and menopause: understanding the changes, managing hot flashes and night sweats, mood and sleep, bone health, HRT and alternatives, and lifestyle support.",
    image: `${IMG}/perimenopause.jpeg`,
    color: "peri",
    icon: Flower2,
    topics: [
      "Understanding hormonal changes",
      "Managing hot flashes and night sweats",
      "Mood and sleep support",
      "Bone health and nutrition",
      "HRT options and alternatives",
      "Lifestyle adaptations",
    ],
  },
  {
    id: "wellness",
    title: "Long-term wellness",
    extraIcons: [UsersRound],
    description:
      "Bone health, heart health, cancer screening, and staying active. Resources for vitality and community support.",
    descriptionLong:
      "Staying strong and healthy over the long term. This programme focuses on bone health and osteoporosis prevention, heart health, cancer screening guidelines, staying active and energised, and community and peer support — for everyone.",
    image: `${IMG}/elderly.jpg`,
    color: "senior",
    icon: Sun,
    topics: [
      "Post-menopause health management",
      "Bone density and osteoporosis prevention",
      "Heart health awareness",
      "Cancer screening guidelines",
      "Staying active and energised",
      "Community and peer support",
    ],
  },
];

export function getStageById(id: string): ProgramStage | undefined {
  return programStages.find((s) => s.id === id);
}

export function getStageIds(): StageId[] {
  return programStages.map((s) => s.id);
}
