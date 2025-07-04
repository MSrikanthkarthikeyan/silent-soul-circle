import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Heart, Users, Star, Circle, Check } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Empathy First",
      description: "Every interaction is guided by genuine care and understanding for each person's unique journey."
    },
    {
      icon: Users,
      title: "Anonymous Safety",
      description: "Complete privacy protection ensures you can share openly without fear of judgment or exposure."
    },
    {
      icon: Star,
      title: "Community Driven",
      description: "Our platform grows and evolves based on the real needs and feedback of our community members."
    },
    {
      icon: Circle,
      title: "Inclusive Space",
      description: "Welcome to all backgrounds, experiences, and stages of mental health journeys without discrimination."
    }
  ];

  const features = [
    "Complete anonymity - no personal information required",
    "24/7 moderated chat rooms for different experiences",
    "One-on-one peer matching for deeper conversations", 
    "Professional counselor connections when needed",
    "AI-powered mood tracking and gentle guidance",
    "Crisis intervention and emergency resource access",
    "Multilingual support for global accessibility",
    "Private journaling with optional community support"
  ];

  const stats = [
    { number: "50,000+", label: "Community Members" },
    { number: "15", label: "Countries Served" },
    { number: "24/7", label: "Crisis Support" },
    { number: "100%", label: "Anonymous" }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className="hero-text">EchoRoom</span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground-muted mb-8 leading-relaxed">
              We believe that no one should face mental health challenges alone. 
              EchoRoom is a global sanctuary where unspoken thoughts find their voice 
              through anonymous, supportive community connections.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card className="feature-card">
              <div className="p-8 text-center">
                <Heart className="w-16 h-16 mx-auto text-primary mb-6" />
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  To create a safe, anonymous, and accessible global platform where individuals 
                  experiencing depression, anxiety, and emotional distress can find peer support, 
                  professional guidance, and the understanding that they are not alone in their journey.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="hero-text">core values</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="feature-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-foreground-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What makes EchoRoom <span className="hero-text">special</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6">Platform Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-healing mt-0.5 flex-shrink-0" />
                    <span className="text-foreground-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Community Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="feature-card text-center">
                    <div className="p-6">
                      <div className="text-3xl font-bold hero-text mb-2">{stat.number}</div>
                      <div className="text-sm text-foreground-muted">{stat.label}</div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="feature-card mt-6">
                <div className="p-6">
                  <h4 className="font-semibold mb-3">Global Reach</h4>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    Supporting individuals across North America, Europe, Asia, and Australia 
                    with localized crisis resources and multilingual chat capabilities.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Privacy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <span className="hero-text">Privacy</span> & Safety First
              </h2>
              <p className="text-xl text-foreground-muted">
                Your safety and anonymity are our highest priorities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="feature-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Complete Anonymity</h3>
                  <ul className="space-y-3 text-foreground-muted">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-healing mt-1 flex-shrink-0" />
                      <span>No email or personal information required</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-healing mt-1 flex-shrink-0" />
                      <span>Session-based identity with disposable IDs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-healing mt-1 flex-shrink-0" />
                      <span>No tracking or profiling of personal data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-healing mt-1 flex-shrink-0" />
                      <span>End-to-end encryption for all conversations</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="feature-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Active Moderation</h3>
                  <ul className="space-y-3 text-foreground-muted">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-healing mt-1 flex-shrink-0" />
                      <span>24/7 trained human moderators</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-healing mt-1 flex-shrink-0" />
                      <span>AI-powered toxicity detection</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-healing mt-1 flex-shrink-0" />
                      <span>Crisis intervention protocols</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-healing mt-1 flex-shrink-0" />
                      <span>Quick reporting and blocking features</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Community Guidelines</h2>
            <p className="text-lg text-foreground-muted mb-8">
              Together, we create a space where everyone feels safe to share and heal
            </p>
            
            <Card className="feature-card">
              <div className="p-8 text-left">
                <div className="space-y-4 text-foreground-muted">
                  <div>
                    <strong className="text-foreground">Be Kind:</strong> Treat others with empathy, 
                    respect, and understanding. Everyone is fighting their own battle.
                  </div>
                  <div>
                    <strong className="text-foreground">Stay Anonymous:</strong> Don't share personal 
                    information or ask others for theirs. Protect everyone's privacy.
                  </div>
                  <div>
                    <strong className="text-foreground">Listen Actively:</strong> Sometimes the most 
                    powerful support is simply being heard. Practice active listening.
                  </div>
                  <div>
                    <strong className="text-foreground">No Medical Advice:</strong> Share experiences 
                    and support, but avoid giving medical or professional advice.
                  </div>
                  <div>
                    <strong className="text-foreground">Report Concerns:</strong> If someone seems in 
                    immediate danger or violates guidelines, report it immediately.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to join our <span className="hero-text">community</span>?
            </h2>
            <p className="text-xl text-foreground-muted mb-8">
              Take the first step towards connection, understanding, and healing. 
              Your voice matters, and your story can help others feel less alone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chatrooms">
                <Button size="lg" className="w-full sm:w-auto">
                  Join Chat Rooms
                </Button>
              </Link>
              <Link to="/sos">
                <Button variant="emergency" size="lg" className="w-full sm:w-auto">
                  Need Help Now?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;