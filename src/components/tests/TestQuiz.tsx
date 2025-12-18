import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Test, TestQuestion } from "@/lib/tests";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS_PER_TEST = 10;

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface TestQuizProps {
  test: Test;
  onFinish: (score: number, total: number, answers: number[]) => void;
  onBack: () => void;
}

export const TestQuiz = ({ test, onFinish, onBack }: TestQuizProps) => {
  // Randomly select 10 questions from the pool
  const selectedQuestions = useMemo(() => {
    const shuffled = shuffleArray(test.questions);
    return shuffled.slice(0, Math.min(QUESTIONS_PER_TEST, shuffled.length));
  }, [test.id]); // Only regenerate when test changes

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(selectedQuestions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(test.timeLimit * 60);
  const [showResult, setShowResult] = useState(false);

  const calculateScore = useCallback(() => {
    return selectedQuestions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  }, [selectedQuestions, selectedAnswers]);

  useEffect(() => {
    if (timeLeft <= 0 || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (showResult) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    setShowResult(true);
  };

  const handleComplete = () => {
    const score = calculateScore();
    onFinish(score, selectedQuestions.length, selectedAnswers);
  };

  const question = selectedQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
  const answeredCount = selectedAnswers.filter(a => a !== -1).length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'hard': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return '';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Oson';
      case 'medium': return "O'rta";
      case 'hard': return 'Qiyin';
      default: return difficulty;
    }
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = Math.round((score / selectedQuestions.length) * 100);

    return (
      <div className="space-y-6">
        <Card className="bg-card">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Test yakunlandi!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={cn(
                "text-6xl font-bold mb-2",
                percentage >= 70 ? "text-green-500" : percentage >= 50 ? "text-yellow-500" : "text-red-500"
              )}>
                {percentage}%
              </div>
              <p className="text-muted-foreground">
                {score} / {selectedQuestions.length} to'g'ri javob
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {percentage >= 70 ? "Ajoyib natija! 🎉" : percentage >= 50 ? "Yaxshi harakat! 👍" : "Ko'proq mashq qiling! 💪"}
              </p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedQuestions.map((q, index) => {
                const isCorrect = selectedAnswers[index] === q.correctAnswer;
                const wasAnswered = selectedAnswers[index] !== -1;

                return (
                  <div 
                    key={q.id} 
                    className={cn(
                      "p-3 rounded-lg border",
                      isCorrect ? "bg-green-500/10 border-green-500/20" : 
                      !wasAnswered ? "bg-muted/50 border-muted" :
                      "bg-red-500/10 border-red-500/20"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      ) : !wasAnswered ? (
                        <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{index + 1}. {q.question}</p>
                        {!isCorrect && (
                          <p className="text-xs text-muted-foreground mt-1">
                            To'g'ri javob: {q.options[q.correctAnswer]}
                          </p>
                        )}
                        {q.explanation && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Testlarga qaytish
              </Button>
              <Button onClick={handleComplete} className="flex-1">
                Yakunlash
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Orqaga
        </Button>
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full",
          timeLeft < 60 ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
        )}>
          <Clock className="h-4 w-4" />
          <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Savol {currentQuestion + 1} / {selectedQuestions.length}</span>
          <span>{answeredCount} javob berildi</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
              {getDifficultyLabel(question.difficulty)}
            </Badge>
            <span className="text-sm text-muted-foreground">#{currentQuestion + 1}</span>
          </div>
          <CardTitle className="text-lg mt-2">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={cn(
                "w-full p-4 rounded-lg border text-left transition-all",
                selectedAnswers[currentQuestion] === index
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border",
                  selectedAnswers[currentQuestion] === index
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted border-border"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {selectedQuestions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={cn(
              "w-8 h-8 rounded-full text-sm font-medium transition-all",
              currentQuestion === index
                ? "bg-primary text-primary-foreground"
                : selectedAnswers[index] !== -1
                ? "bg-primary/20 text-primary"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="flex-1"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Oldingi
        </Button>
        {currentQuestion === selectedQuestions.length - 1 ? (
          <Button onClick={handleFinish} className="flex-1">
            Yakunlash
          </Button>
        ) : (
          <Button onClick={handleNext} className="flex-1">
            Keyingi
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
