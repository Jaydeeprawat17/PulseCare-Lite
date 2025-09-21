import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, Square, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const meditationDurations = [
  { duration: 300, label: "5 min", description: "Quick reset" },
  { duration: 600, label: "10 min", description: "Focus boost" },
  { duration: 900, label: "15 min", description: "Deep calm" },
  { duration: 1200, label: "20 min", description: "Full practice" }
];

const meditationTypes = [
  {
    name: "Mindful Breathing",
    description: "Focus on your breath to center yourself",
    instructions: "Breathe naturally and notice each inhale and exhale"
  },
  {
    name: "Body Scan",
    description: "Progressive relaxation from head to toe",
    instructions: "Start at your head and slowly notice each part of your body"
  },
  {
    name: "Loving Kindness",
    description: "Send good wishes to yourself and others",
    instructions: "Begin with kind thoughts for yourself, then extend to others"
  }
];

const Meditation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDuration, setSelectedDuration] = useState(300);
  const [selectedType, setSelectedType] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedDuration);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            // Play completion sound (using Web Audio API)
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
            
            toast({
              description: "Meditation completed! Well done 🧘‍♀️",
            });
            
            // Save meditation session
            const sessions = JSON.parse(localStorage.getItem("pulsecare-meditation") || "[]");
            sessions.push({
              duration: selectedDuration,
              type: meditationTypes[selectedType].name,
              completedAt: Date.now(),
              date: new Date().toLocaleDateString()
            });
            localStorage.setItem("pulsecare-meditation", JSON.stringify(sessions));
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, selectedDuration, selectedType, toast]);

  const startMeditation = () => {
    setTimeLeft(selectedDuration);
    setIsActive(true);
    setIsCompleted(false);
  };

  const pauseMeditation = () => {
    setIsActive(false);
  };

  const stopMeditation = () => {
    setIsActive(false);
    setTimeLeft(selectedDuration);
    setIsCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedDuration - timeLeft) / selectedDuration) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen p-4 pb-20 flex items-center justify-center" style={{background: 'var(--gradient-wellness)'}}>
        <Card className="p-8 bg-card shadow-card border-0 rounded-3xl text-center max-w-md mx-auto animate-fade-in">
          <Bell className="w-16 h-16 text-wellness mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Session Complete
          </h2>
          <p className="text-muted-foreground mb-4">
            You completed {selectedDuration / 60} minutes of {meditationTypes[selectedType].name.toLowerCase()}
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setIsCompleted(false);
                setTimeLeft(selectedDuration);
              }}
              className="w-full bg-wellness hover:bg-wellness/90 text-wellness-foreground rounded-2xl"
            >
              Meditate Again
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="w-full rounded-2xl"
            >
              View Progress
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20" style={{background: 'var(--gradient-wellness)'}}>
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
          <h1 className="text-xl font-semibold text-foreground">Meditation</h1>
        </div>

        {!isActive && timeLeft === selectedDuration ? (
          <>
            {/* Duration Selection */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Choose duration</h3>
              <div className="grid grid-cols-2 gap-3">
                {meditationDurations.map((item) => (
                  <Button
                    key={item.duration}
                    onClick={() => setSelectedDuration(item.duration)}
                    variant={selectedDuration === item.duration ? "default" : "outline"}
                    className="h-auto p-4 rounded-2xl flex flex-col items-center"
                  >
                    <span className="text-lg font-semibold">{item.label}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Type Selection */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Meditation style</h3>
              <div className="space-y-3">
                {meditationTypes.map((type, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedType(index)}
                    variant={selectedType === index ? "default" : "outline"}
                    className="w-full h-auto p-4 rounded-2xl text-left flex flex-col items-start"
                  >
                    <span className="font-semibold">{type.name}</span>
                    <span className="text-sm opacity-70">{type.description}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Start Button */}
            <Button
              onClick={startMeditation}
              className="w-full bg-wellness hover:bg-wellness/90 text-wellness-foreground py-4 rounded-2xl shadow-soft"
            >
              <Play className="w-5 h-5 mr-2" />
              Begin Meditation
            </Button>
          </>
        ) : (
          /* Active Session */
          <Card className="p-8 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in text-center">
            {/* Progress Circle */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="hsl(var(--wellness))"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{formatTime(timeLeft)}</span>
                <span className="text-sm text-muted-foreground">{meditationTypes[selectedType].name}</span>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {meditationTypes[selectedType].instructions}
            </p>

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={isActive ? pauseMeditation : () => setIsActive(true)}
                variant="outline"
                size="lg"
                className="rounded-full p-4"
              >
                {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button
                onClick={stopMeditation}
                variant="outline"
                size="lg"
                className="rounded-full p-4"
              >
                <Square className="w-6 h-6" />
              </Button>
            </div>
          </Card>
        )}

        {/* Tips */}
        <Card className="p-6 bg-card/60 backdrop-blur-sm rounded-3xl shadow-soft">
          <h3 className="text-base font-semibold text-foreground mb-3">
            Meditation tips
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Find a comfortable, quiet space</p>
            <p>• It's normal for your mind to wander</p>
            <p>• Gently return focus when you notice distractions</p>
            <p>• Consistency matters more than duration</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Meditation;