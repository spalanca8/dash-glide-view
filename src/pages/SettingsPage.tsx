
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  User,
  BellRing,
  Save,
  Lock,
  Mail,
  Share2,
  Download,
  BarChart3,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [formState, setFormState] = useState({
    emailNotifications: true,
    weeklyReports: true,
    performanceAlerts: true,
    budgetAlerts: false,
    dataExports: "weekly",
  });

  const handleFormChange = (field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully",
      });
    }, 800);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />

      <Tabs defaultValue="general" className="dashboard-card">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-64 flex-shrink-0">
            <TabsList className="flex flex-col w-full h-auto gap-1 bg-transparent p-0">
              <TabsTrigger
                value="general"
                className="justify-start w-full h-10 px-2 data-[state=active]:bg-accent"
              >
                <Settings className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="justify-start w-full h-10 px-2 data-[state=active]:bg-accent"
              >
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start w-full h-10 px-2 data-[state=active]:bg-accent"
              >
                <BellRing className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="reporting"
                className="justify-start w-full h-10 px-2 data-[state=active]:bg-accent"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Reporting
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <TabsContent value="general" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure your dashboard preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="timeZone">Time Zone</Label>
                      <select
                        id="timeZone"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="America/New_York">
                          Eastern Time (ET)
                        </option>
                        <option value="America/Chicago">
                          Central Time (CT)
                        </option>
                        <option value="America/Denver">
                          Mountain Time (MT)
                        </option>
                        <option value="America/Los_Angeles">
                          Pacific Time (PT)
                        </option>
                        <option value="Europe/London">
                          Greenwich Mean Time (GMT)
                        </option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <div className="text-sm text-muted-foreground">
                          Toggle between light and dark theme
                        </div>
                      </div>
                      <Switch
                        checked={false}
                        onCheckedChange={() => {}}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Display</h3>

                    <div>
                      <Label htmlFor="defaultView">Default Dashboard View</Label>
                      <select
                        id="defaultView"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="summary">Summary (Default)</option>
                        <option value="detailed">Detailed View</option>
                        <option value="channels">Channel Breakdown</option>
                        <option value="custom">My Custom View</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="defaultDateRange">
                        Default Date Range
                      </Label>
                      <select
                        id="defaultDateRange"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d" selected>
                          Last 30 Days
                        </option>
                        <option value="90d">Last 90 Days</option>
                        <option value="ytd">Year to Date</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="gap-1" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account details and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Alex" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex gap-2">
                        <Input
                          id="email"
                          type="email"
                          defaultValue="alex.johnson@example.com"
                        />
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="Acme Marketing Inc." />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security</h3>

                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div>
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Lock className="h-4 w-4" />
                        Setup
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="gap-1" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how you receive alerts and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive important updates via email
                        </div>
                      </div>
                      <Switch
                        checked={formState.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleFormChange("emailNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Performance Reports</Label>
                        <div className="text-sm text-muted-foreground">
                          Get a weekly summary of your marketing performance
                        </div>
                      </div>
                      <Switch
                        checked={formState.weeklyReports}
                        onCheckedChange={(checked) =>
                          handleFormChange("weeklyReports", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Performance Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified about significant changes in performance
                        </div>
                      </div>
                      <Switch
                        checked={formState.performanceAlerts}
                        onCheckedChange={(checked) =>
                          handleFormChange("performanceAlerts", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Budget Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when budget thresholds are reached
                        </div>
                      </div>
                      <Switch
                        checked={formState.budgetAlerts}
                        onCheckedChange={(checked) =>
                          handleFormChange("budgetAlerts", checked)
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Preferences</h3>

                    <div>
                      <Label htmlFor="alertThreshold">
                        Performance Alert Threshold
                      </Label>
                      <select
                        id="alertThreshold"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="5">5% change</option>
                        <option value="10" selected>
                          10% change
                        </option>
                        <option value="15">15% change</option>
                        <option value="20">20% change</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="notificationTime">
                        Notification Time
                      </Label>
                      <select
                        id="notificationTime"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="morning">Morning (8:00 AM)</option>
                        <option value="midday" selected>
                          Midday (12:00 PM)
                        </option>
                        <option value="evening">Evening (5:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="gap-1" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reporting" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Reporting Settings</CardTitle>
                  <CardDescription>
                    Configure your automated reports and exports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Scheduled Reports</h3>

                    <div>
                      <Label htmlFor="reportFrequency">Report Frequency</Label>
                      <select
                        id="reportFrequency"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly" selected>
                          Weekly
                        </option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="reportDay">Report Day</Label>
                      <select
                        id="reportDay"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="monday" selected>
                          Monday
                        </option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="reportRecipients">Recipients</Label>
                      <Input
                        id="reportRecipients"
                        defaultValue="alex.johnson@example.com, marketing@example.com"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Separate email addresses with commas
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Exports</h3>

                    <div>
                      <Label htmlFor="exportFormat">Export Format</Label>
                      <select
                        id="exportFormat"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="csv">CSV</option>
                        <option value="excel" selected>
                          Excel
                        </option>
                        <option value="pdf">PDF</option>
                        <option value="json">JSON</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automated Data Exports</Label>
                        <div className="text-sm text-muted-foreground">
                          Schedule regular data exports
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          id="exportFrequency"
                          value={formState.dataExports}
                          onChange={(e) =>
                            handleFormChange("dataExports", e.target.value)
                          }
                          className="h-8 rounded-md border border-input bg-transparent px-2 py-1 text-sm"
                        >
                          <option value="never">Never</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => {
                          toast({
                            title: "Export started",
                            description:
                              "Your data export will be emailed to you shortly",
                          });
                        }}
                      >
                        <Download className="h-4 w-4" />
                        Export Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => {
                          toast({
                            title: "Share link created",
                            description:
                              "A shareable link has been copied to your clipboard",
                          });
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        Share Reports
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="gap-1" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
