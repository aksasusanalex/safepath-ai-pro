import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, X, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Shelter {
  id: number;
  name: string;
  distance: string;
  capacity: string;
  x: number;
  y: number;
}

const MapScreen = () => {
  const navigate = useNavigate();
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const shelters: Shelter[] = [
    { id: 1, name: "City Hall Shelter", distance: "0.8 km", capacity: "500", x: 45, y: 35 },
    { id: 2, name: "Community Center", distance: "1.2 km", capacity: "300", x: 65, y: 55 },
    { id: 3, name: "Sports Complex", distance: "2.1 km", capacity: "800", x: 30, y: 65 }
  ];

  const handleShelterClick = (shelter: Shelter) => {
    setSelectedShelter(shelter);
    setShowRoute(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <Home className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold">Risk Map</h1>
        <Button variant="ghost" size="icon">
          <Navigation className="w-5 h-5" />
        </Button>
      </header>

      {/* Alert Popup */}
      {showAlert && (
        <div className="absolute top-20 left-6 right-6 z-20 animate-fade-in">
          <Card className="p-4 bg-gradient-to-r from-danger to-danger/80 text-danger-foreground border-none shadow-elevated">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">⚠️ Flood Alert</p>
                <p className="text-xs opacity-90">Avoid downtown area. High water levels detected.</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-danger-foreground hover:bg-white/20 h-8 w-8"
                onClick={() => setShowAlert(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Map Container */}
      <div className="relative h-[calc(100vh-180px)] mx-6 mt-6 rounded-2xl overflow-hidden shadow-card">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-accent">
          {/* Risk Zones */}
          <div className="absolute top-[15%] left-[20%] w-[35%] h-[25%] bg-danger/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-[45%] right-[15%] w-[40%] h-[30%] bg-warning/30 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] left-[15%] w-[45%] h-[35%] bg-safe/30 rounded-full blur-3xl" />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* User Location */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse" />
              <div className="absolute inset-0 w-6 h-6 bg-primary/30 rounded-full animate-ping" />
            </div>
          </div>

          {/* Shelters */}
          {shelters.map((shelter) => (
            <button
              key={shelter.id}
              onClick={() => handleShelterClick(shelter)}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                selectedShelter?.id === shelter.id
                  ? 'bg-safe text-safe-foreground ring-4 ring-safe/50 shadow-elevated scale-110'
                  : 'bg-white text-foreground shadow-card'
              }`}
              style={{ left: `${shelter.x}%`, top: `${shelter.y}%` }}
            >
              <MapPin className="w-5 h-5" />
            </button>
          ))}

          {/* Route Line (SVG) */}
          {showRoute && selectedShelter && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none animate-fade-in">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--safe))" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d={`M 50% 50% Q ${(50 + selectedShelter.x) / 2}% ${(50 + selectedShelter.y) / 2 - 10}% ${selectedShelter.x}% ${selectedShelter.y}%`}
                stroke="url(#routeGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="10 5"
                className="animate-[dash_2s_linear_infinite]"
                style={{
                  animation: 'dash 2s linear infinite'
                }}
              />
            </svg>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mx-6 mt-4 flex gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-danger rounded-full" />
          <span className="text-muted-foreground">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-warning rounded-full" />
          <span className="text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-safe rounded-full" />
          <span className="text-muted-foreground">Safe</span>
        </div>
      </div>

      {/* Shelter Info Card */}
      {selectedShelter && (
        <div className="fixed bottom-24 left-6 right-6 z-30 animate-slide-up">
          <Card className="p-5 border-none shadow-elevated bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base">{selectedShelter.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedShelter.distance} away</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setSelectedShelter(null);
                  setShowRoute(false);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-safe hover:bg-safe/90">
                Navigate
              </Button>
              <Button variant="outline" className="flex-1">
                Details
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Capacity: {selectedShelter.capacity} people
            </p>
          </Card>
        </div>
      )}

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -30;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MapScreen;
