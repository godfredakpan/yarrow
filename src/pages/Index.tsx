import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { VisionSection } from "@/components/home/VisionSection";
import { AgePathways } from "@/components/home/AgePathways";
import { AgeQuiz } from "@/components/home/AgeQuiz";
import { DidYouKnow } from "@/components/home/DidYouKnow";
import { ServingWithPurpose } from "@/components/home/ServingWithPurpose";
import { EventsPreview } from "@/components/home/EventsPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustStrip />
      <VisionSection />
      <AgePathways />
      <AgeQuiz />
      <DidYouKnow />
      <ServingWithPurpose />
      <EventsPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
