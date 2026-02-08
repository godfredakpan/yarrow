import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { to: "/admin/contact-requests", label: "Contact requests", icon: MessageSquare },
];

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-border bg-card p-4 flex flex-col gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-semibold hover:opacity-90"
        >
          <img
            src="/assets/FullLogo/SVG/YarrowLogo-Dark.svg"
            alt="Yarrow"
            className="h-6 w-auto"
            width={100}
            height={28}
          />
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-border pt-4 space-y-2">
          <p className="px-3 text-xs text-muted-foreground truncate">
            {admin?.email}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
