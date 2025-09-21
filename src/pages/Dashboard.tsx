import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Calendar, Heart, Trash2, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

interface MoodEntry {
  mood: number;
  note?: string;
  timestamp: string;
  date: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('moodHistory');
    if (stored) {
      setMoodHistory(JSON.parse(stored));
    }
  }, []);

  const clearData = () => {
    if (confirm('Are you sure you want to clear all mood data? This cannot be undone.')) {
      localStorage.removeItem('moodHistory');
      setMoodHistory([]);
    }
  };

  const getMoodLabel = (mood: number) => {
    const labels = ['', 'Very Sad', 'Sad', 'Neutral', 'Good', 'Great'];
    return labels[mood] || 'Unknown';
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ['', '😢', '😞', '😐', '😊', '😄'];
    return emojis[mood] || '😐';
  };

  // Get last 7 entries for trend visualization
  const recentMoods = moodHistory.slice(-7).map((entry, index) => ({
    day: index === 6 ? 'Today' : `${7 - index} days ago`,
    mood: entry.mood,
    date: new Date(entry.timestamp).toLocaleDateString(),
  }));

  // Calculate insights
  const getInsights = () => {
    if (moodHistory.length < 2) return "Track a few more moods to see insights.";
    
    const recent5 = moodHistory.slice(-5);
    const goodMoods = recent5.filter(entry => entry.mood >= 4).length;
    const lowMoods = recent5.filter(entry => entry.mood <= 2).length;
    const avgMood = recent5.reduce((sum, entry) => sum + entry.mood, 0) / recent5.length;
    
    if (goodMoods >= 3) {
      return `Great progress! You've felt good ${goodMoods} times in your last 5 check-ins.`;
    } else if (lowMoods >= 3) {
      return `You might need some extra self-care - ${lowMoods} tough days in your last 5 check-ins.`;
    } else if (avgMood > 3.5) {
      return "You're maintaining a positive trend overall.";
    } else {
      return "Remember, it's okay to have ups and downs. You're taking good care of yourself by checking in.";
    }
  };

  const averageMood = moodHistory.length > 0 
    ? (moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length).toFixed(1)
    : '0';

  const lastEntry = moodHistory[moodHistory.length - 1];

  return (
    <div className="min-h-screen p-4 pb-20" style={{background: 'var(--gradient-wellness)'}}>
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              onClick={() => navigate('/')}
              variant="ghost" 
              size="sm"
              className="mr-4 p-2 rounded-full hover:bg-card/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Your Insights</h1>
          </div>
          {moodHistory.length > 0 && (
            <Button
              onClick={clearData}
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {moodHistory.length === 0 ? (
          <Card className="p-8 bg-card shadow-card border-0 rounded-3xl text-center">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Ready to start tracking?
            </h2>
            <p className="text-muted-foreground mb-6">
              Check in with yourself daily to build insights about your wellbeing
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-6"
            >
              Start Check-in
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Key Insights */}
            <Card className="p-6 bg-card shadow-card border-0 rounded-3xl">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Insight</h3>
                  <p className="text-muted-foreground leading-relaxed">{getInsights()}</p>
                </div>
              </div>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-card shadow-card border-0 rounded-2xl text-center">
                <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{averageMood}</div>
                <div className="text-sm text-muted-foreground">Average Mood</div>
              </Card>

              <Card className="p-4 bg-card shadow-card border-0 rounded-2xl text-center">
                <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{moodHistory.length}</div>
                <div className="text-sm text-muted-foreground">Check-ins</div>
              </Card>
            </div>

            {/* Latest Check-in */}
            {lastEntry && (
              <Card className="p-4 bg-card shadow-card border-0 rounded-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-3">Latest Check-in</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getMoodEmoji(lastEntry.mood)}</span>
                    <div>
                      <div className="font-medium text-foreground">{getMoodLabel(lastEntry.mood)}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(lastEntry.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                {lastEntry.note && (
                  <div className="mt-3 p-3 bg-muted/30 rounded-xl">
                    <p className="text-sm text-muted-foreground italic">"{lastEntry.note}"</p>
                  </div>
                )}
              </Card>
            )}

            {/* Mood Trend */}
            {recentMoods.length > 1 && (
              <Card className="p-4 bg-card shadow-card border-0 rounded-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recent Trend
                </h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recentMoods}>
                      <XAxis 
                        dataKey="day" 
                        fontSize={10} 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[1, 5]} 
                        fontSize={10}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {/* Privacy Note */}
            <Card className="p-4 bg-card/60 backdrop-blur-sm rounded-2xl">
              <p className="text-xs text-muted-foreground text-center">
                Your data is stored locally on your device and never shared. 
                Use the trash icon above to clear all data if needed.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;