import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AgePathways } from "@/components/home/AgePathways";
import { AgeQuiz } from "@/components/home/AgeQuiz";
import { DidYouKnow } from "@/components/home/DidYouKnow";
import { EventsPreview } from "@/components/home/EventsPreview";
import { CTASection } from "@/components/home/CTASection";
import { useHomeSidebar } from "@/contexts/HomeSidebarContext";
import { HomeSidebarPanel } from "@/components/home/HomeSidebarPanel";

const Index = () => {
  const homeSidebar = useHomeSidebar();

  return (
    <Layout>
      <HeroSection />
      <TrustStrip />
      <AgePathways />
      <AgeQuiz />
      <DidYouKnow />
      <EventsPreview />
      <CTASection />

      {homeSidebar && <HomeSidebarPanel sidebar={homeSidebar} />}
    </Layout>
  );
};

export default Index;
