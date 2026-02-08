import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import * as api from "@/lib/api";
import { images } from "@/lib/images";
import NotFound from "./NotFound";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const numId = id ? parseInt(id, 10) : NaN;

  const { data: event, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["womenhealth", "public", "event", numId],
    queryFn: () => api.getPublicEvent(numId),
    enabled: Number.isFinite(numId),
  });

  if (!id || Number.isNaN(numId)) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-journal max-w-3xl">
            <p className="text-muted-foreground text-center py-12">Loading event…</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (isError || !event) {
    const msg = error instanceof Error ? error.message : "";
    if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
      return <NotFound />;
    }
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-journal max-w-3xl text-center space-y-4">
            <p className="text-destructive">
              {msg || "Event not found or failed to load."}
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              Try again
            </Button>
            <Button asChild variant="ghost">
              <Link to="/events">Back to events</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const eventImage = event.image_url || images.eventWorkshop;
  const eventDate = format(new Date(event.event_date), "MMMM d, yyyy");
  const spotsLeft =
    event.max_attendees != null && event.bookings_count != null
      ? Math.max(0, event.max_attendees - event.bookings_count)
      : null;

  const today = new Date().toISOString().slice(0, 10);
  const isPast = event.event_date < today;

  return (
    <Layout>
      {/* Banner with image */}
      <section className="relative w-full aspect-[21/9] min-h-[240px] md:min-h-[320px] overflow-hidden bg-muted">
        <img
          src={eventImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={1400}
          height={600}
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-journal pb-8 md:pb-12">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground text-sm mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to events
            </Link> <br />
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-block px-3 py-1.5 text-sm font-medium rounded-full bg-primary/90 text-primary-foreground">
                {event.category || "Event"}
              </span>
              {isPast && (
                <span className="inline-block px-3 py-1.5 text-sm font-medium rounded-full bg-muted-foreground/90 text-primary-foreground">
                  Past event
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary-foreground drop-shadow-sm">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding">
        <div className="container-journal max-w-3xl">
          <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary shrink-0" />
              {eventDate}
            </span>
            {event.event_time && (
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                {event.event_time}
              </span>
            )}
            {(event.location || event.location_type) && (
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                {event.location || event.location_type}
              </span>
            )}
            {!isPast && spotsLeft != null && (
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary shrink-0" />
                {spotsLeft} spots left
              </span>
            )}
          </div>

          <div className="prose prose-lg max-w-none mb-10">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {event.description || ""}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {isPast ? (
              <>
                <Button size="lg" className="h-12 px-8" disabled>
                  Registration closed — event has passed
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link to="/events">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    View all events
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="h-12 px-8">
                  <Link
                    to={`/contact?eventId=${event.id}`}
                    state={{ eventId: event.id, eventTitle: event.title }}
                  >
                    Register for this event
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link to="/events">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    View all events
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetail;
