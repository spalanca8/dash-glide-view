
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, ArrowRight } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { SuggestionChip } from "./SuggestionChip";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

const sampleQueries = [
  "What are the top performing channels this month?",
  "How has the conversion rate changed over time?",
  "Where should I focus my marketing budget?",
  "What metrics are underperforming?",
  "Identify campaign anomalies",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      content: "Hello! I'm your analytics assistant. How can I help you understand your marketing data today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length,
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    setTimeout(() => {
      generateAIResponse(userMessage.content);
    }, 1000);
  };
  
  const generateAIResponse = (query: string) => {
    let aiResponse = "";
    
    if (query.toLowerCase().includes("top performing")) {
      aiResponse = "Based on the latest data, your top performing channel is Paid Search, which generated 42% of your total revenue this month. This is followed by Social Media (28%) and Email (18%).";
    } else if (query.toLowerCase().includes("conversion rate")) {
      aiResponse = "Your overall conversion rate has increased by 2.3% compared to last month. The most notable improvement was in the Mobile segment, where conversion rates went up by 3.7%.";
    } else if (query.toLowerCase().includes("budget")) {
      aiResponse = "Looking at your ROAS data, I recommend increasing budget allocation to Paid Search and Social Media campaigns, particularly those targeting the 25-34 age demographic which shows the highest conversion rates.";
    } else if (query.toLowerCase().includes("underperforming")) {
      aiResponse = "Your Display advertising campaigns are currently underperforming with a ROAS of 1.2, below your target of 2.0. Consider revising creative assets or targeting parameters for these campaigns.";
    } else if (query.toLowerCase().includes("anomalies")) {
      aiResponse = "I've detected an unusual spike in bounce rates (up 15%) for landing pages from your recent email campaign. This might indicate a mismatch between email messaging and landing page content.";
    } else {
      aiResponse = "I've analyzed your recent marketing performance data. Overall, your ROAS is 2.4 across all channels, with a 3.2% conversion rate. Your best-performing segments are the 25-34 age group in urban areas. Would you like more specific insights about any particular aspect of your marketing data?";
    }
    
    const aiMessage: Message = {
      id: messages.length + 1,
      role: "ai",
      content: aiResponse,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (query: string) => {
    setInput(query);
    
    setTimeout(() => {
      if (query) {
        sendMessage();
      }
    }, 300);
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] bg-gradient-to-br from-purple-50/70 to-blue-50/70 rounded-xl overflow-hidden">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-3 text-primary animate-pulse p-4 rounded-xl bg-primary/10 border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-base">AI is generating insights...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Suggestions */}
      <div className="px-6 py-4 border-t bg-white/40 backdrop-blur-sm">
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Suggested insights:
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {sampleQueries.map((query, index) => (
            <SuggestionChip 
              key={index} 
              query={query} 
              onClick={() => handleSuggestionClick(query)}
            />
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div className="border-t p-5 bg-white/60 backdrop-blur-sm">
        <div className="relative">
          <Textarea
            placeholder="Ask an intelligent question about your analytics..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            className="pr-14 resize-none border-primary/30 focus:border-primary/70 transition-colors shadow-sm bg-white/80 text-base"
          />
          <Button
            size="icon"
            className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90 text-white shadow-sm w-10 h-10"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Press Enter to send, Shift+Enter for a new line
        </div>
      </div>
    </div>
  );
}
