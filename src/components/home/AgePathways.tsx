import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { programStages } from "@/lib/programStages";

export function AgePathways() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container-journal">
        <div
          className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-eyebrow mb-3">What we offer</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] mb-4 leading-tight">
            Journey Guides that meet you where you are
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Pick a topic that interests you — evidence-based, no age limits. Dive in and see what fits.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Link
                key={stage.id}
                to={`/programs/${stage.id}`}
                className={`group bg-card rounded-lg overflow-hidden border border-border text-center transition-all duration-300 hover:shadow-lg hover:border-primary/30 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={isInView ? { transitionDelay: `${index * 80}ms` } : undefined}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={stage.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={600}
                    height={450}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div
                    className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                      stage.color === "teen"
                        ? "bg-teen/10"
                        : stage.color === "young"
                          ? "bg-young/10"
                          : stage.color === "peri"
                            ? "bg-peri/10"
                            : "bg-senior/10"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        stage.color === "teen"
                          ? "text-teen"
                          : stage.color === "young"
                            ? "text-young"
                            : stage.color === "peri"
                              ? "text-peri"
                              : "text-senior"
                      }`}
                    />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-1">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {stage.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
