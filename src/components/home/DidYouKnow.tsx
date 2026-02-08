import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { images } from "@/lib/images";

const facts = [
  "1 in 10 women have endometriosis; diagnosis often takes 7–10 years.",
  "Regular movement can ease period cramps and improve mood.",
  "Perimenopause can start in your mid-30s and last several years.",
  "Bone density drops after menopause — calcium and vitamin D matter.",
];

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
            <p className="section-eyebrow mb-2">Evidence-based</p>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Did you know?</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Facts to help you understand your health.
            </p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all shrink-0"
          >
            All resources
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
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
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {facts.map((fact, i) => (
              <div
                key={i}
                className={`bg-background rounded-lg p-6 md:p-7 border border-border transition-all duration-300 hover:shadow-lg hover:shadow-foreground/[0.04] hover:border-primary/20 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={isInView ? { transitionDelay: `${i * 80}ms` } : undefined}
              >
                <div className="flex gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </span>
                  <p className="text-foreground leading-relaxed pt-1 font-medium text-[0.9375rem]">
                    {fact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
