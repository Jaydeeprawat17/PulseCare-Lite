import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Moon, Trash2, Download, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  reminderTime: string;
  dataRetention: number; // days
}

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>({
    notifications: false,
    darkMode: false,
    reminderTime: "09:00",
    dataRetention: 30
  });

  useEffect(() => {
    const stored = localStorage.getItem("pulsecare-settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const updateSetting = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("pulsecare-settings", JSON.stringify(newSettings));
    
    toast({
      description: "Settings updated",
    });
  };

  const exportData = () => {
    const data = {
      moods: JSON.parse(localStorage.getItem("pulsecare-moods") || "[]"),
      gratitude: JSON.parse(localStorage.getItem("pulsecare-gratitude") || "[]"),
      meditation: JSON.parse(localStorage.getItem("pulsecare-meditation") || "[]"),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pulsecare-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      description: "Data exported successfully 📋",
    });
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all your data? This cannot be undone.")) {
      localStorage.removeItem("pulsecare-moods");
      localStorage.removeItem("pulsecare-gratitude");
      localStorage.removeItem("pulsecare-meditation");
      
      toast({
        description: "All data cleared",
      });
    }
  };

  const getDataStats = () => {
    const moods = JSON.parse(localStorage.getItem("pulsecare-moods") || "[]");
    const gratitude = JSON.parse(localStorage.getItem("pulsecare-gratitude") || "[]");
    const meditation = JSON.parse(localStorage.getItem("pulsecare-meditation") || "[]");
    
    return {
      moods: moods.length,
      gratitude: gratitude.length,
      meditation: meditation.length,
      totalSize: Math.round((JSON.stringify({ moods, gratitude, meditation }).length) / 1024)
    };
  };

  const stats = getDataStats();

  return (
    <div className="min-h-screen p-4 pb-20" style={{background: 'var(--gradient-calm)'}}>
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
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        </div>

        {/* Notifications */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Daily Reminders</h3>
                <p className="text-sm text-muted-foreground">Get gentle nudges to check in</p>
              </div>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
          
          {settings.notifications && (
            <div className="border-t border-border pt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Reminder time
              </label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => updateSetting('reminderTime', e.target.value)}
                className="w-full p-2 rounded-xl border border-border bg-background/50 text-foreground"
              />
            </div>
          )}
        </Card>

        {/* Theme */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">Comfortable viewing in low light</p>
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => updateSetting('darkMode', checked)}
            />
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl shadow-soft mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Your Data</h3>
              <p className="text-sm text-muted-foreground">Manage your wellness information</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Data Stats */}
            <div className="bg-background/30 rounded-2xl p-4">
              <h4 className="font-medium text-foreground mb-2">Storage overview</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{stats.moods}</div>
                  <div className="text-xs text-muted-foreground">Mood entries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{stats.gratitude}</div>
                  <div className="text-xs text-muted-foreground">Gratitude notes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{stats.meditation}</div>
                  <div className="text-xs text-muted-foreground">Meditations</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Total: {stats.totalSize}KB stored locally
              </p>
            </div>

            {/* Data Actions */}
            <div className="space-y-3">
              <Button
                onClick={exportData}
                variant="outline"
                className="w-full rounded-2xl justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Export my data
              </Button>
              
              <Button
                onClick={clearAllData}
                variant="outline"
                className="w-full rounded-2xl justify-start text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear all data
              </Button>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <Card className="p-6 bg-card/60 backdrop-blur-sm rounded-3xl shadow-soft">
          <h3 className="text-base font-semibold text-foreground mb-3">
            Privacy & Security
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• All data is stored locally on your device</p>
            <p>• No information is sent to external servers</p>
            <p>• You have full control over your wellness data</p>
            <p>• Export your data anytime in JSON format</p>
          </div>
        </Card>

        {/* App Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            PulseCare Lite v1.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your mental wellness companion
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;