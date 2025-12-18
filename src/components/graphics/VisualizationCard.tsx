import { Visualization } from '@/lib/visualizations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Box, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualizationCardProps {
  visualization: Visualization;
  isSelected: boolean;
  onClick: () => void;
}

export const VisualizationCard = ({ visualization, isSelected, onClick }: VisualizationCardProps) => {
  const is3D = visualization.category === '3d';

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:scale-[1.02]",
        isSelected 
          ? "ring-2 ring-primary bg-primary/10" 
          : "hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            is3D ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
          )}>
            {is3D ? <Box className="h-5 w-5" /> : <LineChart className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium truncate">{visualization.name}</h3>
              <Badge variant="outline" className="text-xs shrink-0">
                {visualization.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              {visualization.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
