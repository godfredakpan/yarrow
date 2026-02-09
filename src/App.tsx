import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { HomeSidebarProvider } from "@/contexts/HomeSidebarContext";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import ProgramStage from "./pages/ProgramStage";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminContactRequests from "./pages/admin/AdminContactRequests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminAuthProvider>
          <HomeSidebarProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:stageId" element={<ProgramStage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/info" element={<Info />} />
            <Route path="/info/:slug" element={<Info />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="contact-requests" element={<AdminContactRequests />} />
            </Route>
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </HomeSidebarProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
