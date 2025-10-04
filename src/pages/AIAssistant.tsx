import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI safety assistant. I can help you with:\n• Finding nearby shelters\n• Evacuation planning\n• Emergency supplies checklist\n• Safety tips for disasters\n\nHow can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Which shelter is closest?",
    "What should I pack?",
    "Is my area safe?",
    "Show evacuation route"
  ];

  const aiResponses: { [key: string]: string } = {
    "shelter": "The closest shelter to your location is City Hall Shelter, just 0.8 km away. It has a capacity of 500 people and provides:\n• Food and water\n• Medical assistance\n• Sleeping arrangements\n• Communication facilities\n\nWould you like directions?",
    "pack": "Essential items for evacuation:\n\n📦 Documents:\n• ID, insurance papers\n• Medical records\n• Emergency contacts\n\n💊 Medical:\n• First aid kit\n• Medications\n• Prescription copies\n\n🎒 Supplies:\n• Water (1 gallon/person/day)\n• Non-perishable food\n• Flashlight & batteries\n• Phone charger\n• Cash\n• Blankets\n\nRemember: Pack light but pack smart!",
    "safe": "Based on current risk analysis:\n\n✅ Your area: MEDIUM RISK\n• No immediate danger\n• Heavy rainfall warning active\n• Flood risk in low-lying areas\n\nRecommendations:\n• Stay informed\n• Prepare evacuation bag\n• Know your evacuation route\n• Keep phone charged\n\nI'll notify you if the situation changes.",
    "route": "I've found the safest evacuation route for you:\n\n📍 From: Your Location\n🏛️ To: City Hall Shelter (0.8 km)\n\n⚠️ Route avoids:\n• Flooded downtown area\n• High-risk zones\n• Damaged roads\n\nEstimated time: 12 minutes walking\n\nWould you like me to open the map with this route?"
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("shelter") || lowerMessage.includes("closest")) {
      return aiResponses.shelter;
    } else if (lowerMessage.includes("pack") || lowerMessage.includes("take") || lowerMessage.includes("bring")) {
      return aiResponses.pack;
    } else if (lowerMessage.includes("safe") || lowerMessage.includes("area") || lowerMessage.includes("risk")) {
      return aiResponses.safe;
    } else if (lowerMessage.includes("route") || lowerMessage.includes("evacuation") || lowerMessage.includes("directions")) {
      return aiResponses.route;
    } else {
      return "I understand you're asking about safety. I can help with:\n• Shelter locations\n• Evacuation planning\n• Emergency supplies\n• Risk assessment\n\nCould you ask me about one of these topics?";
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-card">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-white/20"
          onClick={() => navigate("/")}
        >
          <Home className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-safe rounded-full animate-pulse" />
          <h1 className="font-semibold">AI Assistant</h1>
        </div>
        <div className="w-10" />
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <Card
              className={`max-w-[85%] p-4 border-none shadow-card ${
                message.isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card'
              }`}
            >
              <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </Card>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <Card className="p-4 border-none shadow-card bg-card">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-xs text-muted-foreground mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 pb-6 pt-4 bg-background border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
