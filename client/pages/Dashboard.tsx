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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Your personalized insights and career development center
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Competency Score
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last assessment
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Skills Tracked
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Across 5 categories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">New opportunities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Recommended for you
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder Content */}
        <Card className="text-center py-12">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Dashboard Coming Soon</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              This comprehensive dashboard will include real-time insights,
              skill progress tracking, job recommendations, and personalized
              learning paths.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Skill Progress Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Track your competency growth over time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Briefcase className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium">Job Recommendations</h4>
                    <p className="text-sm text-muted-foreground">
                      AI-powered career opportunities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <BookOpen className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <h4 className="font-medium">Learning Paths</h4>
                    <p className="text-sm text-muted-foreground">
                      Personalized course recommendations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Calendar className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium">Goal Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor your career milestones
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Button asChild>
                  <Link to="/diagnostic">
                    Take Assessment to Get Started
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
