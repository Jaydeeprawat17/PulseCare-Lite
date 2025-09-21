import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BreathingExercise } from "@/components/BreathingExercise";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";

const copingStrategies = [
  {
    title: "5-4-3-2-1 Grounding",
    description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
  },
  {
    title: "Box Breathing",
    description: "Breathe in for 4, hold for 4, exhale for 4, hold for 4. Repeat this pattern",
  },
  {
    title: "Progressive Muscle Relaxation", 
    description: "Tense and release each muscle group, starting from your toes up to your head",
  },
  {
    title: "Mindful Observation",
    description: "Focus on one object for 60 seconds, noticing every detail without judgment",
  },
];

const Breathing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStrategy, setCurrentStrategy] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const moodState = location.state as { mood: number; note?: string; timestamp: string } | null;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStrategy((prev) => (prev + 1) % copingStrategies.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const handleComplete = () => {
    setShowCompletion(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen p-4 pb-20 flex items-center justify-center" style={{background: 'var(--gradient-breathing)'}}>
        <Card className="p-8 bg-card shadow-card border-0 rounded-3xl text-center max-w-md mx-auto animate-fade-in">
          <CheckCircle className="w-16 h-16 text-wellness mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Well done!
          </h2>
          <p className="text-muted-foreground">
            You took a step toward self-care today 💙
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20" style={{background: 'var(--gradient-breathing)'}}>
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            onClick={() => navigate('/')}
            variant="ghost" 
            size="sm"
            className="mr-4 p-2 rounded-full hover:bg-card/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Take a moment</h1>
        </div>

        {/* Breathing Exercise Component */}
        <div className="mb-8">
          <BreathingExercise />
        </div>

        {/* Current Strategy */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            💡 Try This: {copingStrategies[currentStrategy].title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {copingStrategies[currentStrategy].description}
          </p>
        </Card>

        {/* Complete Button */}
        <Button
          onClick={handleComplete}
          className="w-full bg-wellness hover:bg-wellness/90 text-wellness-foreground py-4 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-card"
        >
          Done
        </Button>

        {/* Additional Tips */}
        <Card className="mt-6 p-6 bg-card/60 backdrop-blur-sm rounded-3xl shadow-soft">
          <h3 className="text-base font-semibold text-foreground mb-3">
            Remember
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• It's okay to feel whatever you're feeling right now</p>
            <p>• Small steps toward wellness make a big difference</p>
            <p>• You don't have to be perfect to make progress</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Breathing;