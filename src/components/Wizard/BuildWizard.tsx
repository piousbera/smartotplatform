
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TemplateSelector } from "./TemplateSelector";
import { BotInfoForm } from "./BotInfoForm";
import { KnowledgeBaseEditor } from "./KnowledgeBaseEditor";
import { WidgetCustomizer } from "./WidgetCustomizer";
import { DeploymentOptions } from "./DeploymentOptions";
import { Check, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WizardSteps } from "./WizardSteps";

type BotTemplate = "sales" | "support" | "blank";

export interface BotConfig {
  name: string;
  template: BotTemplate;
  industry: string;
  language: string;
  description: string;
  knowledgeBase: {
    urls: string[];
    faqs: { question: string; answer: string }[];
    customPrompt: string;
  };
  appearance: {
    primaryColor: string;
    fontFamily: string;
    iconName: string;
    position: "left" | "right";
  };
}

const defaultConfig: BotConfig = {
  name: "",
  template: "blank",
  industry: "",
  language: "english",
  description: "",
  knowledgeBase: {
    urls: [],
    faqs: [],
    customPrompt: "",
  },
  appearance: {
    primaryColor: "#2563eb",
    fontFamily: "Inter",
    iconName: "message-circle",
    position: "right",
  },
};

export const BuildWizard = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [botConfig, setBotConfig] = useState<BotConfig>(defaultConfig);

  const updateBotConfig = (updates: Partial<BotConfig>) => {
    setBotConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleComplete = () => {
    toast({
      title: "Deployment Complete!",
      description: "Your AI bot has been successfully created and is ready for use.",
    });
    // In a real application, this would save the configuration and redirect to a dashboard
  };

  return (
    <div className="container py-8">
      <WizardSteps currentStep={currentStep} />
      
      <Card className="mt-8">
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <TemplateSelector 
              selectedTemplate={botConfig.template}
              onSelectTemplate={(template) => updateBotConfig({ template })}
            />
          )}
          
          {currentStep === 2 && (
            <BotInfoForm 
              botConfig={botConfig}
              updateBotConfig={updateBotConfig}
            />
          )}
          
          {currentStep === 3 && (
            <KnowledgeBaseEditor 
              knowledgeBase={botConfig.knowledgeBase}
              updateKnowledgeBase={(knowledgeBase) => updateBotConfig({ knowledgeBase })}
            />
          )}
          
          {currentStep === 4 && (
            <WidgetCustomizer 
              appearance={botConfig.appearance}
              updateAppearance={(appearance) => updateBotConfig({ appearance })}
            />
          )}
          
          {currentStep === 5 && (
            <DeploymentOptions 
              botConfig={botConfig}
            />
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            {currentStep < 5 ? (
              <Button onClick={handleNext}>
                Continue <ChevronRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button onClick={handleComplete}>
                Complete Setup <Check size={16} className="ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
