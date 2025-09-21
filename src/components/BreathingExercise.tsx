import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";

export const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4;
            } else {
              setPhase('inhale');
              setCycle(prev => prev + 1);
              return 4;
            }
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(4);
    setCycle(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'bg-accent';
      case 'hold': return 'bg-wellness';
      case 'exhale': return 'bg-primary';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8 bg-card shadow-card border-0 rounded-3xl text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Breathing Exercise
        </h2>
        <p className="text-muted-foreground mb-8">
          Follow the circle and breathe deeply
        </p>

        <div className="relative flex items-center justify-center mb-8">
          <div className={`
            w-40 h-40 rounded-full border-4 border-opacity-30 flex items-center justify-center
            transition-all duration-1000 ${getPhaseColor()}
            ${isActive ? 'animate-breathe' : 'scale-90 opacity-70'}
          `}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{count}</div>
              <div className="text-sm text-white opacity-90">{getPhaseText()}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            Cycles completed: {cycle}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleExercise}
            variant="default"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
          >
            {isActive ? (
              <><Pause className="w-4 h-4 mr-2" /> Pause</>
            ) : (
              <><Play className="w-4 h-4 mr-2" /> Start</>
            )}
          </Button>

          <Button
            onClick={resetExercise}
            variant="secondary"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-2xl">
          <p className="text-sm text-muted-foreground">
            <strong>Technique:</strong> 4-4-4 breathing helps reduce stress and anxiety. 
            Breathe in for 4 seconds, hold for 4 seconds, then exhale for 4 seconds.
          </p>
        </div>
      </Card>
    </div>
  );
};