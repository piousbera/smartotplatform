
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Brain, Check, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type AIConnection = {
  id: string;
  provider: string;
  model: string;
  is_active: boolean;
  created_at: string;
};

export const AIModelConnector = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState("openai");
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connections, setConnections] = useState<AIConnection[]>([]);
  
  useEffect(() => {
    if (user) {
      fetchConnections();
    }
  }, [user]);

  const fetchConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_connections')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching AI connections:', error);
    }
  };
  
  const handleConnect = async () => {
    if (!selectedModel || !apiKey) {
      toast({
        title: "Missing information",
        description: "Please select an AI model and enter your API key.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use this feature.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Validate the API key format (this is just a basic check)
      if (selectedProvider === 'openai' && !apiKey.startsWith('sk-')) {
        throw new Error("Invalid OpenAI API key format. Keys should start with 'sk-'");
      }
      
      // Store the API connection in the database
      // Note: In a production environment, you'd encrypt the API key before storing it
      const { data, error } = await supabase
        .from('ai_connections')
        .insert({
          user_id: user.id,
          provider: selectedProvider,
          model: selectedModel,
          api_key_encrypted: apiKey, // In production, encrypt this value
          is_active: true
        })
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Connection successful",
        description: `Successfully connected to ${selectedModel} API.`,
        duration: 5000,
      });
      
      // Clear the form
      setApiKey("");
      
      // Refresh connections
      fetchConnections();
    } catch (error: any) {
      console.error('Error connecting to AI model:', error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to AI model.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from('ai_connections')
        .delete()
        .eq('id', connectionId);
        
      if (error) throw error;
      
      toast({
        title: "Disconnected",
        description: "Successfully removed the AI connection.",
      });
      
      // Refresh connections
      fetchConnections();
    } catch (error: any) {
      console.error('Error disconnecting AI model:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to disconnect the AI model.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Connect AI Models</h2>
      <p className="text-gray-600">
        Connect your preferred AI models to enhance your chatbot's capabilities. These models will be used for website scraping, FAQ generation, and response generation.
      </p>
      
      {/* Active Connections */}
      {connections.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Active Connections</CardTitle>
            <CardDescription>
              Your currently connected AI models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connections.map((connection) => (
                <div key={connection.id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium">{connection.provider.charAt(0).toUpperCase() + connection.provider.slice(1)} - {connection.model}</p>
                    <p className="text-sm text-gray-500">Connected on {new Date(connection.created_at).toLocaleDateString()}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDisconnect(connection.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Connect New Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain size={20} /> OpenAI
            </CardTitle>
            <CardDescription>
              Connect to GPT-4o or GPT-4o-mini for powerful language processing
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
              {isConnecting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect"
              )}
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
