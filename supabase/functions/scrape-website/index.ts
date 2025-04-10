
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, taskId, userId } = await req.json();
    
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    
    // This would be a real web scraping implementation
    // For this demo, we'll simulate scraping with mock data
    
    // Update task status to in_progress
    await supabaseClient
      .from('scraping_tasks')
      .update({ 
        status: 'in_progress',
        total_pages: 5 // We're simulating 5 pages
      })
      .eq('id', taskId);
    
    // Mock pages to scrape
    const mockPages = [
      { path: "/home", title: "Home" },
      { path: "/about", title: "About Us" },
      { path: "/features", title: "Features" },
      { path: "/pricing", title: "Pricing" },
      { path: "/contact", title: "Contact" },
    ];
    
    const mockContent = {
      pages: {} as Record<string, {title: string, content: string}>
    };
    
    // Simulate scraping each page
    for (let i = 0; i < mockPages.length; i++) {
      const page = mockPages[i];
      
      // Simulate page content
      mockContent.pages[page.path] = {
        title: page.title,
        content: `This is sample content for the ${page.title} page. It contains information about the website and its features.`
      };
      
      // Update the scraping task progress
      await supabaseClient
        .from('scraping_tasks')
        .update({ 
          completed_pages: i + 1,
          raw_content: mockContent
        })
        .eq('id', taskId);
      
      // Add a small delay to simulate scraping time
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Complete the task
    await supabaseClient
      .from('scraping_tasks')
      .update({ 
        status: 'completed',
        completed_pages: mockPages.length
      })
      .eq('id', taskId);
    
    return new Response(
      JSON.stringify({ success: true, message: "Scraping completed successfully" }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error in scrape-website function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
