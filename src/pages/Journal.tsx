import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { Heart, MessageCircle, User, Calendar, Plus, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  aiMoodTag: string;
  timestamp: Date;
  reactions: {
    heart: number;
    hug: number;
    relate: number;
  };
  anonymous_id: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState({ title: "", content: "", mood: "" });
  const [showForm, setShowForm] = useState(false);
  const [filterMood, setFilterMood] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const moods = ["All", "Sad", "Anxious", "Lonely", "Hopeful", "Overwhelmed", "Grateful", "Lost"];

  // Generate anonymous ID for user
  const getAnonymousId = () => {
    let id = localStorage.getItem('anonymous_id');
    if (!id) {
      id = 'anon_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('anonymous_id', id);
    }
    return id;
  };

  // AI mood analysis using Gemini
  const analyzeEntryMood = async (content: string): Promise<string> => {
    try {
      const response = await fetch('/api/analyze-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.mood || "Neutral";
      }
    } catch (error) {
      console.error('AI mood analysis failed:', error);
    }
    return "Neutral";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Get AI mood analysis
    const aiMoodTag = await analyzeEntryMood(newEntry.content);
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood || "Not specified",
      aiMoodTag,
      timestamp: new Date(),
      reactions: { heart: 0, hug: 0, relate: 0 },
      anonymous_id: getAnonymousId()
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({ title: "", content: "", mood: "" });
    setShowForm(false);
    setIsSubmitting(false);
    
    toast({
      title: "Journal entry shared",
      description: "Your thoughts have been added to the community journal."
    });
  };

  const handleReaction = (entryId: string, reactionType: keyof JournalEntry['reactions']) => {
    setEntries(prev => prev.map(entry => 
      entry.id === entryId 
        ? { ...entry, reactions: { ...entry.reactions, [reactionType]: entry.reactions[reactionType] + 1 }}
        : entry
    ));
  };

  const filteredEntries = filterMood === "All" 
    ? entries 
    : entries.filter(entry => entry.aiMoodTag === filterMood || entry.mood === filterMood);

  // Mock entries for demo
  useEffect(() => {
    const mockEntries: JournalEntry[] = [
      {
        id: "1",
        title: "Feeling disconnected",
        content: "I've been feeling really disconnected from everyone lately. It's like I'm watching life happen around me but not really participating. I know I should reach out to friends, but it feels so hard to make that first step.",
        mood: "Lonely",
        aiMoodTag: "Lonely",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        reactions: { heart: 12, hug: 8, relate: 15 },
        anonymous_id: "anon_demo1"
      },
      {
        id: "2", 
        title: "Small victory today",
        content: "I managed to get out of bed before noon and even took a shower. It might seem small to others, but for me right now, it feels like climbing a mountain. Taking it one day at a time.",
        mood: "Hopeful",
        aiMoodTag: "Hopeful",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        reactions: { heart: 24, hug: 6, relate: 9 },
        anonymous_id: "anon_demo2"
      }
    ];
    setEntries(mockEntries);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Anonymous <span className="hero-text">Journal</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Share your thoughts and feelings in a safe, anonymous space. 
              Connect with others through shared experiences and gentle support.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setShowForm(!showForm)}
              className="text-lg px-8 py-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              Share Your Thoughts
            </Button>
          </div>
        </div>
      </section>

      {/* New Entry Form */}
      {showForm && (
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl">
            <Card className="feature-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    placeholder="Give your entry a title..."
                    value={newEntry.title}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">How are you feeling? (optional)</label>
                  <select 
                    className="w-full p-3 rounded-lg bg-background border border-border"
                    value={newEntry.mood}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, mood: e.target.value }))}
                  >
                    <option value="">Select your mood...</option>
                    {moods.slice(1).map(mood => (
                      <option key={mood} value={mood}>{mood}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your thoughts</label>
                  <Textarea
                    placeholder="Share what's on your mind. You're safe here..."
                    rows={6}
                    value={newEntry.content}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sharing..." : "Share Anonymously"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>
      )}

      {/* Mood Filter */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Filter className="w-5 h-5 text-foreground-muted mt-2 mr-2" />
            {moods.map(mood => (
              <Button
                key={mood}
                variant={filterMood === mood ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterMood(mood)}
                className="rounded-full"
              >
                {mood}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="feature-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{entry.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-foreground-muted">
                        <Calendar className="w-4 h-4" />
                        <span>{entry.timestamp.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{entry.mood}</Badge>
                    {entry.aiMoodTag !== entry.mood && (
                      <Badge variant="outline" className="text-xs">
                        AI: {entry.aiMoodTag}
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-foreground-muted leading-relaxed mb-6">
                  {entry.content}
                </p>

                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleReaction(entry.id, 'heart')}
                      className="flex items-center space-x-1 text-sm text-foreground-muted hover:text-healing transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{entry.reactions.heart}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(entry.id, 'hug')}
                      className="flex items-center space-x-1 text-sm text-foreground-muted hover:text-support transition-colors"
                    >
                      🫂 <span>{entry.reactions.hug}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(entry.id, 'relate')}
                      className="flex items-center space-x-1 text-sm text-foreground-muted hover:text-primary transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{entry.reactions.relate} relate</span>
                    </button>
                  </div>
                  <span className="text-xs text-foreground-muted">
                    by {entry.anonymous_id.slice(0, 10)}...
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 mx-auto text-foreground-muted mb-4" />
              <p className="text-foreground-muted">
                {filterMood === "All" 
                  ? "No journal entries yet. Be the first to share your thoughts." 
                  : `No entries found for "${filterMood}" mood.`
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Journal;