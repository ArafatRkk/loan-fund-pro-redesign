import { ScrollReveal } from "@/hooks/useScrollAnimation";

const loanOptions = [
  {
    title: "Conventional Loans",
    description: "Traditional mortgage loans with competitive rates. Ideal for borrowers with good credit scores and stable income. Available in 15, 20, and 30-year fixed-rate terms.",
  },
  {
    title: "FHA Loans",
    description: "Government-backed loans with lower down payment requirements. Perfect for first-time homebuyers or those with lower credit scores. Down payments as low as 3.5%.",
  },
  {
    title: "VA Loans",
    description: "Exclusive loans for veterans and active military personnel. No down payment required and no private mortgage insurance (PMI). Competitive interest rates.",
  },
  {
    title: "USDA Loans",
    description: "Zero down payment loans for eligible rural and suburban homebuyers. Income-based eligibility with competitive fixed interest rates.",
  },
];

const MortgagePrograms = () => {
  return (
    <section className="py-20 bg-section-light" id="programs">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="text-cta font-semibold text-sm uppercase tracking-widest">Our Programs</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
              Mortgage Programs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
              Experience the best mortgage experience located in California
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start mt-12">
          <ScrollReveal delay={0.1}>
            <div className="rounded-xl overflow-hidden shadow-xl border border-border">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/KxKXJrWf9hs"
                  title="Mortgage Programs"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal delay={0.15}>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Home Loan Options</h3>
            </ScrollReveal>
            <div className="space-y-4">
              {loanOptions.map((option, index) => (
                <ScrollReveal key={option.title} delay={0.2 + index * 0.08}>
                  <div className="bg-card rounded-lg p-5 border border-border hover:border-cta/30 transition-all duration-200">
                    <h4 className="font-semibold text-foreground mb-2">{option.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgagePrograms;
