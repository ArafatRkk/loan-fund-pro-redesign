import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "First-Time Homebuyer",
    text: "LoanFunder Pro made my first home purchase an amazing experience. They walked me through every step and found me the best rate possible. I couldn't be happier!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Refinance Client",
    text: "I refinanced my mortgage with LoanFunder Pro and saved hundreds per month. The process was seamless and their team was incredibly responsive and professional.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Investment Property Owner",
    text: "Working with LoanFunder Pro for my investment property loan was the best decision. Their expertise in various loan programs is outstanding. Highly recommend!",
    rating: 5,
  },
];

const ClientReviews = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-cta font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-cta text-cta" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                  <span className="text-teal font-bold text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
