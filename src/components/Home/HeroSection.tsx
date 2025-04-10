
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-heading">
                Create AI Chatbots in Minutes, Not Months
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                Build, customize, and deploy intelligent AI chatbots across your website and social media channels without coding or technical expertise.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link to="/create">Start Building</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates">Explore Templates</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center gap-1">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Trusted by 10,000+ businesses</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No coding required</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px]">
              <div 
                className="w-full aspect-square rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-1"
              >
                <div className="bg-white rounded-lg h-full w-full p-4 flex items-center justify-center">
                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-3 border-b pb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        AI
                      </div>
                      <div>
                        <h3 className="font-semibold">Sales Assistant</h3>
                        <p className="text-sm text-gray-500">Online</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="chat-bubble-bot max-w-[80%]">
                        <p>Hello! How can I help you with our products today?</p>
                      </div>
                      <div className="chat-bubble-user max-w-[80%] ml-auto">
                        <p>I'm looking for pricing information.</p>
                      </div>
                      <div className="chat-bubble-bot max-w-[80%]">
                        <p>I'd be happy to help with pricing! Our plans start at $29/month for the Basic tier. Would you like me to walk you through the different options?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -z-10 inset-0 blur-2xl opacity-20 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
