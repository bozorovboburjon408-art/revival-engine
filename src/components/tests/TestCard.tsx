import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Play } from "lucide-react";
import { Test } from "@/lib/tests";
import * as Icons from "lucide-react";

interface TestCardProps {
  test: Test;
  onStart: (testId: string) => void;
}

export const TestCard = ({ test, onStart }: TestCardProps) => {
  const IconComponent = (Icons as any)[test.icon] || Icons.FileQuestion;
  
  const getDifficultyCount = (difficulty: string) => {
    return test.questions.filter(q => q.difficulty === difficulty).length;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <IconComponent className="h-6 w-6" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {test.category}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors">
          {test.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {test.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>{test.questions.length} savol</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{test.timeLimit} daqiqa</span>
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
            Oson: {getDifficultyCount('easy')}
          </Badge>
          <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            O'rta: {getDifficultyCount('medium')}
          </Badge>
          <Badge variant="outline" className="text-xs bg-red-500/10 text-red-600 border-red-500/20">
            Qiyin: {getDifficultyCount('hard')}
          </Badge>
        </div>

        <Button 
          onClick={() => onStart(test.id)} 
          className="w-full gap-2"
        >
          <Play className="h-4 w-4" />
          Testni boshlash
        </Button>
      </CardContent>
    </Card>
  );
};
