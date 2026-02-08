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
        eyebrow="About us"
        title="About us"
        description="We are dedicated to providing trusted, accessible women's health information and support to women at every stage of life."
        image={images.bannerAbout}
      />

      {/* Mission */}
      <section className="section-padding">
        <div className="container-journal">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display mb-6">Our mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our mission is to empower women with knowledge, resources, and 
                support to take control of their health. We believe that every 
                woman deserves access to accurate health information, regardless 
                of her background or circumstances.
              </p>
              <p className="text-lg text-muted-foreground">
                Through education, free consultations, and community programs, 
                we aim to break down barriers to healthcare access and create a 
                supportive environment where women can openly discuss their health concerns.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold mb-4">What We Do</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <span>Provide free health consultations online and in-person</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <span>Host educational workshops and community events</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <span>Create age-appropriate health resources and guides</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <span>Connect women with healthcare professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <span>Advocate for better women's healthcare policies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/50">
        <div className="container-journal">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display mb-4">Our values</h2>
            <p className="text-muted-foreground text-lg">
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
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
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
