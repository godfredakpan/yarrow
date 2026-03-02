import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getTopicBySlug,
  getPrevNextSlug,
  healthTopicSlugs,
  healthTopics,
} from "@/lib/healthTopics";

/** Render a block that may contain inline **bold** */
function renderInlineBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={j} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={j}>{part}</span>
    )
  );
}

/** Simple render: paragraphs, **bold**, and • bullet lists */
function TopicContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-display prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:my-4 prose-li:text-muted-foreground prose-li:leading-relaxed">
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
        const lines = trimmed.split("\n");
        const bulletStart = lines.findIndex((line) => /^\s*•\s+/.test(line));
        if (bulletStart >= 0) {
          const introLines = lines.slice(0, bulletStart).filter((l) => l.trim());
          const intro = introLines.join(" ").trim();
          const listItems = lines.slice(bulletStart).filter((line) => /^\s*•\s+/.test(line));
          return (
            <div key={i} className="mb-4">
              {intro ? <p className="mb-2">{renderInlineBold(intro)}</p> : null}
              <ul className="list-disc pl-6 space-y-1">
                {listItems.map((line, j) => (
                  <li key={j}>{renderInlineBold(line.replace(/^\s*•\s*/, "").trim())}</li>
                ))}
              </ul>
            </div>
          );
        }
        return (
          <p key={i} className="mb-4">
            {renderInlineBold(trimmed)}
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

          <div className="flex flex-wrap items-center gap-2 mb-10">
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
            <span className="text-sm text-muted-foreground mr-1 hidden sm:inline">Other topics:</span>
            <Select
              value={slug}
              onValueChange={(value) => value && navigate(`/info/${value}`)}
            >
              <SelectTrigger className="w-[220px] sm:w-[260px] h-9 border-input bg-background" aria-label="Jump to another topic">
                <SelectValue placeholder="Other topics…" />
              </SelectTrigger>
              <SelectContent>
                {healthTopics.map((t) => (
                  <SelectItem key={t.slug} value={t.slug}>
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TopicContent content={topic.content} />
        </div>
      </section>
    </Layout>
  );
}
