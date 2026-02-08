/**
 * Life stage programmes – shared by homepage AgePathways and individual programme pages.
 * Images are in public/images/.
 */
import type { LucideIcon } from "lucide-react";
import { GraduationCap, Heart, Flower2, Sun, Droplets, Users, Sparkles, ThermometerSun, Brain, Stethoscope, UsersRound } from "lucide-react";

export type StageId = "teen" | "young" | "peri" | "senior";

export interface ProgramStage {
  id: StageId;
  title: string;
  age: string;
  description: string;
  /** Full description for the individual page */
  descriptionLong: string;
  /** Image path under public/ (e.g. /images/teenimages.jpeg) */
  image: string;
  color: "teen" | "young" | "peri" | "senior";
  icon: LucideIcon;
  /** Optional small icons for homepage cards */
  extraIcons?: LucideIcon[];
  topics: string[];
}

const IMG = "/images";

export const programStages: ProgramStage[] = [
  {
    id: "teen",
    title: "Teen Girls",
    age: "16–19",
    extraIcons: [Droplets, Users, Sparkles],
    description:
      "Getting to know your body is the first step in your health journey. Explore contraception options, learn about puberty, and find tips to stay healthy and confident.",
    descriptionLong:
      "Getting to know your body is the first step in your health journey. Our teen programme provides age-appropriate education and support so you can make informed choices.",
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
    id: "young",
    title: "Young Women",
    age: "20–35",
    description:
      "Thinking about starting a family or managing conditions like PCOS? Discover effective options, fertility info, and how to team up with our health care provider.",
    descriptionLong:
      "Thinking about starting a family or managing health conditions? Our young women's programme offers comprehensive support for this dynamic life stage.",
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
    id: "peri",
    title: "Perimenopausal Women",
    age: "40–50",
    extraIcons: [ThermometerSun, Brain, Stethoscope],
    description:
      "Transitioning through hormonal changes? Find tips on managing hot flashes, mood swings, and maintaining energy levels with lifestyle and medical guidance.",
    descriptionLong:
      "Transitioning through hormonal changes can be challenging. Our perimenopause programme provides guidance and community support to help you thrive.",
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
    id: "senior",
    title: "Women 50+",
    age: "50+",
    extraIcons: [UsersRound],
    description:
      "Staying strong and healthy after menopause. Learn about bone health, screenings, and ways to stay energized and active.",
    descriptionLong:
      "Staying strong and healthy after menopause. Our 50+ programme focuses on maintaining vitality and enjoying this new chapter of life.",
    image: `${IMG}/elderly.jpg`,
    color: "senior",
    icon: Sun,
    topics: [
      "Post-menopause health management",
      "Bone density and osteoporosis prevention",
      "Heart health awareness",
      "Cancer screening guidelines",
      "Staying active and energized",
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
