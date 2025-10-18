import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [qualification, setQualification] = useState("");
  const [percentage, setPercentage] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", duration: 4000 });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Password mismatch", description: "Passwords do not match.", duration: 4000 });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const usersRaw = localStorage.getItem("cp_users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      if (users.find((u: any) => u.email === email)) {
        toast({ title: "Account exists", description: "An account with this email already exists.", duration: 4000 });
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        fullName,
        email,
        password,
        institution,
        qualification,
        percentage,
        graduationYear,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("cp_users", JSON.stringify(users));
      localStorage.setItem("cp_current", JSON.stringify(newUser));
      toast({ title: "Account created", description: "Welcome! Your profile has been created.", duration: 3000 });
      setLoading(false);
      navigate('/profile');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 px-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="qualification">Highest qualification</Label>
                <Input id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="percentage">Percentage / GPA</Label>
                <Input id="percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input id="graduationYear" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="skills">Key skills (comma separated)</Label>
                <Input id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
              </div>

              <div className="md:col-span-2 flex items-center justify-between mt-2">
                <div className="text-sm">
                  <Link to="/login" className="text-primary hover:underline">Already have an account?</Link>
                </div>
                <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
