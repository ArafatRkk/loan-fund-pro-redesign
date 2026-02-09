import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ContactFormDialog from "@/components/ContactFormDialog";

const navItems = [
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Programs", href: "#programs" },
  { label: "Contact Us", href: "#contact", isContact: true },
  { label: "Calculation", href: "#calculator" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-cta flex items-center justify-center">
            <span className="text-cta-foreground font-bold text-lg">PM</span>
          </div>
          <span className="text-primary-foreground font-serif text-xl font-bold">
            Preferred<span className="text-cta"> Mortgage Inc.</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.isContact ? (
              <ContactFormDialog key={item.label}>
                <button className="px-4 py-2 text-primary-foreground/80 hover:text-cta font-medium text-sm transition-colors duration-200">
                  {item.label}
                </button>
              </ContactFormDialog>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-primary-foreground/80 hover:text-cta font-medium text-sm transition-colors duration-200"
              >
                {item.label}
              </a>
            )
          )}
          <Button variant="cta" size="lg" className="ml-4 rounded-full">
            Apply Online
          </Button>
        </nav>

        <button
          className="lg:hidden text-primary-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) =>
              item.isContact ? (
                <ContactFormDialog key={item.label}>
                  <button
                    className="px-4 py-3 text-left text-primary-foreground/80 hover:text-cta font-medium text-sm transition-colors rounded-md hover:bg-primary-foreground/5"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </button>
                </ContactFormDialog>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-primary-foreground/80 hover:text-cta font-medium text-sm transition-colors rounded-md hover:bg-primary-foreground/5"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <Button variant="cta" className="mt-2 rounded-full">
              Apply Online
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
