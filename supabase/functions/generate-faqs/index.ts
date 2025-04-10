
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
    const { taskId, userId } = await req.json();
    
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    
    // Get the scraping task data
    const { data: taskData, error: taskError } = await supabaseClient
      .from('scraping_tasks')
      .select('*')
      .eq('id', taskId)
      .single();
    
    if (taskError) {
      throw new Error(`Error fetching task: ${taskError.message}`);
    }
    
    if (!taskData.raw_content) {
      throw new Error("No content available to generate FAQs from");
    }
    
    // This would use an OpenAI API call in production
    // For this demo, we'll simulate the AI with mock FAQs
    
    // Mock FAQs that could be generated from website content
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
      await supabaseClient
        .from('faqs')
        .insert({
          question: faq.question,
          answer: faq.answer,
          user_id: userId,
          source_url: taskData.url,
          scraping_task_id: taskId
        });
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Generated ${mockFaqs.length} FAQs from content`
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error in generate-faqs function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
