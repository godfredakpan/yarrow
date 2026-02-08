import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";

const metrics = [
  { value: "4", label: "Life stage programmes" },
  { value: "Free", label: "Consultations" },
  { value: "Evidence-based", label: "Resources" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex flex-col justify-end md:min-h-[75vh]">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={'/images/smiling-black-women.jpeg'}
          alt="Photo by RICKEY HUTCHINSON on Unsplash"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
      
        {/* Gradient overlay: darker on right so metrics block sits well, lighter on left for title */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/50 to-foreground/70"
          aria-hidden
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-8 md:pb-12 md:pt-10 lg:pb-14 lg:pt-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-8">
          {/* Left: title and subtitle */}
          <div className="max-w-2xl animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
            <p className="text-primary-foreground/90 text-sm font-medium tracking-[0.2em] uppercase mb-3 [animation-delay:75ms]">
              Women&apos;s health at every stage
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-primary-foreground leading-[1.1] tracking-tight text-balance mb-4 [animation-delay:100ms]">
              Yarrow
            </h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed [animation-delay:150ms]">
              Your health, your journey - trusted information at every age.
            </p>
          </div>

          {/* Right: metrics block + CTA (Frontiers-style) */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 animate-fade-in-up opacity-0 [animation-fill-mode:forwards] [animation-delay:200ms] w-full sm:w-auto sm:flex-shrink-0">
            {/* Dark semi-transparent metrics box – 3 vertical segments */}
            <div className="flex flex-col bg-foreground/85 backdrop-blur-sm border border-primary-foreground/10 rounded-t-lg sm:rounded-l-lg sm:rounded-r-none overflow-hidden min-w-0 sm:min-w-[200px]">
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="px-5 py-4 sm:py-5 border-b border-primary-foreground/10 last:border-b-0"
                >
                  <p className="text-2xl sm:text-[1.75rem] font-bold text-primary-foreground leading-tight">
                    {value}
                  </p>
                  <p className="text-xs font-medium text-primary-foreground/80 uppercase tracking-wider mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            {/* CTA button – spans full height on desktop */}
            <Button
              asChild
              size="lg"
              className="rounded-b-lg sm:rounded-r-lg sm:rounded-l-none h-14 sm:h-auto sm:py-6 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base border-0 shadow-lg flex items-center justify-center"
            >
              <Link to="/contact" className="gap-2">
                Book consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
