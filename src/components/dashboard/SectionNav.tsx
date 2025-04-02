
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type Section = {
  id: string;
  title: string;
};

interface SectionNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function SectionNav({ sections, activeSection, onSectionChange }: SectionNavProps) {
  const currentIndex = sections.findIndex(s => s.id === activeSection);
  
  return (
    <div className="mb-6 overflow-auto">
      <div className="flex items-center justify-between min-w-max">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const isPassed = sections.findIndex(s => s.id === activeSection) > index;
          
          return (
            <div key={section.id} className="flex items-center">
              {/* Section button */}
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={cn(
                  "relative flex items-center gap-2 rounded-full z-10 transition-all",
                  isPassed && !isActive ? "border-primary text-primary hover:bg-primary/10" : ""
                )}
                onClick={() => onSectionChange(section.id)}
              >
                <span className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                  isActive ? "bg-white text-primary" : 
                  isPassed ? "bg-primary/10 text-primary" :
                  "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </span>
                <span>{section.title}</span>
              </Button>
              
              {/* Connecting line */}
              {index < sections.length - 1 && (
                <div className={cn(
                  "h-0.5 w-10 mx-1",
                  index < currentIndex ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
