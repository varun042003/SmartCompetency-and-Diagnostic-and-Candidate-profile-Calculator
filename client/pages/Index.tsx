import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Brain,
  Target,
  TrendingUp,
  FileText,
  Users,
  Award,
  Star,
  ChevronRight,
  CheckCircle,
  BarChart3,
  Lightbulb,
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
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const features = [
    {
      icon: Brain,
      title: "Smart Competency Diagnostic",
      description:
        "Advanced AI-powered assessments that evaluate your true skills and competencies across multiple domains.",
      color: "text-primary",
    },
    {
      icon: Target,
      title: "Personalized Profile Score",
      description:
        "Get a comprehensive score that reflects your overall competency and market readiness.",
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      title: "AI Job Recommendations",
      description:
        "Intelligent matching system that connects you with relevant job opportunities based on your skills.",
      color: "text-info",
    },
    {
      icon: Lightbulb,
      title: "Skill Gap Analysis",
      description:
        "Identify missing competencies and get a clear roadmap for professional development.",
      color: "text-warning",
    },
    {
      icon: FileText,
      title: "Smart Resume Builder",
      description:
        "Generate professional resumes automatically based on your competency profile and achievements.",
      color: "text-success",
    },
    {
      icon: BarChart3,
      title: "Market Insights Dashboard",
      description:
        "Real-time analytics on industry trends, salary ranges, and in-demand skills.",
      color: "text-primary",
    },
  ];

  const benefits = [
    "Accurate competency evaluation",
    "Personalized career recommendations",
    "Industry-aligned skill development",
    "Professional resume generation",
    "Real-time market insights",
    "Progress tracking & certifications",
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "TechCorp",
      quote:
        "This platform helped me identify my skill gaps and land my dream job in just 3 months!",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "InnovateCo",
      quote:
        "The AI recommendations were spot-on. I discovered career paths I never considered before.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Data Analyst",
      company: "DataFlow",
      quote:
        "The competency diagnostic gave me confidence and a clear development roadmap.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 text-sm font-medium">
              🚀 Smart Career Development Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Unlock Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                True Potential
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
              Advanced AI-powered competency diagnostics that evaluate your
              skills, identify opportunities, and provide personalized
              recommendations to accelerate your career growth.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <Button onClick={() => {
                const current = localStorage.getItem('cp_current');
                if (current) {
                  // already logged in
                  window.location.href = '/diagnostic';
                } else {
                  toast({ title: 'Sign in required', description: 'Please sign in to start the assessment.', duration: 3500 });
                  window.location.href = '/login';
                }
              }} size="lg" className="text-lg px-8 py-6">
                Start Your Assessment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="relative rounded-xl bg-card/50 backdrop-blur p-2 ring-1 ring-border/10 lg:rounded-2xl lg:p-4">
                <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground">
                      Interactive Dashboard Preview
                    </p>
                    <p className="text-muted-foreground">
                      See your competency analysis in action
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to advance your career
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our comprehensive platform combines AI-powered assessments with
              actionable insights to help you achieve your professional goals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden border-0 bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl bg-secondary ${feature.color}`}
                      >
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why choose our platform?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Join thousands of professionals who have transformed their
                careers with our intelligent competency diagnostic system.
              </p>
              <div className="mt-10 space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button asChild size="lg" variant="outline">
                  <Link to="/dashboard">
                    Explore Features
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
                <div className="h-full rounded-xl bg-card/50 backdrop-blur border border-border/50 p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Competency Score</h3>
                      <Badge variant="secondary">85/100</Badge>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Technical Skills</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Communication</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Leadership</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-info h-2 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by professionals worldwide
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              See how our platform has helped thousands advance their careers
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-warning text-warning"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to unlock your potential?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Start your competency assessment today and take the first step
              towards accelerating your career growth.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button onClick={() => {
                const current = localStorage.getItem('cp_current');
                if (current) {
                  window.location.href = '/diagnostic';
                } else {
                  toast({ title: 'Sign in required', description: 'Please sign in to start the assessment.', duration: 3500 });
                  window.location.href = '/login';
                }
              }} size="lg" className="text-lg px-8 py-6">
                Get Started Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="ghost" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
