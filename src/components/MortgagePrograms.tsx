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
    title: "Jumbo Loans",
    description: "Financing for high-value properties that exceed conventional loan limits. Flexible terms available for luxury homes and high-cost areas in California.",
  },
  {
    title: "USDA Loans",
    description: "Zero down payment loans for eligible rural and suburban homebuyers. Income-based eligibility with competitive fixed interest rates.",
  },
  {
    title: "Refinance Options",
    description: "Lower your monthly payments, shorten your loan term, or access your home equity. Rate-and-term refinancing and cash-out refinancing options available.",
  },
];

const MortgagePrograms = () => {
  return (
    <section className="py-20 bg-section-light" id="programs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className="text-cta font-semibold text-sm uppercase tracking-widest">Our Programs</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
            Mortgage Programs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
            Experience the best mortgage experience located in California
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mt-12">
          <div className="rounded-xl overflow-hidden shadow-xl border border-border">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground p-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cta/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-cta" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-base font-medium">YouTube Video Placeholder</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Home Loan Options</h3>
            <div className="space-y-4">
              {loanOptions.map((option) => (
                <div
                  key={option.title}
                  className="bg-card rounded-lg p-5 border border-border hover:border-cta/30 transition-all duration-200"
                >
                  <h4 className="font-semibold text-foreground mb-2">{option.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgagePrograms;
