import { BarChart3, Calendar, MessageSquare, TrendingUp, Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for dashboard
const stats = [
  {
    title: "Posts This Month",
    value: "127",
    change: "+12%",
    icon: BarChart3,
    color: "text-primary"
  },
  {
    title: "Scheduled Posts",
    value: "23",
    change: "+5",
    icon: Calendar,
    color: "text-warning"
  },
  {
    title: "Auto Replies",
    value: "89",
    change: "+18%",
    icon: MessageSquare,
    color: "text-success"
  },
  {
    title: "Engagement Rate",
    value: "94.2%",
    change: "+3.1%",
    icon: TrendingUp,
    color: "text-accent"
  }
];

const recentPosts = [
  {
    id: 1,
    platform: "LinkedIn",
    content: "Excited to share our latest product update! 🚀",
    status: "posted",
    scheduledFor: "2024-01-15 14:30",
    engagement: "24 likes, 5 comments"
  },
  {
    id: 2,
    platform: "Threads",
    content: "Behind the scenes of our development process...",
    status: "queued",
    scheduledFor: "2024-01-16 09:00",
    engagement: "Pending"
  },
  {
    id: 3,
    platform: "LinkedIn", 
    content: "Celebrating our team's achievements this quarter! 🎉",
    status: "failed",
    scheduledFor: "2024-01-15 16:00",
    engagement: "Error: API limit"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'posted':
      return 'bg-success/10 text-success border-success/20';
    case 'queued':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'failed':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

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

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your social media performance and upcoming posts
          </p>
        </div>
        <Button variant="gradient" size="lg" className="animate-pulse-glow">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="bg-gradient-card border-border/50 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-success flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <Card className="lg:col-span-2 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Posts
            </CardTitle>
            <CardDescription>
              Your latest scheduled and posted content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getPlatformColor(post.platform)}>
                        {post.platform}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Scheduled: {post.scheduledFor}</span>
                      <span>{post.engagement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Performance */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule LinkedIn Post
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Create Auto-Reply Rule
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>This Week</CardTitle>
              <CardDescription>
                Performance overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Posts Scheduled</span>
                  <span className="font-medium">8/10</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Engagement Rate</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Auto-Reply Success</span>
                  <span className="font-medium">67/70</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}