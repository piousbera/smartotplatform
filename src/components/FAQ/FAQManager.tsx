
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, Edit, Save, X, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  source_url: string | null;
  created_at: string;
};

export const FAQManager = ({ taskId }: { taskId?: string }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  
  useEffect(() => {
    if (user) {
      fetchFAQs();
    }
  }, [user, taskId]);

  const fetchFAQs = async () => {
    try {
      setIsLoading(true);
      
      let query = supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (taskId) {
        query = query.eq('scraping_task_id', taskId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: "Error",
        description: "Failed to load FAQs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  const handleSave = async (id: string) => {
    try {
      if (!editQuestion.trim() || !editAnswer.trim()) {
        toast({
          title: "Error",
          description: "Question and answer cannot be empty",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('faqs')
        .update({
          question: editQuestion,
          answer: editAnswer
        })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "FAQ updated",
        description: "The FAQ has been successfully updated.",
      });
      
      setEditingId(null);
      fetchFAQs();
    } catch (error: any) {
      console.error('Error updating FAQ:', error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update the FAQ.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "FAQ deleted",
        description: "The FAQ has been successfully deleted.",
      });
      
      fetchFAQs();
    } catch (error: any) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete the FAQ.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <p className="text-gray-600">
        Manage the questions and answers that your chatbot will use to respond to common queries.
      </p>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id}>
              <CardContent className="pt-6">
                {editingId === faq.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Question</label>
                      <Textarea
                        value={editQuestion}
                        onChange={(e) => setEditQuestion(e.target.value)}
                        className="mt-1"
                        placeholder="Enter question"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Answer</label>
                      <Textarea
                        value={editAnswer}
                        onChange={(e) => setEditAnswer(e.target.value)}
                        className="mt-1"
                        rows={4}
                        placeholder="Enter answer"
                      />
                    </div>
                    <div className="flex space-x-2 justify-end">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCancelEdit}
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleSave(faq.id)}
                      >
                        <Save size={16} className="mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{faq.question}</h3>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(faq)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(faq.id)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600">{faq.answer}</p>
                    {faq.source_url && (
                      <div className="text-xs text-gray-500">
                        Source: {faq.source_url}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-md bg-gray-50">
          <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No FAQs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Generate FAQs from scraped websites or add them manually.
          </p>
        </div>
      )}
    </div>
  );
};
