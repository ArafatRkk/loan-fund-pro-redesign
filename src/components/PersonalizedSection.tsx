import { ScrollReveal } from "@/hooks/useScrollAnimation";
import VideoPlaceholder from "@/components/VideoPlaceholder";

const PersonalizedSection = () => {
  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-cta font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
              Personalized Mortgage Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
              At Preferred Mortgage Inc., we believe every client deserves a personalized mortgage experience.
              Our team of experienced professionals is dedicated to finding the best loan options tailored
              to your unique financial situation. We guide you through every step of the process, from
              pre-approval to closing, ensuring a smooth and stress-free journey to homeownership.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-xl border border-border">
              <div className="aspect-video">
                <VideoPlaceholder />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PersonalizedSection;
