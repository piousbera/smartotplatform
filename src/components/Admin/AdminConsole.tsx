
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIModelConnector } from "./AIModelConnector";
import { WebsiteScraper } from "./WebsiteScraper";
import { UserManagement } from "./UserManagement";
import { DeploymentSettings } from "./DeploymentSettings";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AdminConsole = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Console</h1>
          <p className="text-gray-600">
            Manage AI models, users, and deployment settings
          </p>
        </div>
        {user && (
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        )}
      </div>

      {!user ? (
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to access the admin features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLoginRedirect}>
              Sign In
            </Button>
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
