import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight } from "lucide-react";
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

/** Normalize asterisk-like chars to ASCII * so **bold** is reliable (handles copy-paste Unicode) */
function normalizeAsterisks(s: string): string {
  return s
    .replace(/\u2217/g, "*")  // ∗ (Unicode asterisk operator)
    .replace(/\uFF0A/g, "*"); // ＊ (fullwidth asterisk)
}

/** Render text with **bold** converted to <strong> (no raw asterisks shown) */
function renderInlineBold(text: string) {
  const normalized = normalizeAsterisks(text);
  const parts = normalized.split("**");
  const segments: ({ type: "text"; value: string } | { type: "bold"; value: string })[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (parts[i].length > 0) segments.push({ type: "text", value: parts[i] });
    } else {
      segments.push({ type: "bold", value: parts[i] });
    }
  }
  if (segments.length === 0 && text.length > 0) {
    segments.push({ type: "text", value: normalized });
  }
  return segments.map((seg, j) =>
    seg.type === "bold" ? (
      <strong key={j} className="font-semibold text-foreground">
        {seg.value}
      </strong>
    ) : (
      <span key={j}>{seg.value}</span>
    )
  );
}

type BulletTreeItem = { text: string; children: string[] };

/** Top-level `• ` lines; following `  • ` lines nest under the previous top-level item */
function parseBulletTree(listLines: string[]): BulletTreeItem[] {
  const items: BulletTreeItem[] = [];
  let i = 0;
  while (i < listLines.length) {
    const line = listLines[i];
    if (/^•\s+/.test(line)) {
      const text = line.replace(/^•\s+/, "").trim();
      const children: string[] = [];
      i++;
      while (i < listLines.length && /^  •\s+/.test(listLines[i])) {
        children.push(listLines[i].replace(/^  •\s+/, "").trim());
        i++;
      }
      items.push({ text, children });
    } else {
      i++;
    }
  }
  return items;
}

/** Simple render: paragraphs, **bold**, and • bullet lists (optional `  • ` sub-lists) */
function TopicContent({ content }: { content: string }) {
  const normalizedContent = normalizeAsterisks(content);
  const blocks = normalizedContent.trim().split(/\n\n+/);
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-display prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:my-4 prose-li:text-muted-foreground prose-li:leading-relaxed">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
          return (
            <h3 key={i} className="section-card-title mt-6 mb-2">
              {trimmed.replace(/\*\*/g, "")}
            </h3>
          );
        }
        const lines = trimmed.split("\n");
        const bulletStart = lines.findIndex((line) => /^•\s+/.test(line));
        if (bulletStart >= 0) {
          const introLines = lines.slice(0, bulletStart).filter((l) => l.trim());
          const intro = introLines.join(" ").trim();
          const tree = parseBulletTree(lines.slice(bulletStart));
          return (
            <div key={i} className="mb-4">
              {intro ? <p className="mb-2">{renderInlineBold(intro)}</p> : null}
              <ul className="list-disc pl-6 space-y-1">
                {tree.map((item, j) => (
                  <li key={j}>
                    {renderInlineBold(item.text)}
                    {item.children.length > 0 ? (
                      <ul className="list-disc pl-5 mt-1.5 mb-0 space-y-1">
                        {item.children.map((child, k) => (
                          <li key={k}>{renderInlineBold(child)}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
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

/** Index page: list all health topics so users can choose one */
function InfoIndex() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-journal">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 shrink-0 text-primary" />
              <span className="section-eyebrow !mb-0">Health information</span>
            </div>
            <h1 className="section-heading">
              Browse health topics
            </h1>
            <p className="section-lead">
              Evidence-based articles on periods, reproductive health, contraception, and more. Pick a topic to read in full.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthTopics.map((t) => (
              <Link
                key={t.slug}
                to={`/info/${t.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/[0.04]"
              >
                <h2 className="section-card-title mb-2 group-hover:text-primary transition-colors">
                  {t.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {renderInlineBold(t.summary)}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default function Info() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return <InfoIndex />;
  }

  const topic = getTopicBySlug(slug);
  const { prev, next } = getPrevNextSlug(slug);

  if (!topic) {
    return <Navigate to="/info" replace />;
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-journal max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 shrink-0 text-primary" />
            <Link
              to="/info"
              className="section-eyebrow !mb-0 hover:underline inline-block text-primary"
            >
              Health information
            </Link>
          </div>
          <h1 className="section-heading mb-6">
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
