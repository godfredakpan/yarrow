import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { images } from "@/lib/images";

export function CTASection() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section
      ref={sectionRef}
      className="relative section-padding bg-primary text-primary-foreground overflow-hidden"
    >
      <div className="absolute inset-0 pattern-dots-subtle opacity-15 pointer-events-none" aria-hidden />
      <div className="container-journal relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-primary-foreground/80 mb-3">
            Free support
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] mb-4 text-primary-foreground leading-tight">
            Book a free consultation
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed max-w-lg">
            Talk to our team in confidence. Free, non-judgmental support — online or in person.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 h-12 px-8 font-semibold rounded-md"
          >
            <Link to="/contact" className="gap-2">
              Request a consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div
          className={`relative rounded-lg overflow-hidden border border-primary-foreground/20 shadow-xl transition-all duration-700 max-w-md ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={isInView ? { transitionDelay: "150ms" } : undefined}
        >
          <img
            src={images.consultation}
            alt="Sebastian Schuster on Unsplash"
            className="w-full h-full object-cover aspect-[4/3] max-h-[200px] sm:max-h-[240px]"
            width={600}
            height={450}
          />
        </div>
      </div>
    </section>
  );
}
