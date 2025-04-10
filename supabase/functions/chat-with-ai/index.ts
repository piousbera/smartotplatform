
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
    const { message, chatbotId, userId } = await req.json();
    
    if (!message) {
      throw new Error("No message provided");
    }
    
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    
    // Get active OpenAI API key
    const { data: connections, error: connectionsError } = await supabaseClient
      .from('ai_connections')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', 'openai')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (connectionsError) {
      throw new Error(`Error fetching AI connection: ${connectionsError.message}`);
    }
    
    if (!connections || connections.length === 0) {
      throw new Error("No active OpenAI connection found. Please add your API key first.");
    }
    
    const apiKey = connections[0].api_key_encrypted;
    
    // If we have a specific chatbot ID, get the chatbot's information
    let customPrompt = "You are a helpful AI assistant.";
    let knowledgeBase = null;
    
    if (chatbotId) {
      const { data: chatbot, error: chatbotError } = await supabaseClient
        .from('chatbots')
        .select('*')
        .eq('id', chatbotId)
        .single();
      
      if (chatbotError) {
        console.warn(`Error fetching chatbot: ${chatbotError.message}`);
      } else if (chatbot) {
        customPrompt = chatbot.custom_prompt || customPrompt;
        knowledgeBase = chatbot.knowledge_base;
      }
    }
    
    // Get all FAQs to use as context
    const { data: faqs, error: faqsError } = await supabaseClient
      .from('faqs')
      .select('*')
      .eq('user_id', userId);
    
    if (faqsError) {
      console.warn(`Error fetching FAQs: ${faqsError.message}`);
    }
    
    // Prepare context information
    let contextContent = "";
    
    if (faqs && faqs.length > 0) {
      contextContent += "Here are some frequently asked questions and answers to help guide your responses:\n\n";
      faqs.forEach((faq, index) => {
        contextContent += `Q: ${faq.question}\nA: ${faq.answer}\n\n`;
      });
    }
    
    if (knowledgeBase && knowledgeBase.faqs && knowledgeBase.faqs.length > 0) {
      if (!contextContent) {
        contextContent += "Here are some frequently asked questions and answers to help guide your responses:\n\n";
      }
      
      knowledgeBase.faqs.forEach((faq: { question: string, answer: string }) => {
        contextContent += `Q: ${faq.question}\nA: ${faq.answer}\n\n`;
      });
    }
    
    // For demo purposes, we'll just simulate an OpenAI API call
    // In production, we would actually call the OpenAI API
    
    // Prepare the final system prompt
    const systemPrompt = customPrompt + (contextContent ? `\n\nContext information:\n${contextContent}` : "");
    
    console.log("Using system prompt:", systemPrompt);
    console.log("User message:", message);
    
    // Simulate a response based on the message and FAQs
    let response = "I'm sorry, but I'm currently operating in demo mode. In production, I would process your request using the OpenAI API and respond accordingly.";
    
    if (message.toLowerCase().includes("service") || message.toLowerCase().includes("offer")) {
      response = "We offer comprehensive AI chatbot solutions, including sales bots, customer support bots, and customizable options tailored to your needs. Our platform is designed to help businesses automate customer interactions while maintaining a personalized touch.";
    } else if (message.toLowerCase().includes("setup") || message.toLowerCase().includes("create")) {
      response = "Setting up a chatbot is quick and easy! Most customers can deploy a basic chatbot in under 30 minutes using our intuitive platform. You start by selecting a template, customizing the appearance, adding your knowledge base, and connecting to your preferred AI model. Let me know if you need help with any specific part of this process!";
    } else if (message.toLowerCase().includes("language")) {
      response = "Yes, our chatbots support a wide range of languages including English, Spanish, French, German, Chinese, Japanese, Russian, and Arabic. This makes our solution perfect for businesses with international customers.";
    } else if (message.toLowerCase().includes("custom") || message.toLowerCase().includes("appear")) {
      response = "Absolutely! You can fully customize the appearance of your chatbot to match your brand identity. This includes colors, fonts, chat bubble style, bot avatar, and position on your website. The customization options are accessible through our easy-to-use visual editor.";
    } else if (message.toLowerCase().includes("analytic") || message.toLowerCase().includes("data") || message.toLowerCase().includes("report")) {
      response = "Our platform offers comprehensive analytics including conversation metrics, user satisfaction ratings, common queries, and conversion rates. You can view detailed reports on user interactions, popular topics, and bot performance. This data helps you continually optimize your chatbot's effectiveness.";
    }
    
    return new Response(
      JSON.stringify({ 
        message: response,
        systemPrompt: systemPrompt
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
