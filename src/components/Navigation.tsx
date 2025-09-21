import { Home, Heart, BarChart3, Book, Brain, Settings } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/breathing", icon: Heart, label: "Breathe" },
    { path: "/meditation", icon: Brain, label: "Meditate" },
    { path: "/gratitude", icon: Book, label: "Gratitude" },
    { path: "/dashboard", icon: BarChart3, label: "Progress" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-2 max-w-md mx-auto overflow-x-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center p-2 rounded-2xl transition-all duration-300 min-w-0 flex-shrink-0",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-soft scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="text-xs font-medium truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};