import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { search, normalize, type SearchItem } from "@/lib/searchIndex";
import * as api from "@/lib/api";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(qParam);

  const { data: events = [] } = useQuery({
    queryKey: ["womenhealth", "public", "events"],
    queryFn: () => api.getPublicEvents(),
  });

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const results = useMemo(() => {
    const fromIndex = search(qParam);
    if (!qParam.trim()) return fromIndex;

    const q = normalize(qParam).trim();
    const terms = q.split(/\s+/).filter(Boolean);
    if (terms.length === 0) return fromIndex;

    const eventResults: SearchItem[] = events
      .filter((event) => {
        const titleNorm = normalize(event.title);
        const descNorm = normalize(event.description || "");
        const categoryNorm = normalize(event.category || "");
        const searchable = `${titleNorm} ${descNorm} ${categoryNorm}`;
        return terms.some((term) => searchable.includes(term));
      })
      .map((event) => ({
        title: event.title,
        path: `/events/${event.id}`,
        snippet: event.description?.slice(0, 120) || event.category || "Event",
        category: "Event" as const,
      }));

    return [...fromIndex, ...eventResults];
  }, [qParam, events]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    }
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h1 className="section-heading mb-6">Search</h1>

          {/* Prominent search box */}
          <form onSubmit={handleSubmit} className="mb-10">
            <label htmlFor="search-page-input" className="sr-only">
              Search journey guides, events, and topics
            </label>
            <div className="relative flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="search-page-input"
                  type="search"
                  placeholder="Journey Guides, events, topics…"
                  className="w-full pl-12 h-14 text-base rounded-xl border-border bg-card focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 font-semibold shrink-0"
              >
                Search
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Search across programmes, events, and health topics.
            </p>
          </form>

          {qParam ? (
            <p className="text-muted-foreground mb-6">
              {results.length > 0 ? (
                <span>{results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{qParam}&rdquo;</span>
              ) : (
                <span>No results for &ldquo;{qParam}&rdquo;</span>
              )}
            </p>
          ) : (
            <p className="text-muted-foreground mb-8">
              Enter a term above to search pages and programmes.
            </p>
          )}

          {qParam && results.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground mb-2">No results found</p>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Try different words, e.g. programmes, events, consultation, PCOS, menopause, teen, perimenopause.
              </p>
            </div>
          )}

          {qParam && results.length > 0 && (
            <ul className="space-y-3">
              {results.map((item, i) => (
                <li key={`${item.path}-${item.title}-${i}`}>
                  <Link
                    to={item.path}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:bg-card/80 hover:shadow-md"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="section-eyebrow !mb-0 block">{item.category}</span>
                      <h2 className="section-card-title mt-1.5">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {item.snippet}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
