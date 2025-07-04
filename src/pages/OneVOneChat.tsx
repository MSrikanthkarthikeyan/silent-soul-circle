import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { 
  MessageCircle, 
  User, 
  Send, 
  UserX, 
  Flag, 
  Heart,
  Clock,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  sender: string;
}

interface ChatSession {
  id: string;
  partnerId: string;
  partnerMood: string;
  startTime: Date;
  isActive: boolean;
}

const OneVOneChat = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userMood, setUserMood] = useState("Support");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const moods = ["Support", "Lonely", "Anxious", "Sad", "Heartbreak", "Student Stress", "Recovery"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate anonymous ID
  const getAnonymousId = () => {
    let id = localStorage.getItem('anonymous_id');
    if (!id) {
      id = 'anon_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('anonymous_id', id);
    }
    return id;
  };

  const startSearching = () => {
    setIsSearching(true);
    
    // Simulate matching process
    setTimeout(() => {
      // Simulate finding a match
      const partnerId = 'anon_' + Math.random().toString(36).substr(2, 9);
      const partnerMoods = moods.filter(m => m !== userMood);
      const partnerMood = partnerMoods[Math.floor(Math.random() * partnerMoods.length)];
      
      const session: ChatSession = {
        id: Date.now().toString(),
        partnerId,
        partnerMood,
        startTime: new Date(),
        isActive: true
      };
      
      setChatSession(session);
      setIsSearching(false);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        content: "You've been connected with someone who understands. This is a safe space to share and listen. Remember to be kind to each other. 💙",
        timestamp: new Date(),
        isOwn: false,
        sender: "System"
      };
      
      setMessages([welcomeMessage]);
      
      toast({
        title: "Connected!",
        description: `You're now chatting with someone feeling ${partnerMood.toLowerCase()}.`
      });

      // Simulate partner typing after a delay
      setTimeout(() => {
        addPartnerMessage("Hi there... thanks for being here. I could really use someone to talk to right now.");
      }, 3000);
      
    }, Math.random() * 8000 + 2000); // 2-10 seconds
  };

  const addPartnerMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isOwn: false,
      sender: chatSession?.partnerId || "Partner"
    };
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatSession) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
      sender: getAnonymousId()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate partner responses
    setTimeout(() => {
      const responses = [
        "I really appreciate you sharing that with me.",
        "That sounds really difficult. I've felt something similar.",
        "Thank you for listening. It means more than you know.",
        "I'm here for you too. We'll get through this.",
        "Your words really resonate with me.",
        "It's comforting to know I'm not alone in feeling this way."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addPartnerMessage(randomResponse);
    }, 2000 + Math.random() * 3000);
  };

  const endChat = () => {
    setChatSession(null);
    setMessages([]);
    toast({
      title: "Chat ended",
      description: "Take care of yourself. You're always welcome back."
    });
  };

  const reportUser = () => {
    toast({
      title: "User reported",
      description: "Thank you for keeping our community safe. The user has been reported.",
      variant: "destructive"
    });
    endChat();
  };

  if (!chatSession && !isSearching) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <Navigation />
        
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Find Your <span className="hero-text">Support Buddy</span>
              </h1>
              <p className="text-xl text-foreground-muted mb-8">
                Connect anonymously with someone who understands what you're going through. 
                Share, listen, and support each other in a safe 1-on-1 conversation.
              </p>
            </div>

            <Card className="feature-card">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    What best describes how you're feeling right now?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {moods.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setUserMood(mood)}
                        className={`p-3 rounded-lg border transition-all ${
                          userMood === mood
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-border/80 hover:bg-muted/50"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button 
                    size="lg" 
                    onClick={startSearching}
                    className="w-full text-lg py-6"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Find Someone to Talk To
                  </Button>
                  
                  <p className="text-sm text-foreground-muted mt-4">
                    You'll be matched with someone anonymously. You can leave the chat at any time.
                  </p>
                </div>
              </div>
            </Card>

            {/* Safety Information */}
            <Card className="feature-card mt-8">
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto text-healing mb-4" />
                <h3 className="text-lg font-semibold mb-3">Safe Space Guidelines</h3>
                <div className="text-sm text-foreground-muted space-y-2 text-left">
                  <p>• Be kind, empathetic, and respectful</p>
                  <p>• Listen without judgment</p>
                  <p>• Don't share personal information</p>
                  <p>• Report inappropriate behavior</p>
                  <p>• Leave if you feel uncomfortable</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <Navigation />
        
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl">
            <Card className="feature-card text-center">
              <div className="py-12">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Search className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Finding someone for you...</h2>
                <p className="text-foreground-muted mb-6">
                  Looking for someone who understands "{userMood.toLowerCase()}" feelings.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" onClick={() => setIsSearching(false)}>
                    Cancel Search
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <section className="pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Chat Header */}
          <Card className="feature-card mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-support rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold">Anonymous Chat</h3>
                  <p className="text-sm text-foreground-muted">
                    Connected • Feeling: {chatSession.partnerMood}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={reportUser}>
                  <Flag className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={endChat}>
                  <UserX className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Chat Messages */}
          <Card className="feature-card h-96 mb-4">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : message.sender === 'System'
                          ? 'bg-muted text-foreground text-center mx-auto'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-primary-foreground/70' : 'text-foreground-muted'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </Card>

          {/* Message Input */}
          <Card className="feature-card">
            <form onSubmit={sendMessage} className="flex space-x-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default OneVOneChat;