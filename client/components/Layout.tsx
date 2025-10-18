import { Link, useLocation } from "react-router-dom";
import { Brain, Menu, X, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    function refresh() {
      try {
        const raw = localStorage.getItem('cp_current');
        setCurrentUser(raw ? JSON.parse(raw) : null);
      } catch {
        setCurrentUser(null);
      }
    }
    // initial
    refresh();
    // update on storage events (other tabs)
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, [location.pathname]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Assessment", href: "/diagnostic" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
    { name: "Resume Builder", href: "/resume" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <span className="font-bold text-xl">CompetencyPro</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <>
                  <span className="text-sm text-foreground">{currentUser.fullName || currentUser.email}</span>
                  <Button size="sm" variant="outline" onClick={() => {
                    localStorage.removeItem('cp_token');
                    localStorage.removeItem('cp_current');
                    setCurrentUser(null);
                    navigate('/');
                  }}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
                  <Button asChild size="sm">
                    <Link to="/register">Sign up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="px-3 py-2 text-sm text-muted-foreground">Student project demo — no real user accounts.</div>
                      <div className="mt-2 space-y-1">
                        <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">Profile</Link>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">Dashboard</Link>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <span className="font-bold text-xl">CompetencyPro</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Advanced AI-powered competency diagnostics that evaluate your
                skills, identify opportunities, and provide personalized
                recommendations to accelerate your career growth.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/diagnostic"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Assessment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resume"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Resume Builder
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
