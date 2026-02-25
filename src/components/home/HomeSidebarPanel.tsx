import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { healthTopics, getTopicBySlug } from "@/lib/healthTopics";
import type { HomeSidebarContextValue } from "@/contexts/HomeSidebarContext";

type Props = {
  sidebar: HomeSidebarContextValue;
};

/** List view: health topics with arrow; tapping opens detail in-sidebar. */
function SidebarList({ sidebar }: { sidebar: HomeSidebarContextValue }) {
  return (
    <>
      <SheetHeader className="text-left shrink-0 bg-primary/5 border-b border-border px-6 py-5 -mx-0 rounded-t-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <SheetTitle className="font-display text-lg text-foreground mb-0">Health topics</SheetTitle>
        </div>
        <SheetDescription className="text-sm text-muted-foreground leading-relaxed">
          Choose a topic to see a short overview, then read more on the full page.
        </SheetDescription>
      </SheetHeader>
      <nav className="flex flex-col gap-2 pt-5 px-6 pb-6 overflow-y-auto min-h-0" aria-label="Health topics">
        {healthTopics.map((t) => (
          <button
            type="button"
            key={t.slug}
            onClick={() => sidebar.openTopic(t.slug)}
            className="group flex items-center justify-between w-full rounded-xl border border-border bg-card px-4 py-3.5 text-left shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring gap-3"
          >
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {t.title}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/80 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
              <ChevronRight className="h-4 w-4" aria-hidden />
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}

/** Detail view: back button top left, summary, Read more button. */
function SidebarDetail({ sidebar }: { sidebar: HomeSidebarContextValue }) {
  const slug = sidebar.selectedSlug;
  if (!slug) return null;
  const topic = getTopicBySlug(slug);
  if (!topic) return null;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-3 shrink-0 border-b border-border bg-muted/30 px-6 py-4 -mx-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-lg hover:bg-background -ml-1"
          onClick={sidebar.goBack}
          aria-label="Back to topics"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm font-medium text-muted-foreground truncate">Health topics</span>
      </div>
      <div className="pt-6 px-6 pb-6 flex flex-col min-h-0 overflow-y-auto">
        <h2 className="font-display font-semibold text-xl text-foreground mb-4 pr-2">{topic.title}</h2>
        <div className="rounded-xl border border-border bg-muted/20 p-4 mb-6">
          {topic.summary
            .split(/(?<=[.!?])\s+/)
            .filter((part) => part.trim().length > 0)
            .map((part, idx) => (
              <p key={idx} className="text-sm text-muted-foreground leading-relaxed mb-1 last:mb-0">
                {part.trim()}
              </p>
            ))}
        </div>
        <Button asChild className="w-full mt-auto shrink-0 h-11 rounded-xl font-medium gap-2 shadow-sm">
          <Link to={`/info/${slug}`} onClick={sidebar.close}>
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function HomeSidebarPanel({ sidebar }: Props) {
  const isDetail = sidebar.selectedSlug != null;

  return (
    <Sheet open={sidebar.isOpen} onOpenChange={(open) => !open && sidebar.close()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm flex flex-col p-0 gap-0 bg-background border-l border-border"
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {isDetail ? <SidebarDetail sidebar={sidebar} /> : <SidebarList sidebar={sidebar} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
