import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Users, MessageCircle, Heart, Clock, Star } from "lucide-react";

const ChatRooms = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { name: "All", color: "muted" },
    { name: "Anxious", color: "warning" },
    { name: "Depressed", color: "support" },
    { name: "Lonely", color: "primary" },
    { name: "Healing", color: "healing" },
    { name: "Student Stress", color: "accent" }
  ];

  const chatRooms = [
    {
      id: "feeling-numb",
      name: "Feeling Numb",
      description: "A space for those experiencing emotional numbness and disconnection",
      participants: 23,
      mood: "Depressed",
      isActive: true,
      gradient: "gradient-support"
    },
    {
      id: "student-stress", 
      name: "Student Stress",
      description: "Academic pressure, exam anxiety, and student life challenges",
      participants: 45,
      mood: "Anxious",
      isActive: true,
      gradient: "gradient-primary"
    },
    {
      id: "relationship-wounds",
      name: "Relationship Wounds", 
      description: "Heartbreak, betrayal, and healing from relationship trauma",
      participants: 17,
      mood: "Healing",
      isActive: true,
      gradient: "gradient-healing"
    },
    {
      id: "workplace-burnout",
      name: "Workplace Burnout",
      description: "Career stress, toxic work environments, and professional exhaustion",
      participants: 31,
      mood: "Anxious",
      isActive: true,
      gradient: "gradient-warning"
    },
    {
      id: "midnight-thoughts",
      name: "Midnight Thoughts",
      description: "Late night conversations for insomnia and racing thoughts",
      participants: 12,
      mood: "Lonely",
      isActive: true,
      gradient: "gradient-primary"
    },
    {
      id: "recovery-journey",
      name: "Recovery Journey",
      description: "Celebrating progress and supporting each other through healing",
      participants: 29,
      mood: "Healing",
      isActive: true,
      gradient: "gradient-healing"
    },
    {
      id: "social-anxiety",
      name: "Social Anxiety",
      description: "Fear of judgment, social situations, and building confidence",
      participants: 38,
      mood: "Anxious",
      isActive: true,
      gradient: "gradient-warning"
    },
    {
      id: "creative-souls",
      name: "Creative Souls",
      description: "Artists, writers, and creators sharing struggles and inspiration",
      participants: 22,
      mood: "Healing",
      isActive: true,
      gradient: "gradient-accent"
    }
  ];

  const filteredRooms = selectedMood && selectedMood !== "All" 
    ? chatRooms.filter(room => room.mood === selectedMood)
    : chatRooms;

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Join a <span className="hero-text">supportive</span> conversation
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Find your community in themed chat rooms designed for specific experiences. 
              Every conversation is anonymous, moderated, and judgment-free.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold hero-text mb-1">127</div>
              <div className="text-sm text-foreground-muted">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold hero-text mb-1">8</div>
              <div className="text-sm text-foreground-muted">Live Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold hero-text mb-1">24/7</div>
              <div className="text-sm text-foreground-muted">Moderated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold hero-text mb-1">Safe</div>
              <div className="text-sm text-foreground-muted">Always</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mood Filter */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-4">Filter by mood or experience</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {moods.map((mood) => (
                <Button
                  key={mood.name}
                  variant={selectedMood === mood.name ? "default" : "outline"}
                  onClick={() => setSelectedMood(mood.name)}
                  className="rounded-full"
                >
                  {mood.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Rooms Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="feature-card group cursor-pointer">
                <Link to={`/chatroom/${room.id}`} className="block h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-${room.gradient} rounded-xl flex items-center justify-center`}>
                      <MessageCircle className="w-6 h-6 text-background" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {room.mood}
                      </Badge>
                      {room.isActive && (
                        <div className="w-3 h-3 bg-healing rounded-full animate-glow"></div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {room.name}
                  </h3>
                  
                  <p className="text-foreground-muted mb-4 leading-relaxed">
                    {room.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-foreground-muted">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{room.participants} active</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Now</span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* Create Room CTA */}
          <div className="mt-12 text-center">
            <Card className="feature-card max-w-2xl mx-auto">
              <div className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Don't see what you need?</h3>
                <p className="text-foreground-muted mb-6">
                  Suggest a new room topic or connect with our community moderators 
                  to create a space that addresses your specific needs.
                </p>
                <Button variant="outline">
                  Suggest a Room
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">Your Safety Matters</h3>
            <p className="text-foreground-muted leading-relaxed">
              All chat rooms are actively moderated by trained volunteers and AI systems. 
              If you encounter any inappropriate content or feel unsafe, use the report function 
              or reach out to our crisis support team. Remember, if you're in immediate danger, 
              please contact your local emergency services.
            </p>
            <div className="mt-6">
              <Link to="/sos">
                <Button variant="emergency">
                  Crisis Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatRooms;