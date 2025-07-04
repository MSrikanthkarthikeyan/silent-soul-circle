import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Video, 
  MessageCircle, 
  Star, 
  Calendar, 
  Globe, 
  User,
  Clock,
  Heart,
  Shield,
  CheckCircle
} from "lucide-react";

interface Professional {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  experience: string;
  availability: string;
  isOnline: boolean;
  priceRange: string;
  image: string;
  verified: boolean;
}

const Connect = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  const specialties = [
    "All", "Depression", "Anxiety", "Trauma", "Relationships", 
    "Student Counseling", "Career Stress", "Grief", "Addiction"
  ];

  const languages = ["All", "English", "Spanish", "Hindi", "Mandarin", "French", "German"];

  const professionals: Professional[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "Licensed Clinical Psychologist",
      specialties: ["Depression", "Anxiety", "Trauma"],
      languages: ["English", "Mandarin"],
      rating: 4.9,
      reviewCount: 127,
      experience: "8 years",
      availability: "Available today",
      isOnline: true,
      priceRange: "$80-120/session",
      image: "/api/placeholder/400/400",
      verified: true
    },
    {
      id: "2", 
      name: "Dr. Michael Rodriguez",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Relationships", "Family Therapy", "Depression"],
      languages: ["English", "Spanish"],
      rating: 4.8,
      reviewCount: 89,
      experience: "12 years",
      availability: "Next available: Tomorrow",
      isOnline: false,
      priceRange: "$90-130/session",
      image: "/api/placeholder/400/400",
      verified: true
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      title: "Psychiatrist & Mindfulness Coach",
      specialties: ["Anxiety", "Student Counseling", "Mindfulness"],
      languages: ["English", "Hindi"],
      rating: 4.9,
      reviewCount: 156,
      experience: "6 years",
      availability: "Available today",
      isOnline: true,
      priceRange: "$70-100/session",
      image: "/api/placeholder/400/400",
      verified: true
    },
    {
      id: "4",
      name: "Dr. James Thompson",
      title: "Clinical Social Worker",
      specialties: ["Trauma", "Addiction", "Grief"],
      languages: ["English", "French"],
      rating: 4.7,
      reviewCount: 93,
      experience: "15 years",
      availability: "Next available: This week",
      isOnline: false,
      priceRange: "$85-115/session",
      image: "/api/placeholder/400/400",
      verified: true
    }
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSpecialty = selectedSpecialty === "All" || prof.specialties.includes(selectedSpecialty);
    const matchesLanguage = selectedLanguage === "All" || prof.languages.includes(selectedLanguage);
    return matchesSpecialty && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Connect with <span className="hero-text">Professionals</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Get support from verified mental health professionals. 
              Video sessions, chat support, and personalized care from licensed experts.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold hero-text mb-1">250+</div>
              <div className="text-sm text-foreground-muted">Verified Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold hero-text mb-1">24/7</div>
              <div className="text-sm text-foreground-muted">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold hero-text mb-1">15</div>
              <div className="text-sm text-foreground-muted">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold hero-text mb-1">Safe</div>
              <div className="text-sm text-foreground-muted">& Confidential</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Filter by Specialty</h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                    className="rounded-full"
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Filter by Language</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <Button
                    key={language}
                    variant={selectedLanguage === language ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(language)}
                    className="rounded-full"
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <Card key={professional.id} className="feature-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{professional.name}</h3>
                        {professional.verified && (
                          <CheckCircle className="w-4 h-4 text-healing" />
                        )}
                      </div>
                      <p className="text-sm text-foreground-muted">{professional.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {professional.isOnline && (
                      <div className="w-3 h-3 bg-healing rounded-full animate-glow"></div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{professional.rating}</span>
                    <span className="text-sm text-foreground-muted">
                      ({professional.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-foreground-muted" />
                    <span className="text-sm text-foreground-muted">
                      {professional.experience} experience
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-foreground-muted" />
                    <span className="text-sm text-foreground-muted">
                      {professional.availability}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-foreground-muted" />
                    <span className="text-sm text-foreground-muted">
                      {professional.languages.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {professional.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4">
                  <div className="text-sm text-foreground-muted mb-4">
                    {professional.priceRange}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Video className="w-4 h-4 mr-1" />
                      Video Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 mx-auto text-foreground-muted mb-4" />
              <p className="text-foreground-muted">
                No professionals found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How Professional <span className="hero-text">Support</span> Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Choose Your Professional",
                description: "Browse verified therapists, counselors, and psychiatrists based on your needs and preferences."
              },
              {
                step: "2", 
                title: "Book Your Session",
                description: "Schedule a video call or chat session at a time that works for you. Same-day appointments available."
              },
              {
                step: "3",
                title: "Get Professional Care",
                description: "Receive personalized, confidential support from licensed mental health professionals."
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-healing rounded-full flex items-center justify-center text-2xl font-bold text-background mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-foreground-muted">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-healing"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card className="feature-card">
              <div className="text-center p-8">
                <Shield className="w-16 h-16 mx-auto text-healing mb-6" />
                <h2 className="text-2xl font-bold mb-4">Your Safety & Privacy</h2>
                <div className="text-left space-y-4 text-foreground-muted">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-healing mt-0.5" />
                    <p>All professionals are licensed and verified</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-healing mt-0.5" />
                    <p>End-to-end encrypted video calls and messages</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-healing mt-0.5" />
                    <p>HIPAA compliant and confidential</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-healing mt-0.5" />
                    <p>24/7 crisis support available</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-healing mt-0.5" />
                    <p>Cancel or reschedule anytime</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/sos">
                    <Button variant="emergency">
                      Need Crisis Support Now?
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Connect;