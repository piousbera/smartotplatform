
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Brain, Check, ExternalLink } from "lucide-react";

export const AIModelConnector = () => {
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = () => {
    if (!selectedModel || !apiKey) {
      toast({
        title: "Missing information",
        description: "Please select an AI model and enter your API key.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      toast({
        title: "Connection successful",
        description: `Successfully connected to ${selectedModel} API.`,
        duration: 5000,
      });
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Connect AI Models</h2>
      <p className="text-gray-600">
        Connect your preferred AI models to enhance your chatbot's capabilities. These models will be used for website scraping, FAQ generation, and response generation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain size={20} /> OpenAI
            </CardTitle>
            <CardDescription>
              Connect to GPT-4o or GPT-4.5 for powerful language processing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Select Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select OpenAI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">API Key</label>
              <Input 
                type="password" 
                placeholder="Enter your OpenAI API key" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                  Get your API key <ExternalLink size={12} />
                </a>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain size={20} /> Anthropic
            </CardTitle>
            <CardDescription>
              Connect to Claude 3 for advanced language capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Select Model</label>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Coming soon..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                  <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">API Key</label>
              <Input 
                type="password" 
                placeholder="Enter your Anthropic API key" 
                disabled
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">Coming Soon</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain size={20} /> Custom Model
            </CardTitle>
            <CardDescription>
              Connect to your own custom AI model
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">API Endpoint</label>
              <Input placeholder="https://api.your-model.com/v1/chat/completions" disabled />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">API Key</label>
              <Input type="password" placeholder="Enter your API key" disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">Coming Soon</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
