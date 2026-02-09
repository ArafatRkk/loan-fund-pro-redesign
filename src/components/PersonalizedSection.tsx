const PersonalizedSection = () => {
  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <span className="text-cta font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
            Personalized Mortgage Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
            At LoanFunder Pro, we believe every client deserves a personalized mortgage experience. 
            Our team of experienced professionals is dedicated to finding the best loan options tailored 
            to your unique financial situation. We guide you through every step of the process, from 
            pre-approval to closing, ensuring a smooth and stress-free journey to homeownership.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-xl border border-border">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground p-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cta/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-cta" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-base font-medium">YouTube Video Placeholder</p>
                <p className="text-sm mt-1">Add your personalized mortgage experience video here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedSection;
