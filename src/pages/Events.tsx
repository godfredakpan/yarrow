import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, ArrowRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as api from "@/lib/api";
import type { Event } from "@/lib/api";
import { images } from "@/lib/images";

/** Today as YYYY-MM-DD in local time for comparison with event_date */
function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function isPastEvent(event: Event): boolean {
  return event.event_date < getTodayDateString();
}

function EventCard({
  event,
  isPast,
}: {
  event: Event;
  isPast: boolean;
}) {
  const spotsLeft =
    event.max_attendees != null && event.bookings_count != null
      ? Math.max(0, event.max_attendees - event.bookings_count)
      : null;
  const eventImage = event.image_url || images.eventWorkshop;
  const eventDate = format(new Date(event.event_date), "MMMM d, yyyy");

  return (
    <Link
      to={`/events/${event.id}`}
      className={`bg-card rounded-lg border overflow-hidden flex flex-col group transition-all duration-300 ${
        isPast
          ? "border-border/80 opacity-90 hover:opacity-100 hover:border-border"
          : "border-border card-hover hover:shadow-lg hover:border-primary/30"
      }`}
    >
      <div className="aspect-[5/3] w-full overflow-hidden bg-muted relative">
        <img
          src={eventImage}
          alt=""
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isPast ? "grayscale-[0.3]" : ""}`}
          width={600}
          height={360}
        />
        {isPast && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-md bg-muted-foreground/90 text-primary-foreground">
            Past event
          </span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {event.category || "Event"}
          </span>
          {!isPast && spotsLeft != null && (
            <span className="text-xs text-muted-foreground">
              {spotsLeft} spots left
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {event.description || ""}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <span>{eventDate}</span>
          </div>
          {event.event_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>{event.event_time}</span>
            </div>
          )}
          {(event.location || event.location_type) && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>{event.location || event.location_type}</span>
            </div>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          View details
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

const Events = () => {
  const { data: events = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["womenhealth", "public", "events"],
    queryFn: () => api.getPublicEvents(),
  });

  const today = getTodayDateString();
  const upcoming = events.filter((e) => e.event_date >= today);
  const past = events.filter((e) => e.event_date < today).sort((a, b) => (b.event_date > a.event_date ? 1 : -1));

  return (
    <Layout>
      <PageBanner
        eyebrow="Community"
        title="Events"
        description="Join us for workshops, webinars, and community events focused on women's health education and support."
        image={images.bannerEvents}
      />

      {/* Events List */}
      <section className="section-padding">
        <div className="container-journal">
          {isError ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-destructive">
                {error instanceof Error ? error.message : "Failed to load events."}
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : isLoading ? (
            <p className="text-muted-foreground py-12 text-center">Loading events…</p>
          ) : events.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center">
              No events at the moment. Check back soon.
            </p>
          ) : (
            <div className="space-y-14">
              {/* Upcoming events */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl mb-6 flex items-center gap-2">
                  <Calendar className="h-7 w-7 text-primary" />
                  Upcoming events
                </h2>
                {upcoming.length === 0 ? (
                  <p className="text-muted-foreground py-8 rounded-lg bg-muted/50 border border-border border-dashed text-center">
                    No upcoming events. Check back later or browse past events below.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcoming.map((event) => (
                      <EventCard key={event.id} event={event} isPast={false} />
                    ))}
                  </div>
                )}
              </div>

              {/* Past events */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl mb-6 flex items-center gap-2">
                  <History className="h-7 w-7 text-muted-foreground" />
                  Past events
                </h2>
                {past.length === 0 ? (
                  <p className="text-muted-foreground py-8 rounded-lg bg-muted/50 border border-border border-dashed text-center">
                    No past events to show.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {past.map((event) => (
                      <EventCard key={event.id} event={event} isPast />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="section-padding bg-muted/50">
        <div className="container-narrow text-center">
          <Users className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display mb-4">Want to host an event?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We partner with organizations and communities to bring women's
            health education to more people. Get in touch to discuss hosting
            an event in your area.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
