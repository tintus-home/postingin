import { useState } from "react";
import { Calendar, Clock, Edit, Trash2, Play, Pause, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock queue data
const queuedPosts = [
  {
    id: 1,
    platform: "LinkedIn",
    content: "Sharing insights about the future of AI in business...",
    scheduledFor: "2024-01-16 09:00",
    status: "queued",
    mediaType: "image",
    timezone: "Asia/Jakarta"
  },
  {
    id: 2,
    platform: "Threads",
    content: "Behind the scenes of our latest product development 🚀",
    scheduledFor: "2024-01-16 14:30",
    status: "queued",
    mediaType: "text",
    timezone: "Asia/Jakarta"
  },
  {
    id: 3,
    platform: "LinkedIn",
    content: "Celebrating our team's Q4 achievements and looking forward...",
    scheduledFor: "2024-01-17 10:15",
    status: "processing",
    mediaType: "video",
    timezone: "Asia/Jakarta"
  },
  {
    id: 4,
    platform: "Threads",
    content: "Quick tip: How to optimize your workflow with automation",
    scheduledFor: "2024-01-17 16:00",
    status: "queued",
    mediaType: "text",
    timezone: "Asia/Jakarta"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'queued':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'processing':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'paused':
      return 'bg-muted text-muted-foreground border-muted';
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

const getMediaIcon = (mediaType: string) => {
  switch (mediaType) {
    case 'image':
      return '🖼️';
    case 'video':
      return '🎥';
    default:
      return '📝';
  }
};

export default function Queue() {
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPosts = queuedPosts.filter(post => {
    if (filterPlatform !== "all" && post.platform !== filterPlatform) return false;
    if (filterStatus !== "all" && post.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Post Queue</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your scheduled posts
          </p>
        </div>
        <Button variant="gradient" size="lg">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule New Post
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Queued</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Play className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Calendar className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                Excellent
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>
                View and manage your upcoming social media posts
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Threads">Threads</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="queued">Queued</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Scheduled For</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Media</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id} className="hover:bg-muted/50">
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm font-medium">
                      {post.content}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPlatformColor(post.platform)}>
                      {post.platform}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{post.scheduledFor}</div>
                      <div className="text-muted-foreground">{post.timezone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg">{getMediaIcon(post.mediaType)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="w-4 h-4 mr-2" />
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}