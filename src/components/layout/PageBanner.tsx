import type { ReactNode } from "react";

interface PageBannerProps {
  /** Small label above the title (e.g. "About us", "Sections") */
  eyebrow: string;
  /** Main heading */
  title: string;
  /** Supporting line below the title */
  description: string;
  /** Optional background image URL. If not provided, uses gradient only. */
  image?: string;
  /** Optional CTA or extra content below description */
  children?: ReactNode;
}

export function PageBanner({ eyebrow, title, description, image, children }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden min-h-[42vh] flex flex-col justify-end md:min-h-[38vh]">
      {/* Background image or gradient */}
      <div className="absolute inset-0">
        {image ? (
          <>
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              width={1920}
              height={720}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/70"
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/95"
            aria-hidden
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-primary-foreground/90 text-sm font-medium tracking-[0.2em] uppercase mb-2">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-primary-foreground leading-tight tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            {description}
          </p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}
