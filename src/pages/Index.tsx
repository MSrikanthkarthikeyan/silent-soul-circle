import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Heart, 
  Users, 
  MessageCircle, 
  Book, 
  User, 
  Star,
  Check,
  Circle
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Anonymous Community",
      description: "Connect with others who understand your journey without revealing your identity.",
      gradient: "gradient-primary"
    },
    {
      icon: MessageCircle,
      title: "Safe Chat Rooms",
      description: "Join themed conversations in moderated spaces designed for specific experiences.",
      gradient: "gradient-healing"
    },
    {
      icon: User,
      title: "1-on-1 Support",
      description: "Get matched with peers who share similar challenges for deeper conversations.",
      gradient: "gradient-support"
    },
    {
      icon: Book,
      title: "Private Journaling",
      description: "Express your thoughts in a private journal with optional community support.",
      gradient: "gradient-primary"
    },
    {
      icon: Heart,
      title: "Professional Help",
      description: "Connect with verified counselors and mental health professionals.",
      gradient: "gradient-healing"
    },
    {
      icon: Star,
      title: "AI-Assisted Care",
      description: "Receive personalized insights and gentle guidance powered by empathetic AI.",
      gradient: "gradient-support"
    }
  ];

  const testimonials = [
    {
      text: "EchoRoom gave me a voice when I felt completely silent. The community here truly understands.",
      mood: "Healing",
      color: "healing"
    },
    {
      text: "Finally found a place where I can be honest about my struggles without judgment.",
      mood: "Supported",
      color: "support"
    },
    {
      text: "The anonymous nature made it easier to open up. I found real connections here.",
      mood: "Connected",
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Where{" "}
              <span className="hero-text">unspoken thoughts</span>
              {" "}find a voice
            </h1>
            
            <p className="text-xl sm:text-2xl text-foreground-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              Join a global, anonymous community offering peer-to-peer and professional mental health support. 
              You're not alone in your journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/chatrooms">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                  Join Community
                </Button>
              </Link>
              <Link to="/sos">
                <Button variant="emergency" size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                  Need Help Now?
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { number: "24/7", label: "Support Available" },
                { number: "Anonymous", label: "Always Safe" },
                { number: "Global", label: "Community" },
                { number: "Free", label: "Forever" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold hero-text mb-1">{stat.number}</div>
                  <div className="text-sm text-foreground-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              A safe space for <span className="hero-text">every feeling</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Multiple ways to connect, share, and heal together in an environment built for understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card">
                <div className={`w-12 h-12 bg-${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground-muted leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Getting started is <span className="hero-text">simple</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Join Anonymously",
                description: "No email required. Create a session with just a nickname and mood."
              },
              {
                step: "2", 
                title: "Find Your Space",
                description: "Choose from themed chat rooms or get matched for 1-on-1 conversations."
              },
              {
                step: "3",
                title: "Connect & Heal",
                description: "Share your story, listen to others, and grow together in a supportive environment."
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-foreground-muted">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-primary"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Voices */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="hero-text">Community</span> voices
            </h2>
            <p className="text-xl text-foreground-muted">
              Real experiences from our anonymous community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="feature-card text-center">
                <div className="mb-6">
                  <Circle className={`w-12 h-12 mx-auto text-${testimonial.color} mb-4`} />
                  <p className="text-lg italic mb-4">"{testimonial.text}"</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm bg-${testimonial.color}/20 text-${testimonial.color}`}>
                    Feeling {testimonial.mood}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <Card className="feature-card max-w-3xl mx-auto">
            <div className="p-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to find your <span className="hero-text">voice</span>?
              </h2>
              <p className="text-xl text-foreground-muted mb-8">
                Join thousands of people who have found support, understanding, and hope in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/chatrooms">
                  <Button size="lg" className="w-full sm:w-auto">
                    Join Community Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hero-text">EchoRoom</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground-muted">
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/sos" className="hover:text-foreground transition-colors">Crisis Help</Link>
              <span>Privacy First</span>
              <span>Always Anonymous</span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-foreground-muted">
            <p>If you're in immediate danger, please contact your local emergency services.</p>
            <p className="mt-2">EchoRoom provides peer support and is not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;