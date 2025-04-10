
import { CheckCircle2 } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Choose a template",
      description: "Select from pre-built AI templates designed for sales, customer support, or start with a blank canvas.",
    },
    {
      number: "02",
      title: "Train with your content",
      description: "Import knowledge from your website, FAQs, or create custom prompts to train your AI assistant.",
    },
    {
      number: "03",
      title: "Customize appearance",
      description: "Design your chat widget with custom colors, fonts, and placement to match your brand identity.",
    },
    {
      number: "04",
      title: "Deploy everywhere",
      description: "Integrate your AI assistant across your website and social media platforms with a few simple clicks.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Create and deploy your custom AI assistant in just four simple steps. No coding required.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-primary/5 rounded-xl p-8 h-full">
                <div className="text-4xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2">
                  <CheckCircle2 className="text-primary h-10 w-10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
