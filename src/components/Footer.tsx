import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" id="contact">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-cta flex items-center justify-center">
                <span className="text-cta-foreground font-bold text-lg">MB</span>
              </div>
              <span className="font-serif text-xl font-bold">
                Mortgage<span className="text-cta">Broker</span>
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Your trusted local mortgage broker in California. We provide personalized mortgage
              solutions to help you achieve your homeownership dreams.
            </p>
            <p className="text-primary-foreground/40 text-xs">
              NMLS# 123456 | DRE# 01234567
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Programs", "Calculator", "FAQ", "Blog"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "")}`} className="text-primary-foreground/60 hover:text-cta text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Loan Programs</h4>
            <ul className="space-y-3">
              {["Conventional Loans", "FHA Loans", "VA Loans", "USDA Loans"].map((item) => (
                <li key={item}>
                  <a href="#programs" className="text-primary-foreground/60 hover:text-cta text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-primary-foreground/60 hover:text-cta text-sm transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                (123) 456-7890
              </a>
              <a href="mailto:info@mortgagebroker.com" className="flex items-center gap-3 text-primary-foreground/60 hover:text-cta text-sm transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@mortgagebroker.com
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                California, United States
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © 2025 Mortgage Broker. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/40 hover:text-cta text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/40 hover:text-cta text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/40 hover:text-cta text-sm transition-colors">
              Disclosures
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
