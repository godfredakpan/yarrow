import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex flex-col justify-end md:min-h-[75vh]">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={images.heroBanner}
          alt="Five women smiling together, celebrating community and wellbeing. Photo by Kaeme on Unsplash."
          title="Photo by Kaeme on Unsplash"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        {/* Light overlay so the image stays bright and engaging */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-foreground/35 via-foreground/20 to-foreground/30"
          aria-hidden
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-8 md:pb-12 md:pt-10 lg:pb-14 lg:pt-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-8">
          {/* Title and subtitle */}
          <div className="max-w-2xl animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
            {/* <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-primary-foreground leading-[1.1] tracking-tight text-balance mb-4 [animation-delay:100ms] drop-shadow-sm">
              Yarrow
            </h1> */}
            <p className="text-lg text-primary-foreground/95 leading-relaxed [animation-delay:150ms] drop-shadow-sm">
              Free support, and a community that gets it. See what we offer — and take the first step.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base border-0 shadow-lg gap-2 [animation-delay:200ms]"
            >
              <Link to="/programs" className="gap-2">
                Health Hub
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
