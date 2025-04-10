
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIModelConnector } from "./AIModelConnector";
import { WebsiteScraper } from "./WebsiteScraper";
import { UserManagement } from "./UserManagement";
import { DeploymentSettings } from "./DeploymentSettings";
import { Lock } from "lucide-react";

export const AdminConsole = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Console</h1>
        <p className="text-gray-600">
          Manage AI models, users, and deployment settings
        </p>
      </div>

      {!isAuthenticated ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={20} /> Authentication Required
            </CardTitle>
            <CardDescription>
              Please connect your application to Supabase to enable authentication and admin features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-amber-800">
              <p className="font-medium">Connect to Supabase</p>
              <p className="text-sm mt-1">
                To use the admin console, you need to connect your application to Supabase for authentication and database services. Click the green Supabase button at the top right of the Lovable interface to set up the connection.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="ai-models">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="ai-models">AI Models</TabsTrigger>
            <TabsTrigger value="scraping">Website Scraping</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="deployment">Deployment Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-models">
            <AIModelConnector />
          </TabsContent>
          
          <TabsContent value="scraping">
            <WebsiteScraper />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="deployment">
            <DeploymentSettings />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
