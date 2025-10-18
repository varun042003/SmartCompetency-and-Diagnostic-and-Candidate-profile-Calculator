import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Award,
  ChevronRight,
  Edit,
  Download,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const [user, setUser] = useState<any | null>(() => {
    try {
      const raw = localStorage.getItem("cp_current");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("cp_token");
      if (!token) return;
      try {
        const res = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem("cp_current", JSON.stringify(data.user));
        }
      } catch (err) {
        toast({ title: "Could not load profile", description: "Server unreachable.", duration: 3000 });
      }
    }
    load();
  }, []);

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n: string) => n[0]).slice(0, 2).join("")
    : "U";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Manage your competency profile and track your career development</p>
        </div>

        {/* Profile Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{user?.fullName || "Unnamed User"}</h2>
                  <Badge variant="secondary">Member</Badge>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{user?.location || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <Link to="/resume">
              <CardHeader className="text-center">
                <Download className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Download Resume</CardTitle>
                <CardDescription>Get your AI-generated professional resume</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <Link to="/diagnostic">
              <CardHeader className="text-center">
                <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-lg">Retake Assessment</CardTitle>
                <CardDescription>Update your competency profile</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader className="text-center">
              <Settings className="h-8 w-8 text-info mx-auto mb-2" />
              <CardTitle className="text-lg">Account Settings</CardTitle>
              <CardDescription>Manage your preferences</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Placeholder Content */}
        <Card className="text-center py-12">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Detailed Profile Coming Soon</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Your comprehensive profile will include competency scores, skill breakdowns, achievement badges, and detailed career development recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Competency Scores</h4>
                    <p className="text-sm text-muted-foreground">Detailed breakdown by skill category</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <User className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium">Achievement Badges</h4>
                    <p className="text-sm text-muted-foreground">Certificates and milestones</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Calendar className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <h4 className="font-medium">Progress Timeline</h4>
                    <p className="text-sm text-muted-foreground">Track your development journey</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Settings className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium">Personalized Goals</h4>
                    <p className="text-sm text-muted-foreground">Custom career objectives</p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Button asChild>
                  <Link to="/diagnostic">Complete Assessment First
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
