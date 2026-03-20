import { useInView } from "@/hooks/useInView";

export function VisionSection() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section ref={sectionRef} className="section-padding bg-muted/50">
      <div className="container-journal max-w-3xl mx-auto text-center">
        <div
          className={`transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* <p className="section-eyebrow mb-3">Our vision</p> */}
          <h2 className="section-heading">
            {/* The future we&apos;re building toward */}
            The future we are trying to create
          </h2>
          <p className="section-lead">
            Yarrow envisions a future where every woman has the knowledge, confidence, and support to take control of her
            health. Through accessible education on contraception, reproductive health conditions, and common infections,
            we aim to empower women to make informed decisions and advocate for their well-being.
          </p>
        </div>
      </div>
    </section>
  );
}
