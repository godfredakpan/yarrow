import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Mail, Phone, Calendar, MessageSquare } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const TOPIC_LABELS: Record<string, string> = {
  general: "General Health Questions",
  menstrual: "Menstrual Health",
  fertility: "Fertility & Family Planning",
  pcos: "PCOS / Endometriosis",
  menopause: "Perimenopause / Menopause",
  mental: "Mental Health & Wellness",
  nutrition: "Nutrition & Fitness",
  other: "Other",
};

const AGE_GROUP_LABELS: Record<string, string> = {
  teen: "Teen (16-19)",
  young: "Young Adult (20-35)",
  peri: "Perimenopause (40-50)",
  senior: "50+",
  caregiver: "Caregiver/Parent",
};

const AdminContactRequests = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["womenhealth", "admin", "contact-requests"],
    queryFn: api.getContactRequests,
    retry: false,
  });

  const selected = selectedId != null ? requests.find((r) => r.id === selectedId) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold">Contact requests</h1>
        <CardDescription>Consultation and general contact form submissions</CardDescription>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All requests</CardTitle>
          <CardDescription>Click a row to view full message</CardDescription>
        </CardHeader>
        <CardContent>
          {isError ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-destructive">
                {error instanceof Error ? error.message : "Failed to load contact requests."}
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : isLoading ? (
            <p className="text-muted-foreground py-8 text-center">Loading…</p>
          ) : requests.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No contact requests yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Age / Topic</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow
                    key={req.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedId(req.id)}
                  >
                    <TableCell className="font-medium">{req.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {req.email}
                        </span>
                        {req.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {req.phone}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {req.age_group && (
                        <span>{AGE_GROUP_LABELS[req.age_group] ?? req.age_group}</span>
                      )}
                      {req.age_group && req.topic && " · "}
                      {req.topic && (
                        <span>{TOPIC_LABELS[req.topic] ?? req.topic}</span>
                      )}
                      {!req.age_group && !req.topic && "—"}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(req.created_at), "MMM d, yyyy HH:mm")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(req.id);
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={selected != null} onOpenChange={() => setSelectedId(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selected?.name ?? "Request details"}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline">
                    {selected.email}
                  </a>
                </span>
                {selected.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${selected.phone}`} className="text-primary hover:underline">
                      {selected.phone}
                    </a>
                  </span>
                )}
              </div>
              <div className="flex gap-4 text-muted-foreground">
                {selected.age_group && (
                  <span>Age group: {AGE_GROUP_LABELS[selected.age_group] ?? selected.age_group}</span>
                )}
                {selected.topic && (
                  <span>Topic: {TOPIC_LABELS[selected.topic] ?? selected.topic}</span>
                )}
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Submitted {format(new Date(selected.created_at), "PPp")}</p>
                {selected.message ? (
                  <p className="whitespace-pre-wrap rounded-md bg-muted p-3">{selected.message}</p>
                ) : (
                  <p className="text-muted-foreground italic">No message</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactRequests;
