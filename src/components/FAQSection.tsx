import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What is a mortgage?",
    answer: "A mortgage is a loan used to purchase or refinance a home or other real estate. The property itself serves as collateral for the loan. Mortgages are typically repaid over 15 to 30 years through monthly payments that include principal and interest."
  },
  {
    question: "How much down payment do I need?",
    answer: "The down payment requirement depends on the type of loan. Conventional loans typically require 3-20% down, FHA loans require as little as 3.5%, VA and USDA loans may require no down payment at all. A larger down payment can help you get better rates and avoid private mortgage insurance (PMI)."
  },
  {
    question: "What credit score do I need to qualify for a mortgage?",
    answer: "Credit score requirements vary by loan type. Conventional loans typically require a minimum score of 620, FHA loans may accept scores as low as 580 (or 500 with 10% down), and VA loans have no minimum requirement set by the VA, though lenders typically look for 620+. Higher credit scores generally qualify for better interest rates."
  },
  {
    question: "What is the difference between pre-qualification and pre-approval?",
    answer: "Pre-qualification is an informal estimate of how much you might be able to borrow based on self-reported financial information. Pre-approval is a more formal process where a lender verifies your financial information and provides a conditional commitment for a specific loan amount. Pre-approval carries more weight with sellers."
  },
  {
    question: "How long does the mortgage process take?",
    answer: "The typical mortgage process takes 30-45 days from application to closing. However, this timeline can vary depending on factors such as the complexity of your financial situation, the type of loan, appraisal timelines, and how quickly you provide required documentation."
  },
  {
    question: "What are closing costs?",
    answer: "Closing costs are fees associated with finalizing your mortgage, typically ranging from 2-5% of the loan amount. They may include appraisal fees, title insurance, attorney fees, origination fees, recording fees, and prepaid items like property taxes and homeowners insurance."
  },
  {
    question: "Should I choose a fixed-rate or adjustable-rate mortgage?",
    answer: "A fixed-rate mortgage offers consistent monthly payments throughout the loan term, providing stability and predictability. An adjustable-rate mortgage (ARM) typically starts with a lower rate that adjusts periodically based on market conditions. ARMs may be beneficial if you plan to sell or refinance before the adjustment period begins."
  },
  {
    question: "Can I pay off my mortgage early?",
    answer: "Yes, most modern mortgages allow early payoff without penalties. Paying extra toward your principal can save you significant money in interest over the life of the loan. Some strategies include making bi-weekly payments, adding extra to monthly payments, or making lump-sum payments when possible."
  },
  {
    question: "What documents do I need to apply for a mortgage?",
    answer: "Common documents include: recent pay stubs, W-2 forms from the past 2 years, federal tax returns from the past 2 years, bank statements from the past 2-3 months, proof of additional income or assets, identification documents, and information about existing debts and monthly obligations."
  },
  {
    question: "What is PMI and how can I avoid it?",
    answer: "Private Mortgage Insurance (PMI) is required on conventional loans when the down payment is less than 20% of the home's purchase price. PMI protects the lender in case of default. You can avoid PMI by making a 20% down payment, choosing a VA or USDA loan, or requesting PMI removal once you reach 20% equity in your home."
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-cta font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="border border-border rounded-lg overflow-hidden transition-all duration-200">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cta flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openIndex === index ? "500px" : "0",
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
