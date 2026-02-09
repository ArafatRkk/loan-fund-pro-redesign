import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PersonalizedSection from "@/components/PersonalizedSection";
import HomeLoanProcess from "@/components/HomeLoanProcess";
import ClientReviews from "@/components/ClientReviews";
import MortgagePrograms from "@/components/MortgagePrograms";
import FAQSection from "@/components/FAQSection";
import MortgageCalculator from "@/components/MortgageCalculator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PersonalizedSection />
      <HomeLoanProcess />
      <ClientReviews />
      <MortgagePrograms />
      <FAQSection />
      <MortgageCalculator />
      <Footer />
    </div>
  );
};

export default Index;
