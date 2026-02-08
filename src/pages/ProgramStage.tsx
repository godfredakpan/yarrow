import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getStageById } from "@/lib/programStages";
import NotFound from "./NotFound";

const ProgramStagePage = () => {
  const { stageId } = useParams<{ stageId: string }>();
  const stage = stageId ? getStageById(stageId) : undefined;

  if (!stage) {
    return <NotFound />;
  }

  const Icon = stage.icon;

  return (
    <Layout>
      {/* Banner with image */}
      <section className="relative w-full aspect-[21/9] min-h-[240px] md:min-h-[320px] overflow-hidden bg-muted">
        <img
          src={stage.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={1400}
          height={600}
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-journal pb-8 md:pb-12">
            <div className="flex items-center gap-4 mb-2">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center bg-background/90 ${
                  stage.color === "teen"
                    ? "text-teen"
                    : stage.color === "young"
                      ? "text-young"
                      : stage.color === "peri"
                        ? "text-peri"
                        : "text-senior"
                }`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl text-primary-foreground drop-shadow-sm">
                  {stage.title}
                </h1>
                <p className="text-primary-foreground/90 text-lg">{stage.age}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-journal max-w-4xl">
          <p className="text-xl text-muted-foreground leading-relaxed mb-10">
            {stage.descriptionLong}
          </p>

          <div className="bg-card rounded-lg p-8 border border-border mb-10">
            <h2 className="font-display text-xl mb-6">Topics we cover</h2>
            <ul className="space-y-3">
              {stage.topics.map((topic) => (
                <li key={topic} className="flex items-start gap-3">
                  <CheckCircle2
                    className={`h-5 w-5 mt-0.5 shrink-0 ${
                      stage.color === "teen"
                        ? "text-teen"
                        : stage.color === "young"
                          ? "text-young"
                          : stage.color === "peri"
                            ? "text-peri"
                            : "text-senior"
                    }`}
                  />
                  <span className="text-muted-foreground">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link to="/contact">
                Book free consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link to="/programs">View all programmes</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProgramStagePage;
