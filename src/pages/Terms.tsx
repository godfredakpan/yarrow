import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-journal max-w-3xl">
          <h1 className="section-heading mb-6">Terms of use</h1>
          <p className="section-lead mb-4">
            Terms of use for Yarrow will be published here. For any questions, please get in touch.
          </p>
          <Link to="/contact" className="text-primary font-medium hover:underline">
            Contact us
          </Link>
        </div>
      </section>
    </Layout>
  );
}
