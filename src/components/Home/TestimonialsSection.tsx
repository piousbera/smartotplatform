
export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "We deployed an AI sales assistant on our website and saw a 35% increase in qualified leads within the first month. The setup was surprisingly easy.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechSolutions Inc.",
    },
    {
      quote: "Customer support inquiries decreased by 42% after implementing our AI assistant. It handles common questions perfectly, freeing our team to focus on complex issues.",
      author: "Michael Chen",
      role: "Customer Success Manager",
      company: "Retail Dynamics",
    },
    {
      quote: "The multi-platform integration is a game-changer. Our customers can now get instant support whether they're on our website, Instagram, or Facebook.",
      author: "Emily Rodriguez",
      role: "Digital Strategy Lead",
      company: "Horizon Media",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">
            Join thousands of businesses that have transformed their customer engagement with our AI platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="text-4xl text-primary mb-4">"</div>
              <p className="text-gray-600 flex-1 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
