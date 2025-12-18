import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Home, BookOpen } from "lucide-react";
import { mathTopics } from "@/lib/mathTopics";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) navigate("/admin/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Chiqish muvaffaqiyatli!");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/"><Button variant="ghost" size="icon"><Home className="w-5 h-5" /></Button></Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center"><span className="text-primary-foreground font-display text-xl">∫</span></div>
              <span className="font-display text-xl">Admin Panel</span>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2"><LogOut className="w-4 h-4" />Chiqish</Button>
        </div>
      </header>
      <main className="container py-8">
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><BookOpen className="w-6 h-6 text-primary" /></div>
            <div><div className="text-3xl font-display">{mathTopics.length}</div><div className="text-sm text-muted-foreground">Jami mavzular</div></div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-display text-2xl mb-6">Mavzular</h2>
          <div className="space-y-3">
            {mathTopics.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><span className="font-display text-primary">{topic.id}</span></div>
                  <div><h3 className="font-semibold">{topic.title}</h3><p className="text-sm text-muted-foreground truncate max-w-md">{topic.description}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
