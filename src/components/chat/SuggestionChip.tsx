
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SuggestionChipProps = {
  query: string;
  onClick: () => void;
};

export function SuggestionChip({ query, onClick }: SuggestionChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
        "bg-gradient-to-r from-primary/10 to-purple-200/30",
        "hover:from-primary/15 hover:to-purple-200/40",
        "text-primary transition-all border border-primary/20",
        "shadow-sm hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <span className="truncate max-w-[250px]">{query}</span>
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
