import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const MortgageCalculator = () => {
  const [homeValue, setHomeValue] = useState(300000);
  const [downPayment, setDownPayment] = useState(121830);
  const [interestRate, setInterestRate] = useState(4.0);
  const [loanTerm, setLoanTerm] = useState(30);
  const [startMonth, setStartMonth] = useState("October");
  const [startYear, setStartYear] = useState(2025);
  const [propertyTax, setPropertyTax] = useState(2400);
  const [pmiRate, setPmiRate] = useState(1);
  const [homeInsurance, setHomeInsurance] = useState(1000);
  const [monthlyHOA, setMonthlyHOA] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const years = Array.from({ length: 31 }, (_, i) => 2020 + i);

  const results = useMemo(() => {
    const loanAmount = homeValue - downPayment;
    const downPaymentPercent = ((downPayment / homeValue) * 100).toFixed(2);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;

    let monthlyPrincipalInterest = 0;
    if (monthlyRate === 0) {
      monthlyPrincipalInterest = loanAmount / numPayments;
    } else {
      monthlyPrincipalInterest =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    // PMI calculation (PMI applies when down payment < 20%)
    const needsPMI = downPayment / homeValue < 0.2;
    const monthlyPMI = needsPMI ? (loanAmount * (pmiRate / 100)) / 12 : 0;

    // Calculate when PMI ends (when equity reaches 20%)
    let pmiPayments = 0;
    let totalPMIPaid = 0;
    if (needsPMI) {
      let balance = loanAmount;
      while (balance > homeValue * 0.8 && pmiPayments < numPayments) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPrincipalInterest - interestPayment;
        balance -= principalPayment;
        pmiPayments++;
        totalPMIPaid += monthlyPMI;
      }
    }

    const totalPaymentWithPMI = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyHOA + monthlyPMI;
    const totalPaymentAfterPMI = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyHOA;

    const totalInterestPaid = monthlyPrincipalInterest * numPayments - loanAmount;
    const totalTaxPaid = monthlyTax * numPayments;
    const totalInsurancePaid = monthlyInsurance * numPayments;
    const totalOfPayments = monthlyPrincipalInterest * numPayments + totalTaxPaid + totalInsurancePaid + totalPMIPaid + monthlyHOA * numPayments;

    // PMI end date
    const startMonthIndex = months.indexOf(startMonth);
    const pmiEndMonth = (startMonthIndex + pmiPayments) % 12;
    const pmiEndYear = startYear + Math.floor((startMonthIndex + pmiPayments) / 12);
    const payoffMonth = (startMonthIndex + numPayments) % 12;
    const payoffYear = startYear + Math.floor((startMonthIndex + numPayments) / 12);

    // Monthly payment breakdown for pie chart
    const principalPortion = monthlyPrincipalInterest - (loanAmount * monthlyRate);
    const interestPortion = loanAmount * monthlyRate;

    // Bi-weekly calculation
    const biWeeklyPayment = monthlyPrincipalInterest / 2;
    let biWeeklyBalance = loanAmount;
    let biWeeklyPayments = 0;
    let biWeeklyInterestTotal = 0;
    while (biWeeklyBalance > 0) {
      const biWeeklyRate = interestRate / 100 / 26;
      const interest = biWeeklyBalance * biWeeklyRate;
      const principal = biWeeklyPayment - interest;
      if (principal <= 0) break;
      biWeeklyBalance -= principal;
      biWeeklyInterestTotal += interest;
      biWeeklyPayments++;
      if (biWeeklyPayments > 1000) break;
    }
    const biWeeklyMonths = Math.round(biWeeklyPayments / 2.1667);
    const biWeeklyPayoffMonth = (startMonthIndex + biWeeklyMonths) % 12;
    const biWeeklyPayoffYear = startYear + Math.floor((startMonthIndex + biWeeklyMonths) / 12);

    return {
      loanAmount,
      downPaymentPercent,
      monthlyPaymentWithPMI: totalPaymentWithPMI,
      monthlyPaymentAfterPMI: totalPaymentAfterPMI,
      monthlyPMI,
      monthlyTax,
      monthlyInsurance,
      pmiEndDate: `${months[pmiEndMonth]?.slice(0, 3)} ${pmiEndYear}`,
      pmiPayments,
      totalPMIPaid,
      principalPortion: principalPortion > 0 ? principalPortion : 0,
      interestPortion,
      totalInterestPaid,
      totalTaxPaid,
      totalInsurancePaid,
      totalOfPayments,
      payoffDate: `${months[payoffMonth]?.slice(0, 3)} ${payoffYear}`,
      numPayments,
      biWeeklyPayment,
      biWeeklyPayoffDate: `${months[biWeeklyPayoffMonth]?.slice(0, 3)} ${biWeeklyPayoffYear}`,
      biWeeklyInterestTotal,
      interestSavings: totalInterestPaid - biWeeklyInterestTotal,
      needsPMI,
    };
  }, [homeValue, downPayment, interestRate, loanTerm, startMonth, startYear, propertyTax, pmiRate, homeInsurance, monthlyHOA]);

  const fmt = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(v);
  const fmtInt = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

  const chartData = [
    { name: "Principal", value: results.principalPortion, color: "#1e3a5f" },
    { name: "Interest", value: results.interestPortion, color: "#5ba3d9" },
    { name: "Tax", value: results.monthlyTax, color: "#a0d2f0" },
    { name: "HOA & Insurance", value: results.monthlyInsurance + monthlyHOA, color: "#d4eaf7" },
    { name: "Downpayment", value: 0, color: "#f0f0f0" },
  ].filter(d => d.value > 0);

  const inputClass = "bg-background border border-border rounded px-3 py-2 text-foreground text-right text-sm focus:outline-none focus:border-cta transition-colors w-full";
  const labelClass = "text-sm font-medium text-foreground min-w-[120px]";
  const sliderClass = "w-full mt-1 accent-destructive h-1";

  return (
    <section className="py-20 bg-muted" id="calculator">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Mortgage Calculator
          </h2>
          <p className="text-muted-foreground mt-2">See your total mortgage payments using the tool below.</p>
        </div>

        {/* Main calculator grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-6">
          {/* Left: Inputs */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="space-y-4">
              {/* Home Value */}
              <div className="flex items-center gap-3">
                <label className={labelClass}>Home Value:</label>
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">$</span>
                  <input type="number" value={homeValue} onChange={e => setHomeValue(Number(e.target.value))} className={inputClass} />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex items-center gap-3">
                  <label className={labelClass}>Down Payment:</label>
                  <div className="flex-1 flex items-center gap-1">
                    <span className="text-muted-foreground text-sm">$</span>
                    <input type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className={inputClass} />
                    <span className="text-muted-foreground text-xs whitespace-nowrap">{((downPayment/homeValue)*100).toFixed(2)} %</span>
                  </div>
                </div>
                <input type="range" min={0} max={homeValue} step={1000} value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className={sliderClass} />
              </div>

              {/* Loan Amount */}
              <div className="flex items-center gap-3">
                <label className={labelClass}>Loan Amount:</label>
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">$</span>
                  <input type="number" value={homeValue - downPayment} readOnly className={`${inputClass} bg-muted`} />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex items-center gap-3">
                  <label className={labelClass}>Interest Rate:</label>
                  <div className="flex-1 flex items-center gap-1">
                    <input type="number" value={interestRate} step={0.01} onChange={e => setInterestRate(Number(e.target.value))} className={inputClass} />
                    <span className="text-muted-foreground text-sm">%</span>
                  </div>
                </div>
                <input type="range" min={0.5} max={15} step={0.01} value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className={sliderClass} />
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex items-center gap-3">
                  <label className={labelClass}>Loan Term:</label>
                  <div className="flex-1 flex items-center gap-1">
                    <input type="number" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className={inputClass} />
                    <span className="text-muted-foreground text-sm">years</span>
                  </div>
                </div>
                <input type="range" min={5} max={50} step={1} value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className={sliderClass} />
              </div>

              {/* Start Date */}
              <div className="flex items-center gap-3">
                <label className={labelClass}>Start Date:</label>
                <div className="flex-1 flex gap-2">
                  <select value={startMonth} onChange={e => setStartMonth(e.target.value)} className={`${inputClass} text-left`}>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={startYear} onChange={e => setStartYear(Number(e.target.value))} className={`${inputClass} text-left w-24`}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Property Tax */}
              <div className="flex items-center gap-3">
                <label className={labelClass}>Property Tax:</label>
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">$</span>
                  <input type="number" value={propertyTax} onChange={e => setPropertyTax(Number(e.target.value))} className={inputClass} />
                  <span className="text-muted-foreground text-xs">$/year</span>
                </div>
              </div>

              {/* PMI */}
              <div>
                <div className="flex items-center gap-3">
                  <label className={labelClass}>PMI:</label>
                  <div className="flex-1 flex items-center gap-1">
                    <input type="number" value={pmiRate} step={0.1} onChange={e => setPmiRate(Number(e.target.value))} className={inputClass} />
                    <span className="text-muted-foreground text-sm">%</span>
                  </div>
                </div>
                <input type="range" min={0} max={5} step={0.1} value={pmiRate} onChange={e => setPmiRate(Number(e.target.value))} className={sliderClass} />
              </div>

              {/* Home Insurance */}
              <div className="flex items-center gap-3">
                <label className={labelClass}>Home Insurance:</label>
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">$</span>
                  <input type="number" value={homeInsurance} onChange={e => setHomeInsurance(Number(e.target.value))} className={inputClass} />
                  <span className="text-muted-foreground text-xs">$/year</span>
                </div>
              </div>

              {/* Monthly HOA */}
              <div className="flex items-center gap-3">
                <label className={labelClass}>Monthly HOA:</label>
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">$</span>
                  <input type="number" value={monthlyHOA} onChange={e => setMonthlyHOA(Number(e.target.value))} className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-3xl font-bold text-foreground">{fmt(results.monthlyPaymentWithPMI)}</h3>
            <p className="text-muted-foreground text-xs mt-1">Your estimated monthly payment with PMI.</p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">PMI:</span><span className="font-medium">{fmt(results.monthlyPMI)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monthly Tax Paid:</span><span className="font-medium">{fmt(results.monthlyTax)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monthly Home Insurance:</span><span className="font-medium">{fmt(results.monthlyInsurance)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">PMI End Date:</span><span className="font-medium">{results.needsPMI ? results.pmiEndDate : "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total PMI Payments:</span><span className="font-medium">{results.pmiPayments}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monthly Payment after PMI:</span><span className="font-medium">{fmt(results.monthlyPaymentAfterPMI)}</span></div>
            </div>

            {/* Donut chart + legend */}
            <div className="flex items-center gap-4 mt-6">
              <div className="text-xs space-y-1">
                {chartData.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />
                    <span className="text-muted-foreground">{d.name}</span>
                    <span className="font-medium ml-auto">{fmt(d.value)}</span>
                  </div>
                ))}
              </div>
              <div className="w-32 h-32 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" stroke="none">
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="mt-6 w-full border border-border rounded-lg py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {showAmortization ? "Hide" : "Show"} Amortization Table
            </button>
          </div>
        </div>

        {/* Amortization Table */}
        {showAmortization && (
          <div className="max-w-5xl mx-auto bg-card rounded-xl p-6 border border-border shadow-sm mb-6 overflow-x-auto">
            <h4 className="font-bold text-foreground mb-4">Amortization Schedule</h4>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 text-left">Month</th>
                  <th className="py-2 text-right">Payment</th>
                  <th className="py-2 text-right">Principal</th>
                  <th className="py-2 text-right">Interest</th>
                  <th className="py-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const rows = [];
                  let balance = results.loanAmount;
                  const monthlyRate = interestRate / 100 / 12;
                  const numPayments = loanTerm * 12;
                  const mp = monthlyRate === 0 ? balance / numPayments :
                    (balance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1);
                  for (let i = 1; i <= Math.min(numPayments, 360); i++) {
                    const interest = balance * monthlyRate;
                    const principal = mp - interest;
                    balance = Math.max(0, balance - principal);
                    if (i <= 12 || i % 12 === 0 || i === numPayments) {
                      rows.push(
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-1">{i}</td>
                          <td className="py-1 text-right">{fmt(mp)}</td>
                          <td className="py-1 text-right">{fmt(principal)}</td>
                          <td className="py-1 text-right">{fmt(interest)}</td>
                          <td className="py-1 text-right">{fmt(balance)}</td>
                        </tr>
                      );
                    }
                  }
                  return rows;
                })()}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
          {/* Mortgage Details */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h4 className="font-bold text-foreground flex items-center gap-2 mb-4">
              <span>🏠</span> Mortgage Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Loan Amount:</span><span className="font-medium">{fmt(results.loanAmount)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Down Payment:</span><span className="font-medium">{fmt(downPayment)} ({results.downPaymentPercent}%)</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Interest Paid:</span><span className="font-medium">{fmt(results.totalInterestPaid)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total PMI to {results.pmiEndDate}:</span><span className="font-medium">{fmt(results.totalPMIPaid)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Tax Paid:</span><span className="font-medium">{fmt(results.totalTaxPaid)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Home Insurance:</span><span className="font-medium">{fmt(results.totalInsurancePaid)}</span></div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between"><span className="text-muted-foreground">Total of {results.numPayments} Payments:</span><span className="font-bold">{fmt(results.totalOfPayments)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Loan pay-off date:</span><span className="font-medium">{results.payoffDate}</span></div>
            </div>
          </div>

          {/* Monthly vs Bi-Weekly */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h4 className="font-bold text-foreground flex items-center gap-2 mb-4">
              <span>💰</span> Monthly Vs Bi-Weekly Payment
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-lg font-bold text-foreground">{fmt(results.monthlyPaymentAfterPMI)}</p>
                <p className="text-xs text-muted-foreground">Monthly Payment</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{fmt(results.biWeeklyPayment)}</p>
                <p className="text-xs text-muted-foreground">Bi-weekly Payment</p>
              </div>
              <div>
                <p className="font-medium">{results.payoffDate}</p>
                <p className="text-xs text-muted-foreground">Pay-off Date</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{results.biWeeklyPayoffDate}</p>
                <p className="text-xs text-muted-foreground">Pay-off Date</p>
              </div>
              <div>
                <p className="font-bold text-foreground">{fmt(results.totalInterestPaid)}</p>
                <p className="text-xs text-muted-foreground">Total Interest Paid</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{fmt(results.biWeeklyInterestTotal)}</p>
                <p className="text-xs text-muted-foreground">Total Interest Paid</p>
              </div>
            </div>
            <div className="mt-4 text-center border-t border-border pt-3">
              <p className="text-sm text-muted-foreground">Total Interest Savings: <span className="font-bold text-foreground">{fmt(results.interestSavings)}</span></p>
            </div>
          </div>
        </div>

        {/* Apply Online */}
        <div className="text-center">
          <Button variant="cta" size="lg" className="rounded-full px-12 text-base">
            Apply Online
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
