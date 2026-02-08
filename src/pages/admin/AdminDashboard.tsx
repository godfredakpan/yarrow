import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar, ClipboardList, MessageSquare, ArrowRight } from "lucide-react";
import * as api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { data: events = [] } = useQuery({
    queryKey: ["womenhealth", "admin", "events"],
    queryFn: api.getEvents,
  });
  const { data: bookings = [] } = useQuery({
    queryKey: ["womenhealth", "admin", "bookings"],
    queryFn: () => api.getBookings(),
  });
  const { data: contactRequests = [] } = useQuery({
    queryKey: ["womenhealth", "admin", "contact-requests"],
    queryFn: api.getContactRequests,
  });

  const upcomingEvents = events.filter(
    (e) => new Date(e.event_date) >= new Date()
  ).length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of events, bookings and contact requests
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{upcomingEvents}</p>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/admin/events">
                Manage events
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending bookings
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{pendingBookings}</p>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/admin/bookings">
                Manage bookings
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contact requests
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{contactRequests.length}</p>
            <Button variant="link" className="px-0 mt-2" asChild>
              <Link to="/admin/contact-requests">
                View requests
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
