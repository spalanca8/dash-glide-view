
import React from "react";
import { Bot, User, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === "ai";
  
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-xl p-5 transition-all duration-300 mb-4",
        isAI 
          ? "bg-gradient-to-r from-primary/10 to-purple-100/30 border border-primary/20 shadow-sm" 
          : "bg-secondary/10 border border-secondary/20"
      )}
    >
      <div className={cn(
        "rounded-full p-2.5 w-11 h-11 flex items-center justify-center flex-shrink-0 shadow-sm",
        isAI 
          ? "gradient-purple-blue text-white" 
          : "bg-secondary text-secondary-foreground"
      )}>
        {isAI ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
      </div>
      
      <div className="flex-1">
        <div className="text-base font-semibold mb-2 flex items-center gap-2 text-foreground">
          {isAI ? (
            <span className="gradient-text">Analytics Assistant</span>
          ) : (
            "You"
          )}
          <span className="text-sm text-muted-foreground font-normal ml-2">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div className="text-base text-foreground/90 whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
        {isAI && (
          <div className="flex items-center gap-2 mt-2 text-sm text-primary/80">
            <Check className="h-4 w-4 text-primary" />
            <span>AI-generated response</span>
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
