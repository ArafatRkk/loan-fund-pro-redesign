import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

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
              <div className="aspect-video bg-primary/50 flex items-center justify-center">
                <div className="text-center text-primary-foreground/60 p-8">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-cta/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-cta" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm">YouTube Video Placeholder</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl border border-primary-foreground/10">
              <div className="aspect-[3/2] bg-primary/50 flex items-center justify-center">
                <div className="text-center text-primary-foreground/60 p-8">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-teal/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <p className="text-sm">Business Card Photo Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
