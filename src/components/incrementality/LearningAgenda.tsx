
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { Building, Briefcase, Users } from "lucide-react";

interface LearningAgendaProps {
  test: ABTest;
}

export function LearningAgenda({ test }: LearningAgendaProps) {
  // Generate learning agenda data based on the test id or name
  // This could be fetched from an API in a real application
  const getTeamData = () => {
    if (test.name.toLowerCase().includes("homepage") || test.name.toLowerCase().includes("cta")) {
      return {
        team: "Brand Marketing",
        description: "The Brand Marketing team proposed this test to understand how different messaging approaches impact customer engagement and conversion rates on the homepage.",
        teamMembers: ["Sarah Johnson (Brand Director)", "Alex Chen (Web UX Lead)", "Miguel Rodriguez (Analytics Manager)"]
      };
    } else if (test.name.toLowerCase().includes("social") || test.name.toLowerCase().includes("ad")) {
      return {
        team: "Performance Marketing",
        description: "The Performance Marketing team initiated this test to optimize ad spend allocation and creative strategy across social media channels.",
        teamMembers: ["David Kim (Performance Director)", "Priya Patel (Social Media Manager)", "Thomas Lee (Creatives Lead)"]
      };
    } else if (test.name.toLowerCase().includes("email") || test.name.toLowerCase().includes("subject")) {
      return {
        team: "CRM Team",
        description: "The CRM team designed this test to improve email engagement metrics and identify the most effective communication strategies for our customer base.",
        teamMembers: ["Emma Wilson (CRM Director)", "James Taylor (Email Marketing Manager)", "Lisa Zhang (Customer Insights Analyst)"]
      };
    } else {
      return {
        team: "Marketing Innovation",
        description: "The Marketing Innovation team initiated this test as part of our quarterly experimentation roadmap to identify new growth opportunities.",
        teamMembers: ["Robert Garcia (Innovation Lead)", "Sophia Ahmed (Experimentation Manager)", "Daniel Lee (Data Science Lead)"]
      };
    }
  };
  
  const teamData = getTeamData();
  
  return (
    <Card className="glass-card premium-shadow border-white/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Learning Agenda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium mb-2">Team Sponsorship</h3>
                <p className="text-sm text-muted-foreground">
                  This test was proposed by the <span className="font-medium text-foreground">{teamData.team}</span> team.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {teamData.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium mb-2">Key Stakeholders</h3>
                <ul className="space-y-2">
                  {teamData.teamMembers.map((member, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" /> {member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50/80 backdrop-blur-sm p-4 rounded-md border border-purple-100">
            <p className="text-sm text-purple-700">
              <span className="font-medium">Learning Priority:</span> This test is part of our Q3 2023 experimentation roadmap focused on {
                test.name.toLowerCase().includes("homepage") ? "optimizing website conversion paths" : 
                test.name.toLowerCase().includes("social") ? "improving performance marketing efficiency" :
                test.name.toLowerCase().includes("email") ? "enhancing customer engagement strategies" :
                "identifying new growth channels"
              }.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
