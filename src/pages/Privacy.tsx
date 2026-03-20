import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-journal max-w-3xl">
          <h1 className="section-heading mb-6">Privacy</h1>
          <p className="section-lead mb-4">
            We respect your privacy. This page will be updated with our full privacy policy. For any questions about how we handle your data, please contact us.
          </p>
          <Link to="/contact" className="text-primary font-medium hover:underline">
            Contact us
          </Link>
        </div>
      </section>
    </Layout>
  );
}
