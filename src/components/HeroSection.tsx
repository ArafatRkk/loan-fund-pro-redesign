import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import businessCard from "@/assets/business-card.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-4">
              Your Local<br />
              <span className="text-cta">Mortgage Broker</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8">
              Located in California
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="rounded-full px-10">
                Apply
              </Button>
              <Button variant="heroOutline" size="lg" className="rounded-full px-10">
                Upload Docs
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-primary-foreground/10">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/76wDnOUDPYE"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl border border-primary-foreground/10">
              <img
                src={businessCard}
                alt="Sam Mahshi - Certified Mortgage Advisor Business Card"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
