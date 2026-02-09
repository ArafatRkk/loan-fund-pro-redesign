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
            At Preferred Mortgage Inc., we believe every client deserves a personalized mortgage experience. 
            Our team of experienced professionals is dedicated to finding the best loan options tailored 
            to your unique financial situation. We guide you through every step of the process, from 
            pre-approval to closing, ensuring a smooth and stress-free journey to homeownership.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-xl border border-border">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Dp_4OLkFp3o"
                title="Why Choose Us"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedSection;
