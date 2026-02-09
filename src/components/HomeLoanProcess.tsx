import { FileText, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Application",
    description: "Complete your mortgage application with our easy online form. Our team will review your information and guide you through the initial process.",
  },
  {
    icon: Search,
    title: "Processing & Underwriting",
    description: "We carefully review your documents, verify your information, and work with underwriters to get your loan approved as quickly as possible.",
  },
  {
    icon: CheckCircle,
    title: "Closing",
    description: "Once approved, we coordinate the closing process. Sign your documents, get your keys, and move into your dream home!",
  },
];

const HomeLoanProcess = () => {
  return (
    <section className="py-20 bg-section-dark text-primary-foreground" id="process">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Home Loan Process
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ZARsJuwC0LU"
                title="Home Loan Process"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/10 hover:border-cta/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-xl bg-cta/20 flex items-center justify-center mb-6 group-hover:bg-cta/30 transition-colors">
                <step.icon className="w-7 h-7 text-cta" />
              </div>
              <div className="text-cta font-mono text-sm mb-2">Step {index + 1}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeLoanProcess;
