/**
 * Events data – shared by Events list, EventsPreview, and EventDetail page.
 * Replace with API (getPublicEvents, getPublicEvent) when using the backend.
 */
import { images } from "@/lib/images";

export interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  spotsLeft: number | null;
  image: string;
}

export const events: EventItem[] = [
  {
    id: 1,
    title: "Understanding PCOS: A Comprehensive Workshop",
    description:
      "Join our medical experts for an in-depth look at polycystic ovary syndrome, its symptoms, diagnosis, and management options.",
    date: "March 15, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Online (Zoom)",
    category: "Workshop",
    spotsLeft: 25,
    image: images.eventWorkshop,
  },
  {
    id: 2,
    title: "Menstrual Health Awareness Day",
    description:
      "A community event focused on breaking stigma around menstruation and providing education on menstrual health and hygiene.",
    date: "March 28, 2026",
    time: "10:00 AM - 5:00 PM",
    location: "Community Health Center",
    category: "Community Event",
    spotsLeft: null,
    image: images.eventCommunity,
  },
  {
    id: 3,
    title: "Perimenopause Support Group",
    description:
      "A safe space for women navigating perimenopause to share experiences, ask questions, and receive guidance from our counselors.",
    date: "April 5, 2026",
    time: "6:00 PM - 7:30 PM",
    location: "Online (Zoom)",
    category: "Support Group",
    spotsLeft: 15,
    image: images.eventSupport,
  },
  {
    id: 4,
    title: "Teen Health Workshop for Parents",
    description:
      "Helping parents understand adolescent health changes and how to support their daughters through puberty.",
    date: "April 12, 2026",
    time: "3:00 PM - 5:00 PM",
    location: "Online (Zoom)",
    category: "Workshop",
    spotsLeft: 30,
    image: images.eventWorkshop,
  },
  // {
  //   id: 5,
  //   title: "Fertility Awareness Method Training",
  //   description:
  //     "Learn about natural family planning methods and how to track your fertility signs effectively.",
  //   date: "April 20, 2026",
  //   time: "10:00 AM - 12:00 PM",
  //   location: "Health Education Center",
  //   category: "Training",
  //   spotsLeft: 20,
  //   image: images.eventCommunity,
  // },
  {
    id: 6,
    title: "Yoga for Women's Wellness",
    description:
      "A gentle yoga session designed specifically for women, focusing on poses that support hormonal balance and stress relief.",
    date: "April 25, 2026",
    time: "9:00 AM - 10:30 AM",
    location: "Community Park Pavilion",
    category: "Wellness",
    spotsLeft: 40,
    image: images.eventSupport,
  },
];

export function getEventById(id: number | string): EventItem | undefined {
  const numId = typeof id === "string" ? parseInt(id, 10) : id;
  if (Number.isNaN(numId)) return undefined;
  return events.find((e) => e.id === numId);
}
