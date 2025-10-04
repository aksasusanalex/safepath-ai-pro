import { Home, MapPin, Phone, MessageSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: MapPin, label: "Map", path: "/map" },
    { icon: Phone, label: "Emergency", path: "/emergency" },
    { icon: MessageSquare, label: "AI", path: "/assistant" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-elevated z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className={`relative transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                <Icon className="w-6 h-6" />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
