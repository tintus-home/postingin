import { useState } from "react";
import { MessageSquare, Plus, Edit, Trash2, ToggleLeft, ToggleRight, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for auto-reply rules
const autoReplyRules = [
  {
    id: 1,
    platform: "LinkedIn",
    keyword: "pricing",
    replyTemplate: "Thanks for your interest! You can find our pricing details at our website. Feel free to DM us for a personalized quote! 💼",
    isActive: true,
    triggerCount: 23,
    lastTriggered: "2024-01-15 14:30"
  },
  {
    id: 2,
    platform: "Threads",
    keyword: "demo", 
    replyTemplate: "Hi there! 👋 I'd be happy to show you a demo. You can book a time that works for you here: [link]",
    isActive: true,
    triggerCount: 15,
    lastTriggered: "2024-01-15 16:45"
  },
  {
    id: 3,
    platform: "LinkedIn",
    keyword: "collaboration",
    replyTemplate: "Great to hear from you! We're always open to meaningful collaborations. Let's connect and discuss! 🤝",
    isActive: false,
    triggerCount: 8,
    lastTriggered: "2024-01-14 09:20"
  }
];

// Mock stop words
const stopWords = [
  "spam", "fake", "scam", "hate", "terrible", "worst", "stupid", "idiot"
];

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'LinkedIn':
      return 'bg-blue-500/10 text-blue-600 border-blue-200';
    case 'Threads':
      return 'bg-purple-500/10 text-purple-600 border-purple-200';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function AutoReply() {
  const [showAddRule, setShowAddRule] = useState(false);
  const [newRule, setNewRule] = useState({
    platform: "",
    keyword: "",
    replyTemplate: "",
    isActive: true
  });

  const handleAddRule = () => {
    // Here you would typically save to backend
    console.log("Adding rule:", newRule);
    setShowAddRule(false);
    setNewRule({
      platform: "",
      keyword: "",
      replyTemplate: "",
      isActive: true
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Auto-Reply Rules</h1>
          <p className="text-muted-foreground mt-1">
            Automate responses to comments and mentions with intelligent keywords
          </p>
        </div>
        <Dialog open={showAddRule} onOpenChange={setShowAddRule}>
          <DialogTrigger asChild>
            <Button variant="gradient" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add New Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Auto-Reply Rule</DialogTitle>
              <DialogDescription>
                Set up automatic responses for specific keywords
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={newRule.platform} onValueChange={(value) => 
                  setNewRule({...newRule, platform: value})
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Threads">Threads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyword">Trigger Keyword</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., pricing, demo, help"
                  value={newRule.keyword}
                  onChange={(e) => setNewRule({...newRule, keyword: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Reply Template</Label>
                <Textarea
                  id="template"
                  placeholder="Your automatic reply message..."
                  value={newRule.replyTemplate}
                  onChange={(e) => setNewRule({...newRule, replyTemplate: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active by default</Label>
                <Switch
                  id="active"
                  checked={newRule.isActive}
                  onCheckedChange={(checked) => setNewRule({...newRule, isActive: checked})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddRule(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRule}>
                Create Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Rules</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">9</p>
              </div>
              <ToggleRight className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Replies This Month</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                +18%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">96.2%</p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                Excellent
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rules Table */}
        <Card className="lg:col-span-2 bg-gradient-card">
          <CardHeader>
            <CardTitle>Active Rules</CardTitle>
            <CardDescription>
              Manage your automatic reply rules and monitor their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Triggers</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {autoReplyRules.map((rule) => (
                  <TableRow key={rule.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{rule.keyword}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-xs">
                          {rule.replyTemplate.substring(0, 60)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPlatformColor(rule.platform)}>
                        {rule.platform}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        rule.isActive 
                          ? "bg-success/10 text-success border-success/20" 
                          : "bg-muted text-muted-foreground"
                      }>
                        {rule.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{rule.triggerCount}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {rule.lastTriggered}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Settings & Stop Words */}
        <div className="space-y-6">
          {/* Global Settings */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Settings
              </CardTitle>
              <CardDescription>
                Configure global auto-reply behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Enable Auto-Reply</Label>
                  <p className="text-xs text-muted-foreground">Master switch for all rules</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Cooldown Period</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="120">2 minutes</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Minimum time between auto-replies to the same user
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stop Words */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Stop Words</CardTitle>
              <CardDescription>
                Comments containing these words will be ignored
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {stopWords.map((word, index) => (
                    <Badge key={index} variant="outline" className="bg-destructive/10 text-destructive">
                      {word}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add stop word..." className="flex-1" />
                  <Button variant="outline" size="sm">
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}