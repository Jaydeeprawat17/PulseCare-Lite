import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface MoodSliderProps {
  onMoodSelect: (mood: number, note?: string) => void;
}

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1 },
  { emoji: "😞", label: "Sad", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "😊", label: "Good", value: 4 },
  { emoji: "😄", label: "Great", value: 5 },
];

export const MoodSlider = ({ onMoodSelect }: MoodSliderProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [hoveredMood, setHoveredMood] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const handleMoodClick = (value: number) => {
    setSelectedMood(value);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood, note);
    }
  };

  return (
    <Card className="p-8 bg-card shadow-card border-0 rounded-3xl">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-medium text-foreground mb-3">
            How are you feeling today?
          </h2>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {moodEmojis.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodClick(mood.value)}
              onMouseEnter={() => setHoveredMood(mood.value)}
              onMouseLeave={() => setHoveredMood(null)}
              className={`
                relative p-3 rounded-full transition-all duration-300 transform
                ${selectedMood === mood.value 
                  ? 'bg-primary scale-110 shadow-soft' 
                  : hoveredMood === mood.value 
                    ? 'bg-primary-soft scale-105' 
                    : 'bg-muted hover:bg-primary-soft'
                }
              `}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <div className={`
                absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap
                transition-opacity duration-200
                ${(selectedMood === mood.value || hoveredMood === mood.value) 
                  ? 'opacity-100' 
                  : 'opacity-0'
                }
              `}>
                {mood.label}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Describe your day... (optional)
          </label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind today?"
            className="min-h-[80px] resize-none border-border bg-input/50 focus:bg-input"
            maxLength={200}
          />
        </div>

        {selectedMood && (
          <div className="animate-fade-in pt-2">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-card"
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};