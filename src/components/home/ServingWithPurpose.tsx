import { useInView } from "@/hooks/useInView";

export function ServingWithPurpose() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-primary/[0.022] via-background to-background border-y border-border/40"
    >
      <div className="container-journal max-w-3xl mx-auto text-center">
        <div
          className={`transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="section-heading">
            Serving with Purpose
          </h2>
          <p className="section-lead mb-4">
            Giving back to the community is an important part of Yarrow&apos;s values and mission. We believe that true
            success comes from making a positive impact on the people and communities around us.
          </p>
          <p className="section-lead">
            Yarrow gives back through college scholarship funds, charitable donations to orphanages around Nigeria, and
            partnerships with local groups and nonprofits. These efforts allow us to support important causes such as
            education, health, and community development. Through these actions, we remain committed to helping create a
            stronger and more supportive community for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
