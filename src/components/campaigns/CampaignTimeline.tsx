
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  CalendarDays, 
  Check, 
  Target, 
  ChevronRight, 
  ChevronDown,
  BarChart3, 
  Users, 
  Star,
  DollarSign,
  Flag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface CampaignEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "launch" | "milestone" | "update" | "report";
  status: "completed" | "active" | "upcoming";
  performance?: {
    revenue?: number;
    conversions?: number;
    roas?: number;
  };
}

interface Campaign {
  id: string;
  name: string;
  events: CampaignEvent[];
}

interface CampaignTimelineProps {
  loading?: boolean;
  events?: CampaignEvent[];
  selectedCampaign?: string;
  isOverview?: boolean;
  campaigns?: Campaign[];
}

export const CampaignTimeline: React.FC<CampaignTimelineProps> = ({
  loading = false,
  events = [],
  selectedCampaign,
  isOverview = false,
  campaigns = []
}) => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  
  const toggleEvent = (eventId: string) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };
  
  // Campaign data for timeline - representing the same campaigns as in filter
  const defaultCampaigns: Campaign[] = [
    {
      id: "summer-2023",
      name: "Summer 2023 Campaign",
      events: [
        {
          id: "event1",
          date: "2023-06-01",
          title: "Campaign Launch",
          description: "Initial launch of our Summer Sale campaign across all digital channels.",
          type: "launch",
          status: "completed",
          performance: {
            revenue: 124500,
            conversions: 2840,
            roas: 3.6
          }
        },
        {
          id: "event2",
          date: "2023-06-15",
          title: "Mid-Month Review",
          description: "Analysis of first two weeks performance data. Adjustments made to ad spend.",
          type: "report",
          status: "completed",
          performance: {
            revenue: 178600,
            conversions: 3920,
            roas: 4.1
          }
        },
        {
          id: "event3",
          date: "2023-07-01",
          title: "Campaign Expansion",
          description: "Extended campaign to include new social media platforms and increased budget.",
          type: "update",
          status: "completed",
          performance: {
            revenue: 245800,
            conversions: 5240,
            roas: 3.8
          }
        }
      ]
    },
    {
      id: "black-friday",
      name: "Black Friday 2023",
      events: [
        {
          id: "bf-event1",
          date: "2023-11-01",
          title: "Pre-Launch Teaser",
          description: "Teaser content distributed across email and social channels.",
          type: "update",
          status: "completed",
          performance: {
            revenue: 45200,
            conversions: 980,
            roas: 4.2
          }
        },
        {
          id: "bf-event2",
          date: "2023-11-20",
          title: "Early Access Launch",
          description: "Early access deals for loyalty members across all channels.",
          type: "launch",
          status: "completed",
          performance: {
            revenue: 287400,
            conversions: 5840,
            roas: 5.1
          }
        },
        {
          id: "bf-event3",
          date: "2023-11-24",
          title: "Black Friday Peak",
          description: "Main Black Friday offers go live with increased ad spend.",
          type: "milestone",
          status: "completed",
          performance: {
            revenue: 512000,
            conversions: 9240,
            roas: 5.8
          }
        }
      ]
    },
    {
      id: "holiday-2023",
      name: "Holiday 2023 Campaign",
      events: [
        {
          id: "hol-event1",
          date: "2023-12-01",
          title: "Holiday Campaign Kickoff",
          description: "Launch of holiday season marketing across all channels.",
          type: "launch",
          status: "completed",
          performance: {
            revenue: 324000,
            conversions: 6240,
            roas: 4.2
          }
        },
        {
          id: "hol-event2",
          date: "2023-12-15",
          title: "Last Shipping Day Push",
          description: "Increased promotion for last guaranteed shipping day.",
          type: "update",
          status: "completed",
          performance: {
            revenue: 402000,
            conversions: 8150,
            roas: 4.5
          }
        },
        {
          id: "hol-event3",
          date: "2023-12-26",
          title: "Post-Holiday Sales",
          description: "After-Christmas clearance promotions and gift card campaigns.",
          type: "milestone",
          status: "completed",
          performance: {
            revenue: 356000,
            conversions: 7240,
            roas: 4.8
          }
        }
      ]
    },
    {
      id: "spring-2024",
      name: "Spring 2024 Collection",
      events: [
        {
          id: "spr-event1",
          date: "2024-03-01",
          title: "Spring Preview Launch",
          description: "Teaser campaign for the upcoming spring collection.",
          type: "update",
          status: "completed",
          performance: {
            revenue: 187000,
            conversions: 3750,
            roas: 3.9
          }
        },
        {
          id: "spr-event2",
          date: "2024-03-15",
          title: "Full Collection Launch",
          description: "Complete spring collection release with cross-channel campaign.",
          type: "launch",
          status: "active",
          performance: {
            revenue: 245000,
            conversions: 4920,
            roas: 4.3
          }
        },
        {
          id: "spr-event3",
          date: "2024-04-01",
          title: "Mid-Season Promotion",
          description: "Planned mid-season promotional event to boost sales.",
          type: "milestone",
          status: "upcoming",
          performance: {
            revenue: 0,
            conversions: 0,
            roas: 0
          }
        }
      ]
    },
    {
      id: "summer-2024",
      name: "Summer 2024 Preview",
      events: [
        {
          id: "sum24-event1",
          date: "2024-05-15",
          title: "Summer Campaign Planning",
          description: "Strategic planning for upcoming summer campaign.",
          type: "update",
          status: "upcoming",
          performance: {
            revenue: 0,
            conversions: 0,
            roas: 0
          }
        },
        {
          id: "sum24-event2",
          date: "2024-06-01",
          title: "Early Summer Launch",
          description: "Planned launch of early summer promotions.",
          type: "launch",
          status: "upcoming",
          performance: {
            revenue: 0,
            conversions: 0,
            roas: 0
          }
        }
      ]
    }
  ];
  
  // Get all campaigns or the selected one based on mode
  const timelineCampaigns = isOverview 
    ? (campaigns.length > 0 ? campaigns : defaultCampaigns) 
    : selectedCampaign 
      ? [defaultCampaigns.find(c => c.id === selectedCampaign) || defaultCampaigns[0]] 
      : [defaultCampaigns[0]];
  
  // For single campaign view
  const activeCampaign = timelineCampaigns[0];
  const timelineEvents = !isOverview ? activeCampaign?.events || [] : [];
  
  // Sort campaigns by first event date for overview timeline
  const sortedCampaigns = [...timelineCampaigns].sort((a, b) => {
    const aDate = new Date(a.events[0]?.date || "");
    const bDate = new Date(b.events[0]?.date || "");
    return aDate.getTime() - bDate.getTime();
  });
  
  // Get icon based on event type
  const getEventIcon = (type: "launch" | "milestone" | "update" | "report") => {
    switch (type) {
      case "launch":
        return <Flag className="h-4 w-4" />;
      case "milestone":
        return <Target className="h-4 w-4" />;
      case "update":
        return <BarChart3 className="h-4 w-4" />;
      case "report":
        return <Users className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "active":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "upcoming":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Calculate average ROAS for a campaign
  const calculateAverageRoas = (campaign: Campaign) => {
    const completedEvents = campaign.events.filter(e => e.status !== "upcoming" && e.performance?.roas);
    if (completedEvents.length === 0) return 0;
    
    const totalRoas = completedEvents.reduce((sum, event) => sum + (event.performance?.roas || 0), 0);
    return totalRoas / completedEvents.length;
  };

  // Get campaign color based on ROAS performance
  const getCampaignColor = (roas: number) => {
    if (roas >= 4.0) return "bg-green-500";
    if (roas >= 3.0) return "bg-blue-500";
    if (roas >= 2.0) return "bg-yellow-500";
    return "bg-gray-500";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Overview timeline view - showing multiple campaigns
  if (isOverview) {
    return (
      <Card className="shadow-sm border-border/40 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-[#4361ee] to-[#7209b7]"></div>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Campaign Timeline Overview</CardTitle>
          </div>
          <CardDescription>
            Timeline of all campaigns with performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pl-8">
            {/* Timeline connector line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-full"></div>
            
            {/* Timeline events - one per campaign */}
            <div className="space-y-6 pb-2">
              {sortedCampaigns.map((campaign) => {
                const startEvent = campaign.events[0];
                const avgRoas = calculateAverageRoas(campaign);
                const campaignStatus = campaign.events.some(e => e.status === "active") 
                  ? "active" 
                  : campaign.events.every(e => e.status === "completed") 
                    ? "completed" 
                    : "upcoming";
                const roasColor = getCampaignColor(avgRoas);
                
                if (!startEvent) return null;
                
                return (
                  <div 
                    key={campaign.id}
                    className={`relative ${
                      campaignStatus === "active" ? "ring-2 ring-primary/10 rounded-lg p-3 -ml-3 bg-muted/10" : ""
                    }`}
                  >
                    {/* Campaign marker */}
                    <div className={`absolute -left-8 p-2 rounded-full ${roasColor}`}>
                      <Flag className="h-4 w-4 text-white" />
                    </div>
                    
                    {/* Campaign info */}
                    <div className="ml-2">
                      <div className="flex items-center text-xs text-muted-foreground mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatDate(startEvent.date)}</span>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${getStatusColor(campaignStatus)}`}
                        >
                          {campaignStatus}
                        </Badge>
                      </div>
                    
                      {/* Campaign title and metrics */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">{campaign.name}</h3>
                        
                        {/* Performance metrics */}
                        {campaignStatus !== "upcoming" && (
                          <div className="flex items-center gap-3 my-2 text-xs">
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3 text-primary" />
                              <span className="text-muted-foreground">ROAS:</span>
                              <span className="font-medium">{avgRoas.toFixed(1)}x</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-primary" />
                              <span className="text-muted-foreground">Events:</span>
                              <span className="font-medium">{campaign.events.length}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Single campaign detailed view
  return (
    <Card className="shadow-sm border-border/40 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-[#4361ee] to-[#7209b7]"></div>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Campaign Timeline: {activeCampaign?.name}</CardTitle>
        </div>
        <CardDescription>
          Key milestones and performance metrics over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-8">
          {/* Timeline connector line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-full"></div>
          
          {/* Timeline events */}
          <div className="space-y-8 pb-2">
            {timelineEvents.map((event) => (
              <div 
                key={event.id}
                className={`relative animate-fade-in ${
                  event.status === "active" ? "ring-2 ring-primary/10 rounded-lg p-3 -ml-3 bg-muted/10" : ""
                }`}
              >
                {/* Event marker */}
                <div 
                  className={`absolute -left-8 p-2 rounded-full ${
                    event.status === "completed" 
                      ? "bg-green-100" 
                      : event.status === "active" 
                        ? "bg-blue-100" 
                        : "bg-gray-100"
                  }`}
                >
                  {event.status === "completed" ? (
                    <Check className="h-4 w-4 text-green-700" />
                  ) : (
                    getEventIcon(event.type)
                  )}
                </div>
                
                {/* Event date */}
                <div className="ml-2">
                  <div className="flex items-center text-xs text-muted-foreground mb-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                
                  {/* Event content */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">{event.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(event.status)}
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Performance metrics */}
                    {event.performance && event.status !== "upcoming" && (
                      <div className="grid grid-cols-3 gap-2 my-2">
                        <div className="flex items-center gap-1 text-xs">
                          <DollarSign className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-medium">${event.performance.revenue?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">Conv:</span>
                          <span className="font-medium">{event.performance.conversions?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <BarChart3 className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">ROAS:</span>
                          <span className="font-medium">{event.performance.roas?.toFixed(1)}x</span>
                        </div>
                      </div>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 w-full justify-between bg-muted/50 hover:bg-muted"
                      onClick={() => toggleEvent(event.id)}
                    >
                      <span className="text-xs">
                        {expandedEvent === event.id ? "Hide details" : "View details"}
                      </span>
                      {expandedEvent === event.id ? (
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      )}
                    </Button>
                    
                    {expandedEvent === event.id && (
                      <div className="pt-2 text-sm text-muted-foreground bg-muted/20 p-3 rounded-md mt-2 animate-fade-in">
                        {event.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

