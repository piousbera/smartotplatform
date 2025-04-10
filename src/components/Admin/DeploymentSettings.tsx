
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Facebook, Instagram, Globe, Code } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const DeploymentSettings = () => {
  const { toast } = useToast();
  const [websiteDomain, setWebsiteDomain] = useState("");
  const [facebookPage, setFacebookPage] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  
  const [autoReply, setAutoReply] = useState(true);
  const [collectUserData, setCollectUserData] = useState(true);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(websiteIntegrationCode);
    toast({
      title: "Code copied!",
      description: "Integration code has been copied to clipboard.",
      duration: 3000,
    });
  };
  
  const websiteIntegrationCode = `
<!-- AIBuildify Chat Widget -->
<script>
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://app.aibuildify.com/widget.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'aibuildify-widget'));

  window.AIBuildifyConfig = {
    botId: "YOUR_BOT_ID",
    primaryColor: "#2563eb",
    position: "right"
  };
</script>
  `.trim();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Deployment Settings</h2>
      <p className="text-gray-600">
        Configure how and where your chatbot is deployed.
      </p>
      
      <Tabs defaultValue="website">
        <TabsList>
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe size={16} />
            <span>Website</span>
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-2">
            <Facebook size={16} />
            <span>Facebook</span>
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram size={16} />
            <span>Instagram</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="website" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Website Domain (optional)
                  </label>
                  <Input 
                    placeholder="example.com" 
                    value={websiteDomain}
                    onChange={(e) => setWebsiteDomain(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Entering your domain helps us track analytics for your site
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Integration Code</label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCopyCode}
                      className="flex items-center gap-2"
                    >
                      <Copy size={14} />
                      <span>Copy</span>
                    </Button>
                  </div>
                  
                  <pre className="mt-2 p-4 bg-gray-50 rounded-md text-xs overflow-x-auto">
                    <code>{websiteIntegrationCode}</code>
                  </pre>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-medium text-blue-700 mb-2">Integration Instructions</h3>
                  <ol className="text-sm text-blue-600 space-y-1 list-decimal list-inside">
                    <li>Copy the code above</li>
                    <li>Paste it before the closing &lt;/body&gt; tag on your website</li>
                    <li>Replace "YOUR_BOT_ID" with your actual bot ID</li>
                    <li>Customize the primaryColor to match your brand</li>
                    <li>Set position to "left" or "right" based on your preference</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="facebook" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Facebook Messenger Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Facebook Page Name/ID
                  </label>
                  <Input 
                    placeholder="your-business-page" 
                    value={facebookPage}
                    onChange={(e) => setFacebookPage(e.target.value)}
                  />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md">
                  <h3 className="font-medium text-amber-700 mb-2">Coming Soon</h3>
                  <p className="text-sm text-amber-600">
                    Facebook Messenger integration is coming soon. Please check back later for updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="instagram" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Instagram DM Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Instagram Handle
                  </label>
                  <Input 
                    placeholder="@yourbusiness" 
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                  />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-md">
                  <h3 className="font-medium text-amber-700 mb-2">Coming Soon</h3>
                  <p className="text-sm text-amber-600">
                    Instagram DM integration is coming soon. Please check back later for updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Auto-Reply</h3>
                <p className="text-xs text-gray-500">Enable automatic responses to user messages</p>
              </div>
              <Switch 
                checked={autoReply} 
                onCheckedChange={setAutoReply} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Collect User Data</h3>
                <p className="text-xs text-gray-500">Collect conversation data for training and analytics</p>
              </div>
              <Switch 
                checked={collectUserData} 
                onCheckedChange={setCollectUserData} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
