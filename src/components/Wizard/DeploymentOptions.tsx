
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { CopyButton } from "../ui/copy-button";
import { CheckCircle2, Globe, Instagram, Facebook } from "lucide-react";
import { BotConfig } from "./BuildWizard";
import { useToast } from "@/components/ui/use-toast";

interface DeploymentOptionsProps {
  botConfig: BotConfig;
}

export const DeploymentOptions = ({
  botConfig,
}: DeploymentOptionsProps) => {
  const { toast } = useToast();
  const [deployedPlatforms, setDeployedPlatforms] = useState<string[]>([]);

  const handleDeploy = (platform: string) => {
    // Simulate deployment
    toast({
      title: "Deployment in Progress",
      description: `Deploying to ${platform}...`,
    });
    
    setTimeout(() => {
      setDeployedPlatforms((prev) => [...prev, platform]);
      toast({
        title: "Deployment Successful",
        description: `Your bot has been deployed to ${platform}!`,
      });
    }, 1500);
  };

  const generateWebsiteCode = () => {
    return `<!-- AIBuildify Chat Widget -->
<script>
  window.aibuilderConfig = {
    botId: "AI${Math.random().toString(36).substring(2, 10)}",
    primaryColor: "${botConfig.appearance.primaryColor}",
    position: "${botConfig.appearance.position}",
    fontFamily: "${botConfig.appearance.fontFamily}"
  };
</script>
<script src="https://cdn.aibuildify.com/widget.js" async></script>`;
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Deploy Your AI Bot</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose where to deploy your AI assistant. You can always add more platforms later.
        </p>
      </div>

      <Tabs defaultValue="website">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe size={16} />
            <span>Website</span>
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram size={16} />
            <span>Instagram</span>
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-2">
            <Facebook size={16} />
            <span>Facebook</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="website" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Integration</CardTitle>
              <CardDescription>
                Add this code snippet to your website to deploy your chat widget.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-auto text-sm font-mono">
                <pre>{generateWebsiteCode()}</pre>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Add this code just before the closing <code>&lt;/body&gt;</code> tag
              </p>
              <CopyButton value={generateWebsiteCode()} />
            </CardFooter>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Deployment</CardTitle>
                <CardDescription>
                  Enter a test URL to try out your bot on a sample page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input 
                    placeholder="https://example.com" 
                    defaultValue="https://example.com"
                  />
                  <Button className="whitespace-nowrap">
                    Open Test Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="instagram" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Instagram Integration</CardTitle>
              <CardDescription>
                Connect your Instagram business account to deploy your AI bot.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <h4 className="text-lg font-medium">Step 1: Connect Account</h4>
                <p className="text-gray-600 mb-4">
                  Link your Instagram Business account to enable AI responses in your DMs.
                </p>
                <Button 
                  onClick={() => handleDeploy("Instagram")}
                  disabled={deployedPlatforms.includes("Instagram")}
                >
                  {deployedPlatforms.includes("Instagram") ? (
                    <>
                      <CheckCircle2 size={16} className="mr-2" />
                      Connected
                    </>
                  ) : (
                    "Connect Instagram"
                  )}
                </Button>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="text-lg font-medium">Step 2: Configure Message Automation</h4>
                <p className="text-gray-600 mb-4">
                  Choose how your AI bot handles messages and which types of queries it responds to.
                </p>
                <Button variant="outline" disabled={!deployedPlatforms.includes("Instagram")}>
                  Configure Settings
                </Button>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="text-lg font-medium">Step 3: Test Your Bot</h4>
                <p className="text-gray-600 mb-4">
                  Send a test message to ensure your bot is working correctly.
                </p>
                <Button variant="outline" disabled={!deployedPlatforms.includes("Instagram")}>
                  Send Test Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facebook" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Facebook Messenger Integration</CardTitle>
              <CardDescription>
                Connect your Facebook page to deploy your AI bot to Messenger.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <h4 className="text-lg font-medium">Step 1: Connect Facebook Page</h4>
                <p className="text-gray-600 mb-4">
                  Link your Facebook Business page to enable AI responses in Messenger.
                </p>
                <Button 
                  onClick={() => handleDeploy("Facebook")}
                  disabled={deployedPlatforms.includes("Facebook")}
                >
                  {deployedPlatforms.includes("Facebook") ? (
                    <>
                      <CheckCircle2 size={16} className="mr-2" />
                      Connected
                    </>
                  ) : (
                    "Connect Facebook Page"
                  )}
                </Button>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="text-lg font-medium">Step 2: Configure Messenger Settings</h4>
                <p className="text-gray-600 mb-4">
                  Set up automatic responses, welcome messages, and AI behavior.
                </p>
                <Button variant="outline" disabled={!deployedPlatforms.includes("Facebook")}>
                  Configure Settings
                </Button>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="text-lg font-medium">Step 3: Test Your Bot</h4>
                <p className="text-gray-600 mb-4">
                  Send a test message to ensure your bot is working correctly.
                </p>
                <Button variant="outline" disabled={!deployedPlatforms.includes("Facebook")}>
                  Send Test Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
