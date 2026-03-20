import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, BookOpen } from "lucide-react";
import { useHomeSidebar } from "@/contexts/HomeSidebarContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks: { name: string; path: string }[] = [
  // { name: "Home", path: "/" },
  // { name: "About", path: "/about" },
  // { name: "Journey Guides", path: "/programs" },
  // { name: "Events", path: "/events" },
  // { name: "Info", path: "/info/what-is-a-period" },
  // { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const homeSidebar = useHomeSidebar();
  // const location = useLocation();
  // const isHome = location.pathname === "/";
  // const isActive = (path: string) =>
  //   location.pathname === path || (path.startsWith("/info") && location.pathname.startsWith("/info"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background border-b border-border transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container-journal">
        <div className="flex items-center justify-between min-h-16 md:min-h-[4.5rem] py-1.5 md:py-2">
          <Link to="/" className="flex flex-col items-start gap-0.5 shrink-0">
            <img
              src="/assets/FullLogo/SVG/YarrowLogo.svg"
              alt="Yarrow"
              className="h-9 w-auto sm:h-10"
              width={140}
              height={40}
            />
            <span className="text-[0.625rem] sm:text-[0.6875rem] leading-tight tracking-wide text-muted-foreground font-medium uppercase">
              Women&apos;s health, your way
            </span>
          </Link>

          {/* Primary nav — uncomment navLinks entries above and isActive/location to restore
          <div className="hidden lg:flex items-center gap-1">
            <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          </div>
          */}

          <div className="hidden lg:flex items-center gap-2">
            <div className="relative" ref={searchPanelRef}>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label={isSearchOpen ? "Close search" : "Open search"}
                aria-expanded={isSearchOpen}
              >
                <Search className="h-4 w-4" />
              </Button>
              {isSearchOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-border bg-card shadow-2xl shadow-foreground/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                  role="dialog"
                  aria-label="Search"
                >
                  <form onSubmit={handleSearch} className="p-4">
                    <label htmlFor="header-search" className="sr-only">
                      Search site
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                          id="header-search"
                          type="search"
                          placeholder="Journey Guides, events, topics…"
                          className="pl-9 h-11 rounded-lg border-border bg-background focus-visible:ring-2 focus-visible:ring-primary"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                          autoComplete="off"
                        />
                      </div>
                      <Button type="submit" size="sm" className="h-11 px-5 rounded-lg bg-primary hover:bg-primary/90 shrink-0 font-medium">
                        Search
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[0.65rem]">Enter</kbd> to search
                    </p>
                  </form>
                  <div className="border-t border-border px-4 py-2.5 bg-muted/30">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* <Button asChild size="sm" className="h-9 bg-primary hover:bg-primary/90">
              <Link to="/programs">Get started</Link>
            </Button> */}
            {homeSidebar && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  homeSidebar.toggle();
                }}
                aria-label="Open health topics"
                aria-expanded={homeSidebar.isOpen}
              >
                <BookOpen className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            {homeSidebar && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  homeSidebar.toggle();
                }}
                aria-label="Open health topics"
                aria-expanded={homeSidebar.isOpen}
              >
                <BookOpen className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="px-0 pb-4">
              <label htmlFor="mobile-search" className="sr-only">
                Search site
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="mobile-search"
                    type="search"
                    placeholder="Journey Guides, events, topics…"
                    className="pl-9 h-11 rounded-lg border-border bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search site"
                  />
                </div>
                <Button type="submit" size="sm" className="h-11 px-5 rounded-lg bg-primary hover:bg-primary/90 shrink-0 font-medium">
                  Search
                </Button>
              </div>
            </form>
            <nav className="flex flex-col gap-0.5">
              {/* {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path) ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground/90"
                  }`}
                >
                  {link.name}
                </Link>
              ))} */}
              <div className="px-4 pt-4 mt-2 border-t border-border">
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    Get started
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
