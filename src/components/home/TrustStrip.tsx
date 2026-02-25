import { Shield, MessageCircle, Heart } from "lucide-react";

const items = [
  {
    icon: Shield,
    label: "Trusted information",
    description: "Evidence-based resources you can rely on.",
  },
  {
    icon: MessageCircle,
    label: "Free consultations",
    description: "Confidential support — no judgement, just care.",
  },
  {
    icon: Heart,
    label: "Here for you",
    description: "Journey Guides and support for whatever matters to you.",
  },
];

export function TrustStrip() {
  return (
    <section className="py-10 md:py-12 border-b border-border bg-muted/50">
      <div className="container-journal">
        <div className="grid sm:grid-cols-3 gap-10 md:gap-12">
          {items.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground mb-1">{label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
