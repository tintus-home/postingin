import { useState } from "react";
import { Calendar, Image, Video, Hash, AtSign, Send, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Composer() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["LinkedIn"]);
  const [postContent, setPostContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [timezone, setTimezone] = useState("Asia/Jakarta");

  const platforms = [
    { id: "LinkedIn", name: "LinkedIn", color: "bg-blue-500", connected: true },
    { id: "Threads", name: "Threads", color: "bg-purple-500", connected: true },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const characterCount = postContent.length;
  const maxCharacters = selectedPlatforms.includes("LinkedIn") ? 3000 : 500;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Post</h1>
        <p className="text-muted-foreground mt-1">
          Compose and schedule your social media content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Composer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selection */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Select Platforms</CardTitle>
              <CardDescription>
                Choose where to publish your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedPlatforms.includes(platform.id)
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                    {selectedPlatforms.includes(platform.id) && (
                      <Badge variant="secondary" className="ml-2">Selected</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Composer */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>
                Write your post content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="content">Post Text</Label>
                  <span className={`text-sm ${
                    characterCount > maxCharacters ? 'text-destructive' : 'text-muted-foreground'
                  }`}>
                    {characterCount}/{maxCharacters}
                  </span>
                </div>
                <Textarea
                  id="content"
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Media Upload */}
              <div className="space-y-3">
                <Label>Media (Optional)</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Image className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </div>
              </div>

              {/* Content Enhancements */}
              <Separator />
              <div className="space-y-3">
                <Label>Enhancements</Label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Hash className="w-4 h-4 mr-2" />
                    Add Hashtags
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AtSign className="w-4 h-4 mr-2" />
                    Mention Users
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scheduling & Actions */}
        <div className="space-y-6">
          {/* Schedule Settings */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Schedule
              </CardTitle>
              <CardDescription>
                Set when to publish your post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="schedule-now">Post Now</Label>
                <Switch id="schedule-now" />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="gradient" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button className="w-full" variant="ghost">
                Preview
              </Button>
            </CardContent>
          </Card>

          {/* Post Preview */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                How your post will appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedPlatforms.map((platform) => (
                  <div key={platform} className="p-3 border border-border rounded-lg bg-background/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">
                      {postContent || "Your post content will appear here..."}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}