import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  getTopicBySlug,
  getPrevNextSlug,
  healthTopicSlugs,
} from "@/lib/healthTopics";

/** Simple render: paragraphs and **bold** */
function TopicContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-display prose-p:text-muted-foreground prose-p:leading-relaxed">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
          return (
            <h3 key={i} className="font-display font-semibold text-foreground mt-6 mb-2 text-lg">
              {trimmed.replace(/\*\*/g, "")}
            </h3>
          );
        }
        const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="mb-4">
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j} className="font-semibold text-foreground">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function Info() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return <Navigate to={`/info/${healthTopicSlugs[0]}`} replace />;
  }

  const topic = getTopicBySlug(slug);
  const { prev, next } = getPrevNextSlug(slug);

  if (!topic) {
    return <Navigate to={`/info/${healthTopicSlugs[0]}`} replace />;
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-journal max-w-3xl">
          <div className="flex items-center gap-2 text-primary mb-4">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Health information</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-6 text-foreground">
            {topic.title}
          </h1>

          <div className="flex gap-2 mb-10">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              disabled={!prev}
              onClick={() => prev && navigate(`/info/${prev}`)}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              disabled={!next}
              onClick={() => next && navigate(`/info/${next}`)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <TopicContent content={topic.content} />
        </div>
      </section>
    </Layout>
  );
}
