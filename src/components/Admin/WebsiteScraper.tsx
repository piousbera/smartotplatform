
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ScrapingTask = {
  id: string;
  url: string;
  status: string;
  completed_pages: number;
  total_pages: number;
  created_at: string;
};

export const WebsiteScraper = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapingTasks, setScrapingTasks] = useState<ScrapingTask[]>([]);
  const [isGeneratingFAQs, setIsGeneratingFAQs] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) {
      fetchScrapingTasks();
    }
  }, [user]);

  const fetchScrapingTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('scraping_tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setScrapingTasks(data || []);
    } catch (error) {
      console.error('Error fetching scraping tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load scraping tasks",
        variant: "destructive",
      });
    }
  };

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
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use this feature.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    
    // Start a new scraping task in the database
    try {
      const { data, error } = await supabase
        .from('scraping_tasks')
        .insert({
          url,
          user_id: user.id,
          status: 'in_progress',
          total_pages: 5 // We're simulating 5 pages
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const taskId = data.id;
      
      // Simulate the scraping process
      const mockPages = [
        "/home",
        "/about",
        "/features",
        "/pricing",
        "/contact",
      ];
      
      const mockContent = {
        pages: {} as Record<string, {title: string, content: string}>
      };
      
      for (let i = 0; i < mockPages.length; i++) {
        // Update progress
        const completedPages = i + 1;
        setProgress((completedPages / mockPages.length) * 100);
        
        // Simulate page content
        const pagePath = mockPages[i];
        mockContent.pages[pagePath] = {
          title: pagePath.substring(1).charAt(0).toUpperCase() + pagePath.substring(2),
          content: `This is sample content for the ${pagePath} page. It contains information about the website and its features.`
        };
        
        // Update the scraping task in the database
        await supabase
          .from('scraping_tasks')
          .update({ 
            completed_pages: completedPages,
            raw_content: mockContent
          })
          .eq('id', taskId);
        
        // Add a small delay to simulate scraping time
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Complete the task
      await supabase
        .from('scraping_tasks')
        .update({ 
          status: 'completed',
          completed_pages: mockPages.length
        })
        .eq('id', taskId);
      
      toast({
        title: "Scraping completed",
        description: `Successfully scraped ${mockPages.length} pages from ${url}`,
      });
      
      // Refresh the tasks list
      fetchScrapingTasks();
    } catch (error: any) {
      console.error('Error during scraping:', error);
      toast({
        title: "Scraping failed",
        description: error.message || "An error occurred during scraping.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateFAQs = async (taskId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use this feature.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingFAQs(true);
    setSelectedTaskId(taskId);
    
    try {
      // First, get the scraping task to access its raw content
      const { data: taskData, error: taskError } = await supabase
        .from('scraping_tasks')
        .select('*')
        .eq('id', taskId)
        .single();
      
      if (taskError) throw taskError;
      
      if (!taskData.raw_content) {
        throw new Error("No content available to generate FAQs from");
      }
      
      // Simulate AI processing to generate FAQs
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
        },
        {
          question: "Can I customize the appearance of my chatbot?",
          answer: "Absolutely! You can customize the colors, fonts, and overall appearance of your chatbot to match your brand identity."
        },
        {
          question: "What kind of analytics do you provide?",
          answer: "Our platform offers comprehensive analytics including conversation metrics, user satisfaction ratings, common queries, and conversion rates to help you optimize your chatbot's performance."
        }
      ];
      
      // Add each FAQ to the database
      for (const faq of mockFaqs) {
        await supabase
          .from('faqs')
          .insert({
            question: faq.question,
            answer: faq.answer,
            user_id: user.id,
            source_url: taskData.url,
            scraping_task_id: taskId
          });
      }
      
      toast({
        title: "FAQs Generated",
        description: `Successfully generated ${mockFaqs.length} FAQs from the scraped content.`,
      });
    } catch (error: any) {
      console.error('Error generating FAQs:', error);
      toast({
        title: "FAQ generation failed",
        description: error.message || "An error occurred while generating FAQs.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingFAQs(false);
      setSelectedTaskId(null);
    }
  };

  const viewFAQs = async (taskId: string) => {
    // This would navigate to a page showing FAQs generated from this task
    toast({
      title: "View FAQs",
      description: "This would navigate to a page showing all FAQs generated from this scraping task.",
    });
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
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Scraping History</h3>
        
        {scrapingTasks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scrapingTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="max-w-[200px] truncate">{task.url}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : task.status === 'in_progress' 
                        ? 'bg-blue-100 text-blue-800'
                        : task.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{task.completed_pages} / {task.total_pages}</span>
                  </TableCell>
                  <TableCell>{new Date(task.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleGenerateFAQs(task.id)}
                        disabled={task.status !== 'completed' || (isGeneratingFAQs && selectedTaskId === task.id)}
                      >
                        {isGeneratingFAQs && selectedTaskId === task.id ? (
                          <>
                            <Loader2 size={14} className="mr-1 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate FAQs"
                        )}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => viewFAQs(task.id)}
                      >
                        View FAQs
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 border rounded-md bg-gray-50">
            <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No scraping tasks</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by scraping a website using the form above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
