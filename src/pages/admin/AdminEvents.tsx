import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Calendar,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Users,
} from "lucide-react";
import * as api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

const EVENT_CATEGORIES = [
  "Workshop",
  "Support Group",
  "Community Event",
  "Training",
  "Wellness",
  "Webinar",
  "Other",
] as const;

/** Time slots for event time dropdown (30-min intervals 6:00 AM - 10:00 PM) */
const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let h = 6; h <= 22; h++) {
    for (const m of [0, 30]) {
      if (h === 22 && m === 30) break;
      const period = h >= 12 ? "PM" : "AM";
      const h12 = h > 12 ? h - 12 : h;
      slots.push(`${h12}:${m === 0 ? "00" : "30"} ${period}`);
    }
  }
  return slots;
})();

/** Today in YYYY-MM-DD (local timezone) for date input min so past days cannot be selected */
function getTodayString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parse "9:00 AM - 5:00 PM" into [start, end] or return [full, ""] */
function parseTimeRange(eventTime: string | undefined): [string, string] {
  if (!eventTime?.trim()) return ["", ""];
  const parts = eventTime.split(/\s*-\s*/).map((p) => p.trim());
  if (parts.length >= 2) return [parts[0], parts[1]];
  return [parts[0] ?? "", ""];
}

const AdminEvents = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<api.Event | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [form, setForm] = useState<api.CreateEventInput & { time_start: string; time_end: string }>({
    title: "",
    description: "",
    category: "",
    event_date: "",
    event_time: "",
    time_start: "",
    time_end: "",
    location: "",
    location_type: "in_person",
    max_attendees: undefined,
    image_url: "",
    is_published: true,
  });

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["womenhealth", "admin", "events"],
    queryFn: api.getEvents,
  });

  const createMutation = useMutation({
    mutationFn: api.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["womenhealth", "admin", "events"] });
      setOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<api.CreateEventInput> }) =>
      api.updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["womenhealth", "admin", "events"] });
      setOpen(false);
      setEditing(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["womenhealth", "admin", "events"] });
      queryClient.invalidateQueries({ queryKey: ["womenhealth", "admin", "bookings"] });
      setDeleteId(null);
    },
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      event_date: "",
      event_time: "",
      time_start: "",
      time_end: "",
      location: "",
      location_type: "in_person",
      max_attendees: undefined,
      image_url: "",
      is_published: true,
    });
  };

  const openCreate = () => {
    setEditing(null);
    setImagePreviewError(false);
    resetForm();
    setOpen(true);
  };

  const openEdit = (event: api.Event) => {
    setEditing(event);
    setImagePreviewError(false);
    const [time_start, time_end] = parseTimeRange(event.event_time ?? "");
    setForm({
      title: event.title,
      description: event.description ?? "",
      category: event.category ?? "",
      event_date: event.event_date,
      event_time: event.event_time ?? "",
      time_start,
      time_end,
      location: event.location ?? "",
      location_type: (event.location_type as "online" | "in_person" | "hybrid") ?? "in_person",
      max_attendees: event.max_attendees ?? undefined,
      image_url: event.image_url ?? "",
      is_published: event.is_published,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = getTodayString();
    const eventDate = form.event_date && form.event_date < today ? today : form.event_date;
    if (form.event_date && form.event_date < today) {
      setForm((f) => ({ ...f, event_date: today }));
    }
    const event_time =
      form.time_start && form.time_end
        ? `${form.time_start} - ${form.time_end}`
        : form.event_time || undefined;
    const payload: api.CreateEventInput = {
      title: form.title,
      description: form.description,
      category: form.category || undefined,
      event_date: eventDate,
      event_time,
      location: form.location || undefined,
      location_type: form.location_type,
      max_attendees: form.max_attendees ? Number(form.max_attendees) : undefined,
      image_url: form.image_url || undefined,
      is_published: form.is_published,
    };
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold">Events</h1>
          <CardDescription>Create and manage events</CardDescription>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add event
        </Button>
      </div>

      <Card>
        <CardHeader>
          {/* <CardTitle>All events</CardTitle>
          <CardDescription>Upcoming and past events</CardDescription> */}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground py-8 text-center">Loading…</p>
          ) : events.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No events yet. Add your first event.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date & time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(new Date(event.event_date), "MMM d, yyyy")}
                        {event.event_time && ` · ${event.event_time}`}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location || event.location_type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {event.bookings_count ?? 0}
                        {event.max_attendees != null && ` / ${event.max_attendees}`}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={event.is_published ? "default" : "secondary"}>
                        {event.is_published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(event)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit event" : "Add event"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event_date">Date</Label>
              <Input
                id="event_date"
                type="date"
                min={getTodayString()}
                value={form.event_date}
                onChange={(e) => {
                  const v = e.target.value;
                  const today = getTodayString();
                  if (v && v < today) {
                    setForm((f) => ({ ...f, event_date: today }));
                    return;
                  }
                  setForm((f) => ({ ...f, event_date: v }));
                }}
                onBlur={(e) => {
                  const v = e.target.value;
                  if (v && v < getTodayString()) {
                    setForm((f) => ({ ...f, event_date: getTodayString() }));
                  }
                }}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Time from</Label>
                <Select
                  value={form.time_start || ""}
                  onValueChange={(v) => {
                    const start = v || "";
                    let end = form.time_end;
                    if (start && end && TIME_SLOTS.indexOf(end) < TIME_SLOTS.indexOf(start)) {
                      end = "";
                    }
                    setForm((f) => ({ ...f, time_start: start, time_end: end }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Start" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time to</Label>
                <Select
                  value={form.time_end || ""}
                  onValueChange={(v) => setForm((f) => ({ ...f, time_end: v || "" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="End" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.filter((slot) => {
                      if (!form.time_start) return true;
                      const startIdx = TIME_SLOTS.indexOf(form.time_start);
                      const endIdx = TIME_SLOTS.indexOf(slot);
                      return endIdx >= startIdx;
                    }).map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Event image (URL)</Label>
              <Input
                id="image_url"
                type="url"
                value={form.image_url ?? ""}
                onChange={(e) => {
                  setImagePreviewError(false);
                  setForm((f) => ({ ...f, image_url: e.target.value || undefined }));
                }}
                placeholder="https://..."
              />
              {form.image_url && (
                <div className="rounded-lg border border-border overflow-hidden bg-muted w-full max-w-[280px] aspect-video">
                  {imagePreviewError ? (
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground p-4 text-center">
                      Preview unavailable. Check the link.
                    </div>
                  ) : (
                    <img
                      src={form.image_url ?? ""}
                      alt="Event preview"
                      className="w-full h-full object-cover"
                      onLoad={() => setImagePreviewError(false)}
                      onError={() => setImagePreviewError(true)}
                    />
                  )}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Upload an image at{" "}
                <a
                  href="https://postimages.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline"
                >
                  postimages.org
                </a>
                , then paste the direct link here. Optional.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category || ""}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v || undefined }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. Online (Zoom), Community Center"
              />
            </div>
            <div className="space-y-2">
              <Label>Location type</Label>
              <Select
                value={form.location_type}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, location_type: v as "online" | "in_person" | "hybrid" }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_person">In person</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_attendees">Max attendees (optional)</Label>
              <Input
                id="max_attendees"
                type="number"
                min={0}
                value={form.max_attendees ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    max_attendees: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_published"
                checked={form.is_published}
                onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))}
                className="rounded border-input"
              />
              <Label htmlFor="is_published">Published (visible on public site)</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editing ? "Save" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId != null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete event?</AlertDialogTitle>
            <AlertDialogDescription>
              This will also remove all bookings for this event. This cannot be undone.
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

export default AdminEvents;
