import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Phone, MessageCircle, Heart, Clock } from "lucide-react";

const SOS = () => {
  const emergencyContacts = [
    {
      country: "United States",
      hotlines: [
        { name: "National Suicide Prevention Lifeline", number: "988", available: "24/7" },
        { name: "Crisis Text Line", number: "Text HOME to 741741", available: "24/7" },
        { name: "National Mental Health Hotline", number: "1-800-662-4357", available: "24/7" }
      ]
    },
    {
      country: "United Kingdom", 
      hotlines: [
        { name: "Samaritans", number: "116 123", available: "24/7" },
        { name: "Crisis Text Line UK", number: "Text SHOUT to 85258", available: "24/7" }
      ]
    },
    {
      country: "India",
      hotlines: [
        { name: "AASRA", number: "91-9820466726", available: "24/7" },
        { name: "Sneha India", number: "91-44-24640050", available: "24/7" },
        { name: "Vandrevala Foundation", number: "1860-2662-345", available: "24/7" }
      ]
    },
    {
      country: "Australia",
      hotlines: [
        { name: "Lifeline", number: "13 11 14", available: "24/7" },
        { name: "Beyond Blue", number: "1300 22 4636", available: "24/7" }
      ]
    }
  ];

  const immediateSteps = [
    {
      icon: Phone,
      title: "Call Emergency Services",
      description: "If you're in immediate physical danger, call your local emergency number (911, 999, 112, etc.)",
      urgent: true
    },
    {
      icon: MessageCircle,
      title: "Reach Out to Crisis Hotlines",
      description: "Professional counselors are available 24/7 to provide immediate support and guidance",
      urgent: false
    },
    {
      icon: Heart,
      title: "Connect with EchoRoom Community",
      description: "Join our crisis support room where community members and moderators provide immediate peer support",
      urgent: false
    },
    {
      icon: Clock,
      title: "Safe Environment",
      description: "Stay in a safe place, remove any means of harm, and consider reaching out to a trusted friend or family member",
      urgent: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      {/* Emergency Alert Banner */}
      <div className="pt-16 bg-destructive/20 border-b border-destructive/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-destructive mb-2">Emergency Support</h1>
            <p className="text-destructive-foreground">If you're having thoughts of self-harm or suicide, please reach out for help immediately.</p>
          </div>
        </div>
      </div>

      {/* Immediate Actions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Take Action Now</h2>
            <p className="text-xl text-foreground-muted">You are not alone. Help is available right now.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {immediateSteps.map((step, index) => (
              <Card key={index} className={`feature-card ${step.urgent ? 'border-destructive bg-destructive/5' : ''}`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    step.urgent ? 'bg-destructive text-destructive-foreground' : 'bg-gradient-healing'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${step.urgent ? 'text-destructive' : ''}`}>
                      {step.title}
                    </h3>
                    <p className="text-foreground-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Access Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="emergency" size="lg" className="text-lg px-8 py-4">
              <Phone className="w-5 h-5 mr-2" />
              Call Crisis Hotline
            </Button>
            <Button variant="healing" size="lg" className="text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5 mr-2" />
              Crisis Support Chat
            </Button>
          </div>
        </div>
      </section>

      {/* Crisis Hotlines by Country */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Crisis Hotlines Worldwide</h2>
            <p className="text-foreground-muted">Professional help is available 24/7 in your country</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {emergencyContacts.map((country, index) => (
              <Card key={index} className="feature-card">
                <h3 className="text-xl font-bold mb-4 hero-text">{country.country}</h3>
                <div className="space-y-4">
                  {country.hotlines.map((hotline, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-4">
                      <div className="font-semibold">{hotline.name}</div>
                      <div className="text-2xl font-bold text-primary my-1">{hotline.number}</div>
                      <div className="text-sm text-foreground-muted">Available: {hotline.available}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting Information */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card className="feature-card">
              <div className="text-center p-8">
                <Heart className="w-16 h-16 mx-auto text-healing mb-6" />
                <h2 className="text-2xl font-bold mb-4">You Matter</h2>
                <p className="text-lg text-foreground-muted mb-6 leading-relaxed">
                  Every life has value and meaning. The pain you're feeling right now is temporary, 
                  but ending your life is permanent. There are people who want to help and support you 
                  through this difficult time.
                </p>
                <div className="text-left space-y-4 text-foreground-muted">
                  <p><strong>Remember:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>This feeling will pass</li>
                    <li>You are not alone in this struggle</li>
                    <li>Help is available and recovery is possible</li>
                    <li>Your life has value and purpose</li>
                    <li>Tomorrow can be different from today</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation to Safety */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">After Crisis Support</h2>
          <p className="text-lg text-foreground-muted mb-8 max-w-2xl mx-auto">
            Once you're feeling safer, consider connecting with our supportive community 
            for ongoing peer support and professional resources.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="healing" size="lg">
              Join Support Community
            </Button>
            <Button variant="outline" size="lg">
              Find Professional Help
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SOS;