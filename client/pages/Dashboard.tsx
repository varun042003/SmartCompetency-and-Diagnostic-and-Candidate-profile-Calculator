import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  ChevronRight,
  Calendar,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const [user, setUser] = useState<any | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [skillsCount, setSkillsCount] = useState(0);
  const [jobMatches, setJobMatches] = useState(0);
  const [courses, setCourses] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem("cp_current");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setUser(u);
        const skills = (u.skills && typeof u.skills === "string") ? u.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : (u.skills || []);
        const n = skills.length;
        setSkillsCount(n);
        // deterministic pseudo-score from email length + skills
        const base = Math.min(90, 50 + Math.floor(n * 4));
        setScore(base + (u.id ? (Number(u.id) % 10) : 0));
        setJobMatches(5 + n * 3);
        setCourses(Math.max(1, Math.floor(n / 2)));
      } catch (err) {
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Your personalized insights and career development center</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Competency Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{score !== null ? `${score}%` : "—"}</div>
              <p className="text-xs text-muted-foreground">{score !== null ? "+2.1% from last assessment" : "No assessment yet"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills Tracked</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skillsCount}</div>
              <p className="text-xs text-muted-foreground">Based on your profile</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobMatches}</div>
              <p className="text-xs text-muted-foreground">Opportunities for your skills</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses}</div>
              <p className="text-xs text-muted-foreground">Recommended for you</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tiles */}
        <Card className="text-center py-12">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Dashboard</CardTitle>
            <CardDescription className="max-w-md mx-auto">Personalized insights based on your profile and assessments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Skill Progress Analytics</h4>
                    <p className="text-sm text-muted-foreground">Track your competency growth over time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Briefcase className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium">Job Recommendations</h4>
                    <p className="text-sm text-muted-foreground">AI-powered career opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <BookOpen className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <h4 className="font-medium">Learning Paths</h4>
                    <p className="text-sm text-muted-foreground">Personalized course recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Calendar className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium">Goal Tracking</h4>
                    <p className="text-sm text-muted-foreground">Monitor your career milestones</p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Button asChild>
                  <Link to="/diagnostic">Take Assessment to Get Started
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
