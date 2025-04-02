
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    email: string;
  };
  action: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "",
      email: "john@example.com",
    },
    action: "Completed task",
    time: "2 minutes ago",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      avatar: "",
      email: "jane@example.com",
    },
    action: "Created a new project",
    time: "1 hour ago",
  },
  {
    id: "3",
    user: {
      name: "Mike Johnson",
      avatar: "",
      email: "mike@example.com",
    },
    action: "Updated profile information",
    time: "3 hours ago",
  },
  {
    id: "4",
    user: {
      name: "Sarah Williams",
      avatar: "",
      email: "sarah@example.com",
    },
    action: "Commented on a task",
    time: "5 hours ago",
  },
];

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>
                  {activity.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
