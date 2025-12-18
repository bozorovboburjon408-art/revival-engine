import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { toast.error("Iltimos, barcha maydonlarni to'ldiring"); return; }
    setIsLoading(true);
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("adminAuth", "true");
        toast.success("Muvaffaqiyatli kirdingiz!");
        navigate("/admin/dashboard");
      } else { toast.error("Login yoki parol noto'g'ri"); }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gradient-hero)]">
      <div className="relative w-full max-w-md mx-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"><ArrowLeft className="w-4 h-4" />Bosh sahifaga qaytish</Link>
        <div className="glass-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-primary-foreground" /></div>
            <h1 className="font-display text-3xl mb-2">Admin Panel</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Login</Label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="pl-10" /></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" /></div>
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>{isLoading ? "Kirilmoqda..." : "Kirish"}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
