import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Target,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    category: "Technical Skills",
    question:
      "Which of the following best describes the purpose of version control systems like Git?",
    options: [
      "To compile source code into executable files",
      "To track changes in files and coordinate work among multiple people",
      "To debug application errors in production",
      "To optimize database query performance",
    ],
    correct: 1,
    explanation:
      "Version control systems like Git are designed to track changes in files over time and coordinate collaborative work among multiple developers.",
  },
  {
    id: 2,
    category: "Problem Solving",
    question:
      "You're leading a project that's running behind schedule. What's the most effective first step?",
    options: [
      "Work overtime to catch up on all delayed tasks",
      "Analyze the critical path and prioritize high-impact activities",
      "Request additional resources immediately",
      "Extend the project deadline",
    ],
    correct: 1,
    explanation:
      "Analyzing the critical path helps identify the most important tasks that directly impact the project timeline, allowing for strategic prioritization.",
  },
  {
    id: 3,
    category: "Communication",
    question:
      "When presenting complex technical information to non-technical stakeholders, you should:",
    options: [
      "Use as much technical jargon as possible to show expertise",
      "Avoid technical details entirely",
      "Use analogies and visual aids to explain concepts clearly",
      "Speak faster to cover more information",
    ],
    correct: 2,
    explanation:
      "Using analogies and visual aids helps translate complex technical concepts into understandable terms for non-technical audiences.",
  },
  {
    id: 4,
    category: "Leadership",
    question:
      "What's the most important quality for effective team leadership?",
    options: [
      "Making all decisions independently",
      "Having the most technical expertise",
      "Building trust and empowering team members",
      "Maintaining strict control over all activities",
    ],
    correct: 2,
    explanation:
      "Effective leadership is built on trust, empowerment, and creating an environment where team members can contribute their best work.",
  },
  {
    id: 5,
    category: "Adaptability",
    question:
      "Your company is implementing a new technology you're unfamiliar with. How do you approach this?",
    options: [
      "Resist the change and stick to familiar technologies",
      "Wait for formal training before engaging",
      "Proactively learn through online resources and experimentation",
      "Delegate the work to someone else",
    ],
    correct: 2,
    explanation:
      "Proactive learning demonstrates adaptability and growth mindset, essential qualities in today's rapidly evolving work environment.",
  },
];

export default function Diagnostic() {
  const navigate = useNavigate();

  useEffect(() => {
    const current = localStorage.getItem('cp_current');
    if (!current) {
      toast({ title: 'Sign in required', description: 'Please sign in to access the diagnostic.', duration: 3500 });
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentStep, setCurrentStep] = useState<"intro" | "test" | "results">(
    "intro",
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);

  const handleStartTest = () => {
    setCurrentStep("test");
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep("results");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach((question) => {
      if (answers[question.id] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const getScoreLevel = (score: number) => {
    if (score >= 90)
      return { level: "Expert", color: "text-success", bg: "bg-success/10" };
    if (score >= 80)
      return { level: "Advanced", color: "text-info", bg: "bg-info/10" };
    if (score >= 70)
      return {
        level: "Proficient",
        color: "text-warning",
        bg: "bg-warning/10",
      };
    if (score >= 60)
      return {
        level: "Developing",
        color: "text-primary",
        bg: "bg-primary/10",
      };
    return {
      level: "Beginner",
      color: "text-muted-foreground",
      bg: "bg-muted",
    };
  };

  if (currentStep === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/10">
                  <Brain className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Smart Competency Diagnostic
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover your strengths, identify growth opportunities, and get
                personalized recommendations to advance your career.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader className="text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">15-20 Minutes</CardTitle>
                  <CardDescription>
                    Complete assessment duration
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                  <CardTitle className="text-lg">5 Key Areas</CardTitle>
                  <CardDescription>
                    Technical, Leadership, Communication & more
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <BarChart3 className="h-8 w-8 text-info mx-auto mb-2" />
                  <CardTitle className="text-lg">Detailed Report</CardTitle>
                  <CardDescription>
                    Comprehensive competency analysis
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="font-medium">Competency Profile Score</p>
                    <p className="text-sm text-muted-foreground">
                      Overall assessment of your professional capabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                  <div>
                    <p className="font-medium">Skill Gap Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Identify areas for improvement and growth
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-info mt-2"></div>
                  <div>
                    <p className="font-medium">Personalized Recommendations</p>
                    <p className="text-sm text-muted-foreground">
                      Job opportunities and training courses tailored to you
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
                  <div>
                    <p className="font-medium">Development Roadmap</p>
                    <p className="text-sm text-muted-foreground">
                      Clear path to advance your career goals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-12">
              <Button
                onClick={handleStartTest}
                size="lg"
                className="text-lg px-8 py-6"
              >
                Start Assessment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                All responses are confidential and used only for your
                personalized report
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "test") {
    const question = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Exit Test
                  </Link>
                </Button>
                <Badge variant="secondary">{question.category}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl leading-relaxed">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) =>
                    handleAnswerSelect(question.id, parseInt(value))
                  }
                >
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-base leading-relaxed"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={answers[question.id] === undefined}
              >
                {currentQuestion === sampleQuestions.length - 1
                  ? "Finish Test"
                  : "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results page
  const score = calculateScore();
  const scoreInfo = getScoreLevel(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-full bg-success/10">
                <Award className="h-12 w-12 text-success" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Assessment Complete!</h1>
            <p className="text-xl text-muted-foreground">
              Here's your comprehensive competency analysis
            </p>
          </div>

          {/* Score Overview */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Your Competency Profile Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                <div className="text-4xl font-bold text-primary">{score}%</div>
              </div>
              <div
                className={`inline-block px-4 py-2 rounded-full ${scoreInfo.bg} ${scoreInfo.color} font-semibold mb-4`}
              >
                {scoreInfo.level}
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Based on your responses, you demonstrate strong competencies
                across multiple areas with specific opportunities for targeted
                development.
              </p>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>Problem Solving Approach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>Technical Understanding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>Communication Skills</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <span>Leadership Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <span>Strategic Thinking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <span>Change Management</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/profile">
                  View Detailed Profile
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">Explore Recommendations</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Your results are saved and you can access them anytime from your
              dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
