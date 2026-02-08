import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Mail, Phone, Calendar, Trash2 } from "lucide-react";
import * as api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ALL_EVENTS = "__all__";
const ALL_STATUSES = "__all__";

const AdminBookings = () => {
  const queryClient = useQueryClient();
  const [eventFilter, setEventFilter] = useState<string>(ALL_EVENTS);
  const [statusFilter, setStatusFilter] = useState<string>(ALL_STATUSES);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: events = [] } = useQuery({
    queryKey: ["womenhealth", "admin", "events"],
    queryFn: api.getEvents,
    retry: false,
  });

  const {
    data: bookingsRaw,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["womenhealth", "admin", "bookings", eventFilter, statusFilter],
    queryFn: () =>
      api.getBookings({
        event_id: eventFilter && eventFilter !== ALL_EVENTS ? Number(eventFilter) : undefined,
        status: statusFilter !== ALL_STATUSES ? statusFilter : undefined,
      }),
    retry: false,
  });
  const bookings = Array.isArray(bookingsRaw) ? bookingsRaw : [];

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { status: string } }) =>
      api.updateBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["womenhealth", "admin", "bookings"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["womenhealth", "admin", "bookings"] });
      setDeleteId(null);
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold">Bookings</h1>
        <CardDescription>Manage event registrations</CardDescription>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            {/* <CardTitle>All bookings</CardTitle> */}
            <div className="flex gap-2">
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_EVENTS}>All events</SelectItem>
                  {events.map((e) => (
                    <SelectItem key={e.id} value={String(e.id)}>
                      {e.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_STATUSES}>All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription>Filter by event or status</CardDescription>
        </CardHeader>
        <CardContent>
          {isError ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-destructive">
                {error instanceof Error ? error.message : "Failed to load bookings."}
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : isLoading ? (
            <p className="text-muted-foreground py-8 text-center">Loading…</p>
          ) : bookings.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              {eventFilter === ALL_EVENTS && statusFilter === ALL_STATUSES
                ? "No bookings yet. Registrations will appear here when users sign up for events."
                : "No bookings match your filters."}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[140px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.event?.title ?? `Event #${booking.event_id}`}
                    </TableCell>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {booking.email}
                        </span>
                        {booking.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {booking.phone}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(new Date(booking.created_at), "MMM d, yyyy HH:mm")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value) =>
                          updateMutation.mutate({ id: booking.id, data: { status: value } })
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(booking.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteId != null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the registration. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId != null && deleteMutation.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBookings;
