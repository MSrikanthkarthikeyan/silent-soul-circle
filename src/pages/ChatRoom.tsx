import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Send, 
  Users, 
  ArrowLeft, 
  Flag, 
  Heart,
  Bot,
  MessageCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
  isAI?: boolean;
  isSystem?: boolean;
  reactions?: {
    heart: number;
    support: number;
  };
}

interface ChatRoomData {
  id: string;
  name: string;
  description: string;
  participants: number;
  mood: string;
  gradient: string;
}

const ChatRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomData, setRoomData] = useState<ChatRoomData | null>(null);
  const [participants, setParticipants] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Room data mapping
  const roomsData: Record<string, ChatRoomData> = {
    "feeling-numb": {
      id: "feeling-numb",
      name: "Feeling Numb",
      description: "A space for those experiencing emotional numbness and disconnection",
      participants: 23,
      mood: "Depressed",
      gradient: "gradient-support"
    },
    "student-stress": {
      id: "student-stress", 
      name: "Student Stress",
      description: "Academic pressure, exam anxiety, and student life challenges",
      participants: 45,
      mood: "Anxious",
      gradient: "gradient-primary"
    },
    "relationship-wounds": {
      id: "relationship-wounds",
      name: "Relationship Wounds", 
      description: "Heartbreak, betrayal, and healing from relationship trauma",
      participants: 17,
      mood: "Healing",
      gradient: "gradient-healing"
    },
    "workplace-burnout": {
      id: "workplace-burnout",
      name: "Workplace Burnout",
      description: "Career stress, toxic work environments, and professional exhaustion",
      participants: 31,
      mood: "Anxious",
      gradient: "gradient-warning"
    },
    "midnight-thoughts": {
      id: "midnight-thoughts",
      name: "Midnight Thoughts",
      description: "Late night conversations for insomnia and racing thoughts",
      participants: 12,
      mood: "Lonely",
      gradient: "gradient-primary"
    },
    "recovery-journey": {
      id: "recovery-journey",
      name: "Recovery Journey",
      description: "Celebrating progress and supporting each other through healing",
      participants: 29,
      mood: "Healing",
      gradient: "gradient-healing"
    },
    "social-anxiety": {
      id: "social-anxiety",
      name: "Social Anxiety",
      description: "Fear of judgment, social situations, and building confidence",
      participants: 38,
      mood: "Anxious",
      gradient: "gradient-warning"
    },
    "creative-souls": {
      id: "creative-souls",
      name: "Creative Souls",
      description: "Artists, writers, and creators sharing struggles and inspiration",
      participants: 22,
      mood: "Healing",
      gradient: "gradient-accent"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (roomId && roomsData[roomId]) {
      setRoomData(roomsData[roomId]);
      setParticipants(roomsData[roomId].participants + Math.floor(Math.random() * 5));
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        content: `Welcome to ${roomsData[roomId].name}! This is a safe space for support and understanding. Remember to be kind to each other. 💙`,
        timestamp: new Date(),
        sender: "System",
        isSystem: true
      };
      
      // Add some sample messages
      const sampleMessages: Message[] = [
        {
          id: "1",
          content: "I've been struggling with this for weeks now. It feels like I'm stuck in a fog and can't see my way out.",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          sender: "anon_user_1",
          reactions: { heart: 3, support: 2 }
        },
        {
          id: "2",
          content: "I hear you. That fog feeling is so real. You're not alone in this - I've been there too. Take it one day at a time. 🫂",
          timestamp: new Date(Date.now() - 12 * 60 * 1000),
          sender: "anon_user_2",
          reactions: { heart: 5, support: 4 }
        },
        {
          id: "3",
          content: "Sometimes just acknowledging how hard things are right now is a step forward. You're brave for being here.",
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          sender: "anon_user_3",
          reactions: { heart: 2, support: 3 }
        }
      ];
      
      setMessages([welcomeMessage, ...sampleMessages]);
    } else {
      navigate('/chatrooms');
    }
  }, [roomId, navigate]);

  // Generate anonymous ID
  const getAnonymousId = () => {
    let id = localStorage.getItem('anonymous_id');
    if (!id) {
      id = 'anon_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('anonymous_id', id);
    }
    return id;
  };

  // AI command handler
  const handleAICommand = async (command: string, context: string) => {
    const aiPrompts = {
      '/ai': `You are an empathetic AI counselor in a mental health support chat room called "${roomData?.name}". Respond supportively to: "${context}". Keep it brief, warm, and helpful.`,
      '/suggest': `Provide a gentle, practical self-care suggestion for someone in a "${roomData?.name}" support group who said: "${context}". Keep it actionable and compassionate.`,
      '/help': `Offer supportive resources and gentle guidance for someone in a "${roomData?.name}" chat room. They shared: "${context}". Be brief and caring.`,
      '/vent': `Acknowledge and validate someone's feelings who is venting in a "${roomData?.name}" support chat. They said: "${context}". Respond with empathy and understanding.`
    };

    const prompt = aiPrompts[command as keyof typeof aiPrompts];
    if (!prompt) return;

    try {
      // Simulate AI response (in real app, this would call Gemini API)
      const aiResponses = [
        "I hear you, and what you're feeling is completely valid. It takes courage to share here. 💙",
        "Thank you for trusting us with your feelings. You're not alone in this journey.",
        "Your feelings matter, and it's okay to not be okay. Take things one moment at a time.",
        "I'm glad you're here. Sometimes just expressing how we feel can be the first step toward healing.",
        "What you're experiencing sounds really difficult. Remember to be gentle with yourself.",
        "You're showing incredible strength by reaching out. That's something to acknowledge."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,  
        timestamp: new Date(),
        sender: "EchoBot",
        isAI: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('AI response failed:', error);
      toast({
        title: "AI temporarily unavailable",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      sender: getAnonymousId(),
      reactions: { heart: 0, support: 0 }
    };

    setMessages(prev => [...prev, userMessage]);

    // Check for AI commands
    const aiCommands = ['/ai', '/suggest', '/help', '/vent'];
    const command = aiCommands.find(cmd => newMessage.toLowerCase().startsWith(cmd));
    
    if (command) {
      const context = newMessage.substring(command.length).trim();
      await handleAICommand(command, context);
    }

    setNewMessage("");

    // Simulate other users responding occasionally
    if (Math.random() > 0.7) {
      setTimeout(() => {
        const responses = [
          "I really felt that. Thank you for sharing.",
          "Sending you strength and support. 🫂",
          "You're not alone in feeling this way.",
          "That takes courage to share. I'm here for you.",
          "I can relate to what you're going through.",
          "Your feelings are valid. Take care of yourself."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          timestamp: new Date(),
          sender: `anon_user_${Math.floor(Math.random() * 999)}`,
          reactions: { heart: 0, support: 0 }
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000 + Math.random() * 3000);
    }
  };

  const addReaction = (messageId: string, reactionType: 'heart' | 'support') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            reactions: {
              ...msg.reactions!,
              [reactionType]: msg.reactions![reactionType] + 1
            }
          }
        : msg
    ));
  };

  const reportMessage = (messageId: string) => {
    toast({
      title: "Message reported",
      description: "Thank you for keeping our community safe. Our moderators will review this message."
    });
  };

  if (!roomData) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Room not found</h2>
          <Button onClick={() => navigate('/chatrooms')}>
            Back to Chat Rooms
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <section className="pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Chat Room Header */}
          <Card className="feature-card mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/chatrooms')}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                
                <div className={`w-12 h-12 bg-${roomData.gradient} rounded-xl flex items-center justify-center`}>
                  <MessageCircle className="w-6 h-6 text-background" />
                </div>
                
                <div>
                  <h1 className="text-xl font-bold">{roomData.name}</h1>
                  <p className="text-sm text-foreground-muted">{roomData.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">{roomData.mood}</Badge>
                <div className="flex items-center space-x-2 text-sm text-foreground-muted">
                  <Users className="w-4 h-4" />
                  <span>{participants} online</span>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Commands Help */}
          <Card className="feature-card mb-4 bg-primary/5 border-primary/20">
            <div className="flex items-start space-x-3">
              <Bot className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-foreground">
                  <strong>AI Support Available:</strong> Type <code>/ai</code>, <code>/suggest</code>, <code>/help</code>, or <code>/vent</code> followed by your message to get AI-powered support.
                </p>
              </div>
            </div>
          </Card>

          {/* Chat Messages */}
          <Card className="feature-card h-96 mb-4">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="group">
                    <div className={`flex items-start space-x-3 ${
                      message.isSystem ? 'justify-center' : ''
                    }`}>
                      {!message.isSystem && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          message.isAI 
                            ? 'bg-gradient-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}>
                          {message.isAI ? '🤖' : message.sender.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      
                      <div className={`flex-1 ${message.isSystem ? 'text-center' : ''}`}>
                        <div className={`${
                          message.isSystem 
                            ? 'bg-muted/50 text-center px-4 py-2 rounded-lg mx-auto max-w-md'
                            : 'bg-background border border-border/50 rounded-lg p-3'
                        }`}>
                          {!message.isSystem && (
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-xs font-medium ${
                                message.isAI ? 'text-primary' : 'text-foreground-muted'
                              }`}>
                                {message.isAI ? 'EchoBot' : message.sender}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-foreground-muted">
                                  {message.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => reportMessage(message.id)}
                                >
                                  <Flag className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          <p className={`text-sm ${
                            message.isSystem ? 'text-foreground-muted' : 'text-foreground'
                          }`}>
                            {message.content}
                          </p>
                          
                          {message.reactions && !message.isSystem && (
                            <div className="flex items-center space-x-3 mt-3 pt-2 border-t border-border/30">
                              <button
                                onClick={() => addReaction(message.id, 'heart')}
                                className="flex items-center space-x-1 text-xs text-foreground-muted hover:text-healing transition-colors"
                              >
                                <Heart className="w-3 h-3" />
                                <span>{message.reactions.heart}</span>
                              </button>
                              <button
                                onClick={() => addReaction(message.id, 'support')}
                                className="flex items-center space-x-1 text-xs text-foreground-muted hover:text-primary transition-colors"
                              >
                                🫂 <span>{message.reactions.support}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
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
                placeholder="Share your thoughts... (Try /ai, /suggest, /help, or /vent for AI support)"
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

export default ChatRoom;