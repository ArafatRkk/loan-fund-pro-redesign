import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Calendar, TrendingUp } from "lucide-react";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const results = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = principal / numPayments;
      return {
        monthlyPayment,
        totalPayment: principal,
        totalInterest: 0,
        principal,
      };
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    return { monthlyPayment, totalPayment, totalInterest, principal };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const cards = [
    {
      icon: DollarSign,
      label: "Monthly Payment",
      value: formatCurrency(results.monthlyPayment),
      color: "bg-cta/10 text-cta",
    },
    {
      icon: TrendingUp,
      label: "Loan Amount",
      value: formatCurrency(results.principal),
      color: "bg-teal/10 text-teal",
    },
    {
      icon: Percent,
      label: "Total Interest",
      value: formatCurrency(results.totalInterest),
      color: "bg-destructive/10 text-destructive",
    },
    {
      icon: Calendar,
      label: "Total Payment",
      value: formatCurrency(results.totalPayment),
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section className="py-20 bg-section-dark text-primary-foreground" id="calculator">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-cta font-semibold text-sm uppercase tracking-widest">Tools</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3">
            Mortgage Calculator
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-primary-foreground/5 backdrop-blur rounded-2xl p-8 md:p-12 border border-primary-foreground/10">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-sm font-medium text-primary-foreground/70 mb-2">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/50">$</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 pl-8 text-primary-foreground focus:outline-none focus:border-cta transition-colors"
                />
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="5000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full mt-2 accent-cta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-foreground/70 mb-2">
                Down Payment
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/50">$</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 pl-8 text-primary-foreground focus:outline-none focus:border-cta transition-colors"
                />
              </div>
              <input
                type="range"
                min="0"
                max={homePrice}
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full mt-2 accent-cta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-foreground/70 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                step="0.1"
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 text-primary-foreground focus:outline-none focus:border-cta transition-colors"
              />
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full mt-2 accent-cta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-foreground/70 mb-2">
                Loan Term (Years)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 text-primary-foreground focus:outline-none focus:border-cta transition-colors"
              >
                <option value={10} className="bg-primary">10 Years</option>
                <option value={15} className="bg-primary">15 Years</option>
                <option value={20} className="bg-primary">20 Years</option>
                <option value={30} className="bg-primary">30 Years</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {cards.map((card) => (
              <div
                key={card.label}
                className="bg-primary-foreground/5 rounded-xl p-5 border border-primary-foreground/10 text-center hover:border-cta/30 transition-all duration-200"
              >
                <div className={`w-10 h-10 mx-auto rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <p className="text-primary-foreground/60 text-xs mb-1">{card.label}</p>
                <p className="text-xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg" className="rounded-full px-12">
              Apply Online
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
