import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoodSlider } from "@/components/MoodSlider";
import { Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleMoodSelect = (mood: number, note?: string) => {
    // Store mood data in localStorage
    const moodData = {
      mood,
      note: note || "",
      timestamp: new Date().toISOString(),
      date: new Date().toDateString(),
    };
    
    const existingMoods = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    existingMoods.push(moodData);
    
    // Keep only last 30 entries
    const recentMoods = existingMoods.slice(-30);
    localStorage.setItem('moodHistory', JSON.stringify(recentMoods));
    
    navigate('/breathing', { state: { mood, note: note || "", timestamp: moodData.timestamp } });
  };

  return (
    <div className="min-h-screen p-4 pb-20" style={{background: 'var(--gradient-calm)'}}>
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-soft mb-6">
            <Heart className="w-8 h-8 text-primary-foreground animate-pulse-calm" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Check in with yourself
          </h1>
          <p className="text-base text-muted-foreground">
            Take a moment to reflect on how you're feeling
          </p>
        </div>

        {/* Mood Slider */}
        <div className="mb-8">
          <MoodSlider onMoodSelect={handleMoodSelect} />
        </div>
      </div>
    </div>
  );
};

export default Home;
