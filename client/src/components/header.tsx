import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Camera, Search, Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./search-bar";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && (location === "/" || location.startsWith("/?category="))) return true;
    if (path !== "/" && !path.includes("?") && location.startsWith(path)) return true;
    if (path.includes("?")) {
      const [basePath, query] = path.split("?");
      return location.includes(query);
    }
    return false;
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/?category=digital", label: "Digital" },
    { href: "/?category=film", label: "Film" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and site title */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Camera className="text-secondary text-2xl" />
            <h1 className="text-xl font-sans font-bold text-primary">macrokroma</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`text-gray-700 hover:text-secondary transition-colors font-sans font-medium ${
                  isActive(item.href) ? "text-secondary" : ""
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Search and actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <SearchBar />
            </div>

            
            {/* Mobile menu trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="sm:hidden">
                    <SearchBar />
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span 
                          className={`block text-lg text-gray-700 hover:text-secondary transition-colors font-sans ${
                            isActive(item.href) ? "text-secondary font-medium" : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
