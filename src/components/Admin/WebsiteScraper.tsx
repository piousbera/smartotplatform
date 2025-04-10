
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Loader2 } from "lucide-react";

export const WebsiteScraper = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapedPages, setScrapedPages] = useState<string[]>([]);
  
  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a website URL to scrape.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    
    // Simulate the scraping process
    const mockPages = [
      "/home",
      "/about",
      "/features",
      "/pricing",
      "/contact",
    ];
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);
      
      const pageIndex = Math.floor(currentProgress / 20) - 1;
      if (pageIndex >= 0 && pageIndex < mockPages.length) {
        setScrapedPages(prev => [...prev, `${url}${mockPages[pageIndex]}`]);
      }
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        toast({
          title: "Scraping completed",
          description: `Successfully scraped ${mockPages.length} pages from ${url}`,
        });
      }
    }, 1000);
  };
  
  const handleGenerateFAQs = () => {
    if (scrapedPages.length === 0) {
      toast({
        title: "No content scraped",
        description: "Please scrape a website before generating FAQs.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Generating FAQs",
      description: "AI is analyzing scraped content to generate FAQs.",
    });
    
    // This would connect to your AI model to process the scraped content
    setTimeout(() => {
      toast({
        title: "FAQs Generated",
        description: "5 FAQs have been generated from the scraped content.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Website Scraper</h2>
      <p className="text-gray-600">
        Scrape content from websites to build your chatbot's knowledge base. The scraped content can be used to generate FAQs and train your AI model.
      </p>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleScrape} className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-gray-400" />
              <Input
                placeholder="Enter website URL (e.g. https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  "Scrape Website"
                )}
              </Button>
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Scraping in progress...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
            
            {scrapedPages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Scraped Pages ({scrapedPages.length})</h3>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <ul className="divide-y">
                    {scrapedPages.map((page, index) => (
                      <li key={index} className="px-3 py-2 text-sm hover:bg-gray-50">
                        {page}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4">
                  <Button onClick={handleGenerateFAQs} variant="outline">
                    Generate FAQs from Scraped Content
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
