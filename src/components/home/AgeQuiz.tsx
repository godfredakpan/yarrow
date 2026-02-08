import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, Flower2, Sun, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type PathwayId = "teen" | "young" | "peri" | "senior";

const pathways: {
  id: PathwayId;
  label: string;
  path: string;
  icon: typeof GraduationCap;
  color: string;
  bgClass: string;
  borderClass: string;
  emoji: string;
}[] = [
  {
    id: "teen",
    label: "Teen Girls (16–19)",
    path: "/programs/teen",
    icon: GraduationCap,
    color: "text-teen",
    bgClass: "bg-teen/10",
    borderClass: "border-teen/40 hover:border-teen",
    emoji: "🌸",
  },
  {
    id: "young",
    label: "Young Women (20–35)",
    path: "/programs/young",
    icon: Heart,
    color: "text-young",
    bgClass: "bg-young/10",
    borderClass: "border-young/40 hover:border-young",
    emoji: "💫",
  },
  {
    id: "peri",
    label: "Perimenopausal Women (40–50)",
    path: "/programs/peri",
    icon: Flower2,
    color: "text-peri",
    bgClass: "bg-peri/10",
    borderClass: "border-peri/40 hover:border-peri",
    emoji: "🌺",
  },
  {
    id: "senior",
    label: "Women 50+",
    path: "/programs/senior",
    icon: Sun,
    color: "text-senior",
    bgClass: "bg-senior/10",
    borderClass: "border-senior/40 hover:border-senior",
    emoji: "☀️",
  },
];

const questions: { id: string; question: string; options: { label: string; pathway: PathwayId }[] }[] = [
  {
    id: "age",
    question: "What's your age range?",
    options: [
      { label: "16–19", pathway: "teen" },
      { label: "20–35", pathway: "young" },
      { label: "40–50", pathway: "peri" },
      { label: "50+", pathway: "senior" },
    ],
  },
  {
    id: "concern",
    question: "What brings you here today?",
    options: [
      { label: "Puberty, periods, or contraception", pathway: "teen" },
      { label: "Family planning, fertility, or PCOS", pathway: "young" },
      { label: "Hot flashes, mood, or perimenopause", pathway: "peri" },
      { label: "Bone health, screenings, or staying active", pathway: "senior" },
    ],
  },
];

export function AgeQuiz() {
  const [step, setStep] = useState(-1); // -1 = intro, 0+ = question index
  const [result, setResult] = useState<PathwayId | null>(null);
  const { ref: sectionRef, isInView } = useInView();

  const isIntro = step === -1;
  const q = step >= 0 && step < questions.length ? questions[step] : null;
  const isLast = q !== null && step === questions.length - 1;
  const totalSteps = questions.length;

  const handleStart = () => setStep(0);
  const handleChoose = (pathway: PathwayId) => {
    if (isLast) {
      setResult(pathway);
    } else {
      setStep(step + 1);
    }
  };
  const handleBack = () => (step > 0 ? setStep(step - 1) : setStep(-1));
  const handleReset = () => {
    setStep(-1);
    setResult(null);
  };

  // —— Result screen ——
  if (result) {
    const pathway = pathways.find((p) => p.id === result);
    if (!pathway) return null;
    const Icon = pathway.icon;
    return (
      <section ref={sectionRef} className="section-padding bg-gradient-to-b from-muted/50 to-background">
        <div className="container-journal">
          <div
            className={`max-w-xl mx-auto transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-center mb-8">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-3xl mb-4">
                {pathway.emoji}
              </span>
              <h2 className="font-display text-2xl md:text-3xl mb-2">Here’s your match!</h2>
              <p className="text-muted-foreground">
                We’ve picked a programme that fits where you are right now.
              </p>
            </div>
            <div
              className={`rounded-2xl border-2 ${pathway.borderClass} ${pathway.bgClass} p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div
                  className={`w-20 h-20 rounded-2xl ${pathway.bgClass} border-2 ${pathway.borderClass} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-10 h-10 ${pathway.color}`} />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="font-display font-semibold text-xl md:text-2xl mb-1">{pathway.label}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Tap below to see resources and support just for you.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    <Button asChild size="lg" className="gap-2 rounded-xl shadow-md">
                      <Link to={pathway.path}>
                        See my programme
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 rounded-xl"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-4 w-4" />
                      Try again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // —— Intro screen ——
  if (isIntro) {
    return (
      <section ref={sectionRef} className="section-padding bg-gradient-to-b from-muted/50 to-background">
        <div className="container-journal">
          <div
            className={`max-w-lg mx-auto text-center transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="section-eyebrow mb-3">Quick start</p>
            <h2 className="font-display text-2xl md:text-3xl mb-3 font-semibold">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Answer two quick questions and we’ll point you to the right resources for your stage of life.
            </p>
            <Button
              size="lg"
              onClick={handleStart}
              className="gap-2 rounded-xl h-12 px-8 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="h-5 w-5" />
              Start the quiz
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // —— Question screen ——
  if (!q) return null;

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-muted/50 to-background">
      <div className="container-journal">
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
              <span>Question {step + 1} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
            <h3 className="font-display font-semibold text-xl md:text-2xl mb-6 text-foreground">
              {q.question}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {q.options.map((opt) => {
                const path = pathways.find((p) => p.id === opt.pathway)!;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleChoose(opt.pathway)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.99] ${path.borderClass} ${path.bgClass}`}
                  >
                    <span className="text-2xl shrink-0">{path.emoji}</span>
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleBack}
              className="mt-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
