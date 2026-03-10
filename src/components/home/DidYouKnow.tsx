import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { images } from "@/lib/images";
import { didYouKnowFacts } from "@/lib/didYouKnow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function DidYouKnow() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section ref={sectionRef} className="section-padding bg-muted/50">
      <div className="container-journal">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <p className="section-eyebrow mb-2">Learn something new</p>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Did you know?</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Bite-sized facts to help you understand your health — swipe through and get curious.
            </p>
          </div>
          {/* <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all shrink-0"
          >
            Explore all resources
            <ArrowRight className="h-4 w-4" />
          </Link> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start lg:items-stretch">
          <div
            className={`hidden lg:block relative rounded-lg overflow-hidden border border-border shadow-lg shadow-foreground/[0.04] transition-all duration-600 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={isInView ? { transitionDelay: "100ms" } : undefined}
          >
            <img
              src={images.facts}
              alt=""
              className="w-full h-full object-cover aspect-[4/3]"
              width={800}
              height={600}
            />
          </div>
          <div className="lg:col-span-2 relative flex min-w-0 w-full flex-col overflow-hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                containScroll: "trimSnaps",
              }}
              className="flex w-full max-w-full flex-col px-0 sm:px-2"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {didYouKnowFacts.map((fact, i) => (
                  <CarouselItem key={i} className="basis-full sm:basis-full md:basis-1/2 h-full pl-2 sm:pl-4">
                    <div
                      className={`bg-background rounded-lg p-4 sm:p-6 md:p-7 border border-border transition-all duration-300 hover:shadow-lg hover:shadow-foreground/[0.04] hover:border-primary/20 h-full min-h-[160px] sm:min-h-[180px] flex ${
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                      style={isInView ? { transitionDelay: `${i * 80}ms` } : undefined}
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <span className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </span>
                        <p className="text-foreground leading-relaxed sm:pt-1 font-medium text-sm sm:text-[0.9375rem]">
                          {fact}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-3 flex justify-center gap-2">
                <CarouselPrevious className="relative left-0 right-0 top-0 translate-y-0 bg-background border shadow-sm" />
                <CarouselNext className="relative left-0 right-0 top-0 translate-y-0 bg-background border shadow-sm" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
