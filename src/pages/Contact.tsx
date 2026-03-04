import { useState } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PageBanner } from "@/components/layout/PageBanner";
import * as api from "@/lib/api";
import { images } from "@/lib/images";

const WHATSAPP_NUMBER = "1234567890";

type ContactLocationState = { eventId?: number; eventTitle?: string } | null;

const Contact = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const state = (location.state ?? null) as ContactLocationState;
  // eventId from link state (when coming from EventDetail) or from URL ?eventId= so it survives refresh
  const eventIdFromState = state?.eventId;
  const eventIdFromUrl = searchParams.get("eventId");
  const eventId = eventIdFromState ?? (eventIdFromUrl ? parseInt(eventIdFromUrl, 10) : undefined);
  const eventIdValid = eventId != null && Number.isFinite(eventId) && eventId > 0;
  const eventTitle = state?.eventTitle ?? (eventIdValid ? "this event" : "this event");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const handleEventBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventIdValid || eventId == null || !formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await api.createBooking({
        event_id: eventId as number,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        notes: formData.message.trim() || undefined,
      });
      setIsSubmitted(true);
      toast({
        title: "You're registered!",
        description: `Your registration for ${eventTitle} has been submitted.`,
      });
    } catch (err) {
      toast({
        title: "Registration failed",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.name.length > 100) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid name (max 100 characters).",
        variant: "destructive",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) || formData.email.length > 255) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    if (formData.message && formData.message.length > 1000) {
      toast({
        title: "Message too long",
        description: "Please keep your message under 1000 characters.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await api.createContactRequest({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        topic: formData.topic || undefined,
        message: formData.message.trim() || undefined,
      });
      setIsSubmitted(true);
      toast({
        title: "Request submitted!",
        description: "We'll be in touch within 24-48 hours.",
      });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = eventIdValid ? handleEventBookingSubmit : handleConsultationSubmit;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'd like to book a free consultation.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-narrow text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/10 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl mb-4">Thank you</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {eventIdValid
                ? `Your registration for ${eventTitle} has been submitted. We'll confirm your spot soon.`
                : "Your consultation request has been submitted. Our team will contact you within 24-48 hours to schedule your free session."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {eventIdValid && (
                <Button asChild variant="outline">
                  <Link to="/events">View more events</Link>
                </Button>
              )}
              <Button onClick={() => setIsSubmitted(false)}>
                {eventIdValid ? "Register for another event" : "Submit another request"}
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageBanner
        eyebrow="Connect"
        title="Contact"
        description="Book a free consultation or get in touch with our team. We're here to help and support you."
        image={images.bannerContact}
      />

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-journal">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl mb-6">Get in touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a href="mailto:hello@yarrow.org" className="text-muted-foreground hover:text-primary">
                      hello@yarrow.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a href="tel:+2348000000000" className="text-muted-foreground hover:text-primary">
                      +234 800 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-muted-foreground">
                      Abuja, Nigeria
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-2">Prefer WhatsApp?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with us directly for quick questions or to schedule a consultation.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleWhatsAppClick}
                >
                  <WhatsAppIcon size={20} className="mr-2 text-[#25D366]" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Consultation Form */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border-2 border-primary bg-primary/5 p-8">
                <h2 className="font-display text-2xl mb-2">
                  {eventIdValid ? `Register for ${eventTitle}` : "Book a free consultation"}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {eventIdValid
                    ? "Enter your details below to register for this event."
                    : "Fill out the form below and we'll contact you to schedule your free consultation session."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        maxLength={100}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        maxLength={255}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    </div>

                  {!eventIdValid && (
                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic of Interest</Label>
                      <Select
                        value={formData.topic}
                        onValueChange={(value) => setFormData({ ...formData, topic: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="What would you like to discuss?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Health Questions</SelectItem>
                          <SelectItem value="menstrual">Menstrual Health</SelectItem>
                          <SelectItem value="familyplanning">Family Planning</SelectItem>
                          <SelectItem value="pcos">PCOS / Endometriosis</SelectItem>
                          <SelectItem value="menopause">Perimenopause / Menopause</SelectItem>
                          <SelectItem value="mental">Mental Health & Wellness</SelectItem>
                          <SelectItem value="nutrition">Nutrition & Fitness</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">{eventIdValid ? "Notes (optional)" : "Additional Information"}</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about what you'd like to discuss (optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      maxLength={1000}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        {eventIdValid ? "Register for event" : "Submit request"}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    All consultations are 100% free and confidential.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
