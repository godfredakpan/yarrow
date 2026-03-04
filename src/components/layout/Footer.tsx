import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const footerSections = {
  explore: {
    title: "Explore",
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Journey Guides", path: "/programs" },
      { name: "Events", path: "/events" },
      { name: "Info", path: "/info/what-is-a-period" },
      { name: "Contact", path: "/contact" },
    ],
  },
  resources: {
    title: "Journey Guides",
    links: [
      { name: "Puberty & periods", path: "/programs/foundations" },
      { name: "Reproductive health", path: "/programs/reproductive" },
      { name: "Hormonal changes & perimenopause", path: "/programs/hormonal" },
      { name: "Long-term wellness", path: "/programs/wellness" },
    ],
  },
  connect: {
    title: "Connect",
    links: [
      { name: "Contact", path: "/contact" },
      { name: "Get started", path: "/programs" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-journal py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img
                src="/assets/FullLogo/SVG/YarrowLogo.svg"
                alt="Yarrow"
                className="h-9 w-auto"
                width={140}
                height={40}
              />
            </Link>
            <p className="text-primary-foreground/85 text-sm leading-relaxed max-w-sm mb-6">
              Healing and care, rooted in nature. Women&apos;s health, for everyone.
            </p>
            <p className="text-sm text-primary-foreground/70 font-medium">Soft yet powerful. Future forward.</p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground mb-4">
              {footerSections.explore.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.explore.links.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground mb-4">
              {footerSections.resources.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.resources.links.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground mb-4">
              {footerSections.connect.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.connect.links.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 opacity-80" />
                <span>hello@yarrow.org</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 opacity-80" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 opacity-80" />
                <span>Abuja, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Yarrow. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
