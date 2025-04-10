
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { ChatWidget } from "@/components/Chat/ChatWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";

type Chatbot = Database['public']['Tables']['chatbots']['Row'];

const ChatbotPreviewPage = () => {
  const { chatbotId } = useParams<{ chatbotId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (user && chatbotId) {
      fetchChatbot();
    }
  }, [user, chatbotId]);

  const fetchChatbot = async () => {
    if (!chatbotId) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('chatbots')
        .select('*')
        .eq('id', chatbotId)
        .single();

      if (error) throw error;
      setChatbot(data);
    } catch (error: any) {
      console.error('Error fetching chatbot:', error);
      toast({
        title: "Error",
        description: "Failed to load chatbot information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyEmbedCode = () => {
    if (!chatbotId) return;

    setIsCopying(true);
    const embedCode = `<div id="smart-bot-container"></div>
<script src="https://cdn.smartbot.ai/embed.js" data-bot-id="${chatbotId}"></script>`;

    navigator.clipboard.writeText(embedCode)
      .then(() => {
        toast({
          title: "Code copied",
          description: "Embed code has been copied to clipboard",
        });
      })
      .catch((error) => {
        console.error('Error copying code:', error);
        toast({
          title: "Copy failed",
          description: "Failed to copy the embed code",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsCopying(false);
      });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </MainLayout>
    );
  }

  if (!chatbot) {
    return (
      <MainLayout>
        <div className="container py-16">
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Not Found</CardTitle>
              <CardDescription>
                The chatbot you are looking for doesn't exist or you don't have permission to view it.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{chatbot.name}</h1>
          {chatbot.description && (
            <p className="text-gray-600">{chatbot.description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Chatbot Preview</h2>
            <ChatWidget 
              chatbotId={chatbotId}
              chatbotName={chatbot.name}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Embed on Your Website</CardTitle>
                <CardDescription>
                  Copy the code below to embed this chatbot on your website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4">
                  <code>{`<div id="smart-bot-container"></div>
<script src="https://cdn.smartbot.ai/embed.js" data-bot-id="${chatbotId}"></script>`}</code>
                </div>
                <Button 
                  onClick={handleCopyEmbedCode}
                  disabled={isCopying}
                  className="flex gap-2 items-center"
                >
                  {isCopying ? 
                    <Loader2 className="h-4 w-4 animate-spin" /> : 
                    <Code size={16} />
                  }
                  Copy Embed Code
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings & Analytics</CardTitle>
                <CardDescription>
                  Manage your chatbot and view performance metrics.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full flex gap-2 items-center">
                  Configure Chatbot
                </Button>
                <Button variant="outline" className="w-full flex gap-2 items-center">
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Learn more about customizing and implementing your chatbot.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://docs.smartbot.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  View Documentation <ExternalLink size={14} />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatbotPreviewPage;
