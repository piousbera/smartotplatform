
import { 
  Globe, 
  MessageSquare, 
  Zap, 
  Palette, 
  Code, 
  BarChart3 
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Template Library",
      description: "Start with pre-built templates for sales, support, or build from scratch.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Knowledge Base Builder",
      description: "Automatically extract content from your website to train your AI assistant.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Multi-Platform Integration",
      description: "Deploy your AI across your website, Instagram, and Facebook Messenger.",
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "Visual Customization",
      description: "Fully customize the appearance of your chatbot to match your brand.",
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "One-Click Deployment",
      description: "Deploy your chatbot with a simple code snippet or platform connection.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Analytics Dashboard",
      description: "Track performance and user interactions across all platforms.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Powerful Features, Simple Interface</h2>
          <p className="text-gray-600">
            Everything you need to create, customize, and deploy AI chatbots that delight your customers and boost your business.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
