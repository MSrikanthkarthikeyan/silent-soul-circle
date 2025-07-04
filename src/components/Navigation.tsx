import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Chat Rooms", href: "/chatrooms" },
    { name: "1v1 Chat", href: "/1v1-chat" },
    { name: "Journal", href: "/journal" },
    { name: "Connect", href: "/connect" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hero-text">EchoRoom</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.href) 
                    ? "text-foreground bg-muted" 
                    : "text-foreground-muted hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/sos">
              <Button variant="emergency" size="sm">
                SOS Help
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Anonymous Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-foreground bg-muted"
                      : "text-foreground-muted hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link to="/sos" onClick={() => setIsOpen(false)}>
                  <Button variant="emergency" className="w-full">
                    SOS Help
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Anonymous Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;