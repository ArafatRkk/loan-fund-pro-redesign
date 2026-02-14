import { FileText, Search, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import VideoPlaceholder from "@/components/VideoPlaceholder";

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
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Home Loan Process
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-video">
                <VideoPlaceholder />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={0.1 + index * 0.1}>
              <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/10 hover:border-cta/50 transition-all duration-300 hover:-translate-y-1 group h-full">
                <div className="w-14 h-14 rounded-xl bg-cta/20 flex items-center justify-center mb-6 group-hover:bg-cta/30 transition-colors">
                  <step.icon className="w-7 h-7 text-cta" />
                </div>
                <div className="text-cta font-mono text-sm mb-2">Step {index + 1}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeLoanProcess;
