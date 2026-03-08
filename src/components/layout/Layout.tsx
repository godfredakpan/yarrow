import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useHomeSidebar } from "@/contexts/HomeSidebarContext";
import { HomeSidebarPanel } from "@/components/home/HomeSidebarPanel";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const homeSidebar = useHomeSidebar();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {homeSidebar && <HomeSidebarPanel sidebar={homeSidebar} />}
    </div>
  );
}
