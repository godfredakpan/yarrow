/**
 * Site images. Replace with your own: add files to public/images/ and use
 * paths like "/images/hero-banner.jpg". These are placeholder URLs for development.
 */
const w = (path: string, width: number, height?: number) =>
  height ? `${path}/${width}/${height}` : `${path}?w=${width}`;

const PICSUM = "https://picsum.photos/seed";
export const images = {
  heroBanner: w(`${PICSUM}/herhealth-hero`, 1200, 700),
  pathwayTeen: w(`${PICSUM}/pathway-teen`, 600, 400),
  pathwayYoung: w(`${PICSUM}/pathway-young`, 600, 400),
  pathwayPeri: w(`${PICSUM}/pathway-peri`, 600, 400),
  pathwaySenior: w(`${PICSUM}/pathway-senior`, 600, 400),
  eventWorkshop: w(`${PICSUM}/event-workshop`, 600, 360),
  eventCommunity: w(`${PICSUM}/event-community`, 600, 360),
  eventSupport: w(`${PICSUM}/event-support`, 600, 360),
  facts: w(`${PICSUM}/facts`, 800, 450),
  cta: w(`${PICSUM}/cta-consult`, 800, 450),
  /** Page banners (full-bleed hero) */
  bannerAbout: w(`${PICSUM}/banner-about`, 1920, 720),
  bannerContact: "/images/consultation.jpeg",
  consultation: "/images/consultation.jpeg",
  bannerPrograms: w(`${PICSUM}/banner-programs`, 1920, 720),
  bannerEvents: w(`${PICSUM}/banner-events`, 1920, 720),
} as const;
