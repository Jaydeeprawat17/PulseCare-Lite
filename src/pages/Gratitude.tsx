import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GratitudeEntry {
  id: string;
  content: string;
  date: string;
  timestamp: number;
}

const Gratitude = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pulsecare-gratitude");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const saveEntry = () => {
    if (!newEntry.trim()) return;

    const entry: GratitudeEntry = {
      id: Date.now().toString(),
      content: newEntry.trim(),
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    const updatedEntries = [entry, ...entries].slice(0, 10); // Keep last 10 entries
    setEntries(updatedEntries);
    localStorage.setItem("pulsecare-gratitude", JSON.stringify(updatedEntries));
    
    setNewEntry("");
    setIsWriting(false);
    
    toast({
      description: "Gratitude entry saved 💝",
    });
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("pulsecare-gratitude", JSON.stringify(updatedEntries));
    
    toast({
      description: "Entry removed",
    });
  };

  const gratitudePrompts = [
    "What made you smile today?",
    "Who are you thankful for and why?",
    "What's one small thing that brought you joy?",
    "What strength did you show today?",
    "What's something beautiful you noticed?"
  ];

  const todayPrompt = gratitudePrompts[new Date().getDay() % gratitudePrompts.length];

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
          <h1 className="text-xl font-semibold text-foreground">Gratitude Journal</h1>
        </div>

        {/* New Entry Section */}
        {!isWriting ? (
          <Card className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in">
            <div className="text-center">
              <Heart className="w-12 h-12 text-wellness mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Today's reflection
              </h3>
              <p className="text-muted-foreground mb-4">
                {todayPrompt}
              </p>
              <Button
                onClick={() => setIsWriting(true)}
                className="bg-wellness hover:bg-wellness/90 text-wellness-foreground rounded-2xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Write gratitude
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What are you grateful for today?
            </h3>
            <Textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="I'm grateful for..."
              className="mb-4 rounded-2xl border-border bg-background/50 min-h-32"
              autoFocus
            />
            <div className="flex gap-3">
              <Button
                onClick={saveEntry}
                disabled={!newEntry.trim()}
                className="flex-1 bg-wellness hover:bg-wellness/90 text-wellness-foreground rounded-2xl"
              >
                Save entry
              </Button>
              <Button
                onClick={() => {
                  setIsWriting(false);
                  setNewEntry("");
                }}
                variant="outline"
                className="rounded-2xl"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Previous Entries */}
        {entries.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your gratitude journey</h3>
            {entries.map((entry) => (
              <Card key={entry.id} className="p-4 bg-card/60 backdrop-blur-sm rounded-3xl shadow-soft animate-fade-in">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                  <Button
                    onClick={() => deleteEntry(entry.id)}
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-destructive/10 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
                <p className="text-foreground leading-relaxed">{entry.content}</p>
              </Card>
            ))}
          </div>
        )}

        {entries.length === 0 && !isWriting && (
          <Card className="p-8 bg-card/60 backdrop-blur-sm rounded-3xl shadow-soft text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Start your gratitude practice
            </h3>
            <p className="text-muted-foreground">
              Research shows that practicing gratitude can improve mental wellbeing and life satisfaction.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Gratitude;