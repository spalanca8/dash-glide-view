
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent/30">
      <div className="text-center max-w-md p-8 glass rounded-2xl animate-fade-in">
        <div className="mb-6">
          <h1 className="text-7xl font-bold text-primary mb-2">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            The page you're looking for cannot be found.
          </p>
        </div>
        
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
