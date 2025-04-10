
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Plus, Trash2, Globe, FileQuestion, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface KnowledgeBaseEditorProps {
  knowledgeBase: {
    urls: string[];
    faqs: { question: string; answer: string }[];
    customPrompt: string;
  };
  updateKnowledgeBase: (knowledgeBase: {
    urls: string[];
    faqs: { question: string; answer: string }[];
    customPrompt: string;
  }) => void;
}

export const KnowledgeBaseEditor = ({
  knowledgeBase,
  updateKnowledgeBase,
}: KnowledgeBaseEditorProps) => {
  const { toast } = useToast();
  const [newUrl, setNewUrl] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [activeTab, setActiveTab] = useState("urls");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUrl = () => {
    if (!newUrl) return;

    const updatedUrls = [...knowledgeBase.urls, newUrl];
    updateKnowledgeBase({
      ...knowledgeBase,
      urls: updatedUrls,
    });
    setNewUrl("");
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    const updatedUrls = knowledgeBase.urls.filter((url) => url !== urlToRemove);
    updateKnowledgeBase({
      ...knowledgeBase,
      urls: updatedUrls,
    });
  };

  const handleAddFaq = () => {
    if (!newQuestion || !newAnswer) return;

    const updatedFaqs = [
      ...knowledgeBase.faqs,
      { question: newQuestion, answer: newAnswer },
    ];
    updateKnowledgeBase({
      ...knowledgeBase,
      faqs: updatedFaqs,
    });
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = knowledgeBase.faqs.filter((_, i) => i !== index);
    updateKnowledgeBase({
      ...knowledgeBase,
      faqs: updatedFaqs,
    });
  };

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateKnowledgeBase({
      ...knowledgeBase,
      customPrompt: e.target.value,
    });
  };

  const handleGenerateFaqs = async () => {
    if (knowledgeBase.urls.length === 0) {
      toast({
        title: "No URLs available",
        description: "Please add at least one URL to generate FAQs.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setIsLoading(true);
    
    // In a real app, this would call your backend API to scrape websites and generate FAQs
    setTimeout(() => {
      const mockFaqs = [
        {
          question: "What services do you offer?",
          answer: "We offer a comprehensive range of AI chatbot solutions, including sales bots, customer support bots, and fully customizable options tailored to your specific needs."
        },
        {
          question: "How long does it take to set up a chatbot?",
          answer: "Most customers can set up and deploy a basic chatbot in under 30 minutes using our intuitive platform. More advanced configurations may take a bit longer."
        },
        {
          question: "Do you support multiple languages?",
          answer: "Yes, our chatbots support a wide range of languages including English, Spanish, French, German, Chinese, Japanese, Russian, and Arabic."
        }
      ];
      
      updateKnowledgeBase({
        ...knowledgeBase,
        faqs: [...knowledgeBase.faqs, ...mockFaqs]
      });
      
      toast({
        title: "FAQs Generated",
        description: "Successfully generated 3 FAQs from your website content.",
      });
      
      setIsLoading(false);
      setActiveTab("faqs");
    }, 2000);
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Knowledge Base</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Feed your bot with the information it needs to answer questions effectively.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="urls" className="flex items-center gap-2">
            <Globe size={16} />
            <span>Website URLs</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <FileQuestion size={16} />
            <span>FAQs</span>
          </TabsTrigger>
          <TabsTrigger value="prompt" className="flex items-center gap-2">
            <Sparkles size={16} />
            <span>Custom Prompt</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="urls" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Website URLs</CardTitle>
              <CardDescription>
                Add URLs that contain information you want your bot to learn from. We'll scrape these pages for content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Input
                  placeholder="https://example.com/page"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddUrl} className="whitespace-nowrap">
                  <Plus size={16} className="mr-2" /> Add URL
                </Button>
              </div>

              {knowledgeBase.urls.length > 0 ? (
                <div className="space-y-2">
                  {knowledgeBase.urls.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md"
                    >
                      <span className="text-sm truncate flex-1">{url}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveUrl(url)}
                      >
                        <Trash2 size={16} className="text-gray-500 hover:text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No URLs added yet
                </div>
              )}

              {knowledgeBase.urls.length > 0 && (
                <div className="mt-6">
                  <Button 
                    onClick={handleGenerateFaqs} 
                    variant="outline"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Generating..." : "Generate FAQs from URLs"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Add question and answer pairs to train your bot. You can manually add FAQs or generate them from your website content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <Input
                  placeholder="Question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                <Textarea
                  placeholder="Answer"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddFaq} className="w-full">
                  <Plus size={16} className="mr-2" /> Add FAQ
                </Button>
              </div>

              {knowledgeBase.faqs.length > 0 ? (
                <div className="space-y-4">
                  {knowledgeBase.faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <p className="font-medium">{faq.question}</p>
                            <p className="text-sm text-gray-600">{faq.answer}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFaq(index)}
                          >
                            <Trash2 size={16} className="text-gray-500 hover:text-red-500" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No FAQs added yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompt" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Prompt</CardTitle>
              <CardDescription>
                Provide custom instructions to guide your bot's behavior and response style.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="You are a helpful assistant for [company name]. Always be polite and professional while helping customers..."
                value={knowledgeBase.customPrompt}
                onChange={handleCustomPromptChange}
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                This prompt will be used as the system message for the AI, guiding how it responds to queries.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
