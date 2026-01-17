import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TestCard } from "@/components/tests/TestCard";
import { TestQuiz } from "@/components/tests/TestQuiz";
import { tests, getTestById } from "@/lib/tests";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Trophy, Target, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import { useLanguage } from "@/hooks/useLanguage";

const Tests = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [completedTests, setCompletedTests] = useState<Record<string, { score: number; total: number }>>({});

  const categories = [...new Set(tests.map(test => test.category))];

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartTest = (testId: string) => {
    setActiveTestId(testId);
  };

  const handleFinishTest = (score: number, total: number) => {
    if (activeTestId) {
      setCompletedTests(prev => ({
        ...prev,
        [activeTestId]: { score, total }
      }));
    }
    setActiveTestId(null);
  };

  const activeTest = activeTestId ? getTestById(activeTestId) : null;

  const totalQuestions = tests.reduce((sum, test) => sum + test.questions.length, 0);
  const completedCount = Object.keys(completedTests).length;
  const totalScore = Object.values(completedTests).reduce((sum, result) => sum + result.score, 0);
  const totalAnswered = Object.values(completedTests).reduce((sum, result) => sum + result.total, 0);

  if (activeTest) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
            <TestQuiz 
              test={activeTest} 
              onFinish={handleFinishTest}
              onBack={() => setActiveTestId(null)}
            />
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {t.tests.title} <span className="text-primary">{t.tests.titleHighlight}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.tests.subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-4 border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{tests.length}</p>
                  <p className="text-xs text-muted-foreground">{t.tests.stats.tests}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalQuestions}</p>
                  <p className="text-xs text-muted-foreground">{t.tests.stats.questions}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-xs text-muted-foreground">{t.tests.stats.completed}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {totalAnswered > 0 ? Math.round((totalScore / totalAnswered) * 100) : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">{t.tests.stats.avgScore}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-4 mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.tests.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer px-4 py-1.5"
                onClick={() => setSelectedCategory(null)}
              >
                {t.common.all}
              </Badge>
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer px-4 py-1.5"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => (
              <div key={test.id} className="relative">
                {completedTests[test.id] && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className={cn(
                      "px-2 py-1",
                      (completedTests[test.id].score / completedTests[test.id].total) >= 0.7
                        ? "bg-green-500"
                        : (completedTests[test.id].score / completedTests[test.id].total) >= 0.5
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    )}>
                      {Math.round((completedTests[test.id].score / completedTests[test.id].total) * 100)}%
                    </Badge>
                  </div>
                )}
                <TestCard test={test} onStart={handleStartTest} />
              </div>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t.tests.noTestsFound}</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Tests;