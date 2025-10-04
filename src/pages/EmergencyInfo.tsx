import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MapPin, Home, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Contact {
  id: number;
  name: string;
  type: string;
  phone: string;
  distance: string;
  icon: string;
  color: string;
}

const EmergencyInfo = () => {
  const navigate = useNavigate();

  const contacts: Contact[] = [
    {
      id: 1,
      name: "City Emergency Services",
      type: "Emergency Hotline",
      phone: "911",
      distance: "24/7 Available",
      icon: "🚨",
      color: "from-danger to-danger/80"
    },
    {
      id: 2,
      name: "Central Hospital",
      type: "Hospital",
      phone: "(555) 123-4567",
      distance: "1.2 km away",
      icon: "🏥",
      color: "from-primary to-primary/80"
    },
    {
      id: 3,
      name: "Police Station - District 5",
      type: "Police",
      phone: "(555) 234-5678",
      distance: "0.8 km away",
      icon: "👮",
      color: "from-safe to-safe/80"
    },
    {
      id: 4,
      name: "Fire Department",
      type: "Fire & Rescue",
      phone: "(555) 345-6789",
      distance: "1.5 km away",
      icon: "🚒",
      color: "from-warning to-warning/80"
    },
    {
      id: 5,
      name: "Disaster Helpline",
      type: "Support Services",
      phone: "1-800-HELP",
      distance: "24/7 Available",
      icon: "☎️",
      color: "from-primary to-primary/80"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <Home className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold">Emergency Info</h1>
        <div className="w-10" />
      </header>

      {/* Info Banner */}
      <div className="mx-6 mt-6 bg-primary/10 border border-primary/20 p-4 rounded-xl">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Tip:</span> Save these contacts for quick access during emergencies
        </p>
      </div>

      {/* Contacts List */}
      <div className="px-6 mt-6 space-y-4">
        {contacts.map((contact, index) => (
          <Card
            key={contact.id}
            className="p-5 border-none shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0`}>
                {contact.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1">{contact.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{contact.type}</p>
                
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{contact.distance}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => window.open(`tel:${contact.phone}`)}
                >
                  <Phone className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => {}}
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="px-6 mt-8 mb-8">
        <h2 className="text-lg font-semibold mb-4">Additional Resources</h2>
        <Card className="p-5 border-none shadow-card">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
              <span className="text-sm font-medium">Disaster Preparedness Guide</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
              <span className="text-sm font-medium">Evacuation Checklist</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
              <span className="text-sm font-medium">First Aid Instructions</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyInfo;
