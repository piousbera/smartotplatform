
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ShoppingCart, Lightbulb } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: "sales" | "support" | "blank") => void;
}

export const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) => {
  const templates = [
    {
      id: "sales",
      name: "Sales AI",
      description: "Perfect for lead generation, product recommendations, and sales assistance.",
      icon: <ShoppingCart className="h-10 w-10 text-blue-500" />,
      features: ["Lead qualification", "Product recommendations", "Sales follow-ups", "Appointment scheduling"],
      popular: true,
    },
    {
      id: "support",
      name: "Support AI",
      description: "Designed for customer service, FAQs, and troubleshooting.",
      icon: <MessageSquare className="h-10 w-10 text-green-500" />,
      features: ["24/7 customer support", "FAQ automation", "Ticket creation", "Troubleshooting assistance"],
      popular: false,
    },
    {
      id: "blank",
      name: "Blank Template",
      description: "Start from scratch with full customization options.",
      icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
      features: ["Complete customization", "No pre-defined constraints", "Full control over bot behavior"],
      popular: false,
    },
  ];

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Choose a Starting Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a pre-configured template or start from scratch. You'll be able to customize everything later.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary ring-offset-2"
                : "hover:border-primary/50"
            }`}
            onClick={() => onSelectTemplate(template.id as "sales" | "support" | "blank")}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>{template.icon}</div>
                {template.popular && (
                  <Badge className="bg-accent">Popular</Badge>
                )}
              </div>

              <h3 className="text-xl font-semibold mt-4">{template.name}</h3>
              <p className="text-gray-600 text-sm mt-2 mb-4">
                {template.description}
              </p>

              <ul className="space-y-2">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
