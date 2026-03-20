import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Heart, Users, Target, Award } from "lucide-react";
import { images } from "@/lib/images";

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We provide non-judgmental support and understanding at every step of your health journey.",
  },
  {
    icon: Users,
    title: "Inclusive Community",
    description: "Our services are designed to be culturally sensitive and accessible to all women.",
  },
  {
    icon: Target,
    title: "Evidence-Based",
    description: "All our information and guidance is backed by the latest medical research and best practices.",
  },
  {
    icon: Award,
    title: "Empowerment",
    description: "We believe in empowering women to make informed decisions about their health.",
  },
];

const About = () => {
  return (
    <Layout>
      <PageBanner
        eyebrow=""
        title="About us"
        description="Yarrow was created to address the gaps that continue to exist in women’s healthcare."
        image={images.bannerAbout}
      />

      {/* About Yarrow copy */}
      <section className="section-padding">
        <div className="container-journal max-w-3xl">
          {/* <h2 className="font-display mb-6">About Yarrow</h2> */}
          {/* <p className="text-lg text-muted-foreground mb-4">
            Yarrow was created to address the gaps that continue to exist in women’s healthcare.
          </p> */}
          <p className="section-lead mb-4">
            Too often, women are left with unanswered questions about their bodies. They struggle to find clear,
            reliable information on topics like birth control, irregular periods, urinary tract infections, yeast
            infections, PCOS, endometriosis, hormonal imbalances, and more. Many feel dismissed, unheard, or unsure
            where to turn for trustworthy guidance.
          </p>
          {/* <p className="text-lg text-muted-foreground mb-4">Yarrow bridges that gap.</p>
          <p className="text-lg text-muted-foreground mb-4">
            Yarrow gives women access to meaningful, evidence-based information about their health. It creates a safe
            space to ask questions, learn about their bodies, and better understand symptoms or concerns they may be
            experiencing.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            In addition to education, Yarrow provides access to virtual care through telehealth services, making
            professional support more accessible and convenient. Whether a woman needs guidance, clarification, or next
            steps, Yarrow connects her to the care she deserves.
          </p> */}
          <h2 className="section-lead font-semibold text-foreground mb-3">Our mission is simple:</h2>
          <ul className="list-disc pl-6 space-y-1 section-lead mb-4">
            <li>Empower women with knowledge</li>
            <li>Provide access to trusted care</li>
            <li>Close the gaps in women’s healthcare—one informed decision at a time</li>
          </ul>
          {/* vision statement moved to homepage */}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/50">
        <div className="container-journal">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-heading">Our values</h2>
            <p className="section-lead">
              These core principles guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-background rounded-lg p-6 border border-border text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="section-card-title mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
