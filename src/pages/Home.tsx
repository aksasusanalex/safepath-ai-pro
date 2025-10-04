import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, MessageSquare, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: MapPin,
      title: "View Map",
      description: "Check risk zones & shelters",
      action: () => navigate("/map"),
      gradient: "from-primary to-primary/80"
    },
    {
      icon: Phone,
      title: "Emergency",
      description: "Contacts & helplines",
      action: () => navigate("/emergency"),
      gradient: "from-danger to-danger/80"
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get instant guidance",
      action: () => navigate("/assistant"),
      gradient: "from-safe to-safe/80"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-8 rounded-b-3xl shadow-elevated">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">SafeRoute Pro</h1>
            <p className="text-sm text-primary-foreground/80">AI-Powered Safety</p>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="mx-6 mt-6 bg-gradient-to-r from-warning to-warning/80 text-warning-foreground p-4 rounded-xl shadow-card flex items-start gap-3 animate-fade-in">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm">Active Alert</p>
          <p className="text-xs opacity-90">Heavy rainfall warning in your area</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
        <div className="space-y-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="p-5 cursor-pointer hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-none shadow-card"
              onClick={action.action}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center text-white shadow-sm`}>
                  <action.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Status Cards */}
      <div className="px-6 mt-8 grid grid-cols-2 gap-4">
        <Card className="p-4 border-none shadow-card bg-gradient-to-br from-safe/10 to-safe/5">
          <div className="text-2xl font-bold text-safe">12</div>
          <div className="text-xs text-muted-foreground mt-1">Safe Zones</div>
        </Card>
        <Card className="p-4 border-none shadow-card bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-2xl font-bold text-primary">8</div>
          <div className="text-xs text-muted-foreground mt-1">Shelters Nearby</div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
