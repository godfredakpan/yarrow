import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { programStages } from "@/lib/programStages";
import { images } from "@/lib/images";

const Programs = () => {
  return (
    <Layout>
      <PageBanner
        eyebrow="Sections"
        title="Journey Guides"
        description="Start your care path — Pick a topic, explore resources, and take the next step. All free, evidence-based, and here for you."
        image={images.bannerPrograms}
      />

      {/* Programme cards – link to individual pages */}
      <section className="section-padding">
        <div className="container-journal">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <Link
                  key={stage.id}
                  to={`/programs/${stage.id}`}
                  className="group bg-card rounded-lg overflow-hidden border border-border text-center transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={stage.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className={`w-14 h-14 rounded-lg mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-105 ${
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
                        className={`w-7 h-7 ${
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
                    <h2 className="section-card-title mb-1">{stage.title}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {stage.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all justify-center">
                      View programme
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/50">
        <div className="container-narrow text-center">
          <h2 className="section-heading">Not sure which programme to choose?</h2>
          <p className="section-lead mb-8">
            Get in touch and we’ll point you to the right resources — or just explore and see what fits.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
