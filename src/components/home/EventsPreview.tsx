import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import * as api from "@/lib/api";
import { images } from "@/lib/images";

export function EventsPreview() {
  const { ref: sectionRef, isInView } = useInView();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["womenhealth", "public", "events"],
    queryFn: () => api.getPublicEvents(),
  });

  const upcomingEvents = events.slice(0, 3);

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container-journal">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 transition-all duration-600 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <p className="section-eyebrow mb-2">Community</p>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Upcoming events</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Workshops, webinars, and community events.
            </p>
          </div>
          <Button asChild variant="outline" size="default" className="h-11 px-6 shrink-0 rounded-xl border-2">
            <Link to="/events" className="gap-2">
              View all events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground py-12 text-center">Loading events…</p>
        ) : upcomingEvents.length === 0 ? (
          <div className="rounded-lg border border-border bg-muted/30 py-16 text-center">
            <p className="text-muted-foreground">
              No upcoming events at the moment. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => {
              const eventImage = event.image_url || images.eventWorkshop;
              const eventDate = format(new Date(event.event_date), "MMM d, yyyy");

              return (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className={`group bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-foreground/[0.06] hover:border-primary/20 ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={isInView ? { transitionDelay: `${index * 100}ms` } : undefined}
                >
                  <div className="aspect-[5/3] w-full overflow-hidden bg-muted">
                    <img
                      src={eventImage}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={600}
                      height={360}
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary mb-4">
                      {event.category || "Event"}
                    </span>
                    <h3 className="font-display font-semibold text-xl mb-4 line-clamp-2 leading-snug">
                      {event.title}
                    </h3>
                    <div className="space-y-2.5 text-sm text-muted-foreground mb-6">
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
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      View details
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
