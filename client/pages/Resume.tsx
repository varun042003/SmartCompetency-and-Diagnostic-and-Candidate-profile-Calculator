import { Link } from "react-router-dom";
import {
  FileText,
  Download,
  Eye,
  ChevronRight,
  Palette,
  Layout,
  Type,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Resume() {
  const templates = [
    {
      name: "Professional",
      description: "Clean and modern design perfect for corporate roles",
      popular: true,
    },
    {
      name: "Creative",
      description: "Eye-catching layout for design and creative positions",
      popular: false,
    },
    {
      name: "Minimal",
      description: "Simple and elegant format that highlights content",
      popular: true,
    },
    {
      name: "Executive",
      description: "Sophisticated design for senior-level positions",
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
          <p className="text-muted-foreground">
            Create professional resumes automatically based on your competency
            profile
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader className="text-center">
              <Download className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Quick Download</CardTitle>
              <CardDescription>
                Download your latest resume instantly
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader className="text-center">
              <Eye className="h-8 w-8 text-accent mx-auto mb-2" />
              <CardTitle className="text-lg">Preview Resume</CardTitle>
              <CardDescription>See how your resume looks</CardDescription>
            </CardHeader>
          </Card>
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader className="text-center">
              <Palette className="h-8 w-8 text-info mx-auto mb-2" />
              <CardTitle className="text-lg">Customize Design</CardTitle>
              <CardDescription>
                Choose from professional templates
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Template Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Choose a Template</CardTitle>
            <CardDescription>
              Select from our collection of professionally designed resume
              templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((template, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                >
                  <CardHeader className="relative">
                    {template.popular && (
                      <div className="absolute -top-2 -right-2">
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Popular
                        </div>
                      </div>
                    )}
                    <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-muted rounded-lg mb-3 flex items-center justify-center">
                      <Layout className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Content */}
        <Card className="text-center py-12">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">
              Smart Resume Builder Coming Soon
            </CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Our AI-powered resume builder will automatically generate
              professional resumes based on your competency assessment and
              career goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Auto-Generated Content</h4>
                    <p className="text-sm text-muted-foreground">
                      Smart descriptions based on your skills
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Palette className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium">Professional Templates</h4>
                    <p className="text-sm text-muted-foreground">
                      Industry-specific design options
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Type className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <h4 className="font-medium">ATS Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimized for applicant tracking systems
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <Download className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium">Multiple Formats</h4>
                    <p className="text-sm text-muted-foreground">
                      PDF, Word, and web formats
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Button asChild>
                  <Link to="/diagnostic">
                    Complete Assessment to Build Resume
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
