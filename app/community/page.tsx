"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Users, Calendar, MessageCircle, Award, BookOpen, Heart, Coffee, Code, Brain } from "lucide-react"
import Link from "next/link"
import TopNav from "@/components/top-nav"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const teamMembers = [
    {
      name: "Selen Bayram",
      role: "Co-President",
      department: "Executive Committee",
      specialization: "Community Leadership",
      image: "/team-selen.jpg"
    },
    {
      name: "Shuntaro Wakamatsu",
      role: "Co-President",
      department: "Executive Committee",
      specialization: "Engineering Leadership",
      image: "/team-shuntaro.jpg"
    },
    {
      name: "Usman Wani",
      role: "Co-President",
      department: "Executive Committee",
      specialization: "Operations Leadership",
      image: "/team-usman.jpg"
    },
    {
      name: "Matthew Chen",
      role: "VP Recruitment",
      department: "Operations",
      specialization: "Member Engagement",
      image: "/team-matthew.jpg"
    },
    {
      name: "Kyoko Lin",
      role: "VP Logistics",
      department: "Operations",
      specialization: "Event Coordination",
      image: "/team-kyoko.jpg"
    },
    {
      name: "Derek Yu",
      role: "VP Admin",
      department: "Operations",
      specialization: "Administrative Systems",
      image: "/team-derek.jpg"
    },
    {
      name: "Jean Jung",
      role: "VP Marketing",
      department: "Operations",
      specialization: "Brand & Communications",
      image: "/team-jean.jpg"
    }
  ]

  const events = [
    {
      title: "Weekly Lab Sessions",
      description: "Hands-on experience with EEG equipment and brain-computer interface development",
      time: "Every Thursday 6-8 PM",
      location: "Engineering Building Lab",
      type: "recurring"
    },
    {
      title: "Neurotech Talk Series",
      description: "Guest speakers from industry and academia sharing insights on Neurotechnology",
      time: "Monthly - First Friday",
      location: "Hybrid (In-person + Virtual)",
      type: "monthly"
    },
    {
      title: "Research Symposium",
      description: "Annual showcase of member research projects and achievements",
      time: "April 2025",
      location: "Convocation Hall",
      type: "annual"
    }
  ]

  const benefits = [
    {
      icon: Brain,
      title: "Cutting-edge Research",
      description: "Work on real Neurotechnology projects with impact"
    },
    {
      icon: Users,
      title: "Collaborative Community",
      description: "Connect with like-minded students and researchers"
    },
    {
      icon: Award,
      title: "Professional Development",
      description: "Build skills valued by industry and academia"
    },
    {
      icon: BookOpen,
      title: "Learning Opportunities",
      description: "Workshops, seminars, and hands-on training"
    }
  ]

  return (
  <div className="min-h-screen bg-background text-foreground">
  <TopNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background via-muted/40 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Our Community</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Join a vibrant community of students, researchers, and innovators passionate about Neurotechnology and brain-computer interfaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
            >
              Join Us Today
            </Button>
            <Link href="/about" className="border border-purple-400/50 text-purple-500 hover:bg-purple-600/10 px-8 py-3 rounded-md text-center">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                200+
              </div>
              <p className="text-muted-foreground text-sm">Active Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <p className="text-muted-foreground text-sm">Research Projects</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                15+
              </div>
              <p className="text-muted-foreground text-sm">Industry Partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                3
              </div>
              <p className="text-muted-foreground text-sm">Years Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
  <section className="py-8 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-8">
            {[ 
              { id: "overview", label: "Overview" },
              { id: "events", label: "Events & Activities" },
              { id: "benefits", label: "Member Benefits" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-4 text-sm font-light transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-purple-400'
                    : 'text-gray-400 border-transparent hover:text-purple-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <Link href="/about/leadership" className="pb-2 px-4 text-sm font-light text-gray-400 hover:text-purple-300 border-b-2 border-transparent transition-all">Leadership Team →</Link>
          </div>
        </div>
      </section>

      {/* Tab Content */}
  <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground leading-tight">
                  A Community Built on 
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Innovation
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  NeurotechUofT brings together students from diverse academic backgrounds - engineering, neuroscience, computer science, and beyond - united by a shared passion for Neurotechnology.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Our community is built on principles of collaboration, innovation, and inclusivity. We believe that the future of Neurotechnology lies in interdisciplinary approaches and diverse perspectives.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-purple-400" />
                    <span className="text-foreground/80">Inclusive and welcoming environment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Coffee className="w-5 h-5 text-purple-400" />
                    <span className="text-foreground/80">Regular social events and networking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-purple-400" />
                    <span className="text-foreground/80">Hands-on project experience</span>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border p-8">
                <h3 className="text-xl font-light text-foreground mb-6">What Our Members Say</h3>
                <div className="space-y-6">
                  <blockquote className="border-l-4 border-purple-400 pl-6">
                    <p className="text-muted-foreground italic mb-2">
                      &quot;Joining NeurotechUofT opened doors I never knew existed. The projects are challenging and the community is incredibly supportive.&quot;
                    </p>
                    <cite className="text-purple-500 text-sm">- Maria S., 3rd Year Computer Science</cite>
                  </blockquote>
                  <blockquote className="border-l-4 border-blue-400 pl-6">
                    <p className="text-muted-foreground italic mb-2">
                      &quot;The interdisciplinary approach here is amazing. I&apos;ve learned so much working with students from different fields.&quot;
                    </p>
                    <cite className="text-blue-500 text-sm">- David L., 4th Year Engineering</cite>
                  </blockquote>
                </div>
              </div>
            </div>
          )}

          {/* Leadership Team Tab */}
          {activeTab === "team" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground">
                  Meet Our Leadership Team
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Our dedicated executive team leads initiatives, coordinates projects, and fosters community growth.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border p-6 text-center hover:border-purple-500/50 transition-all duration-300">
                    <div className="w-24 h-24 bg-gray-700/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-light text-foreground mb-2">{member.name}</h3>
                    <p className="text-purple-400 text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-xs mb-2">{member.department}</p>
                    <p className="text-muted-foreground/80 text-xs">{member.specialization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground">
                  Events & Activities
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Join us for regular events, workshops, and activities designed to build skills and foster community.
                </p>
              </div>
              <div className="space-y-8">
                {events.map((event, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border p-8 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-light text-foreground mb-2 md:mb-0">{event.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-light ${
                        event.type === 'recurring' ? 'bg-green-500/20 text-green-300' :
                        event.type === 'monthly' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === "benefits" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground">
                  Member Benefits
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover the opportunities and resources available to our community members.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="bg-card rounded-2xl border border-border p-8 hover:border-purple-500/50 transition-all duration-300">
                      <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-light text-foreground mb-4">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
    <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground">
            Ready to Join Our Community?
          </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Take the first step towards becoming part of an innovative community that&apos;s shaping the future of Neurotechnology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-3"
            >
              Apply Now
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
    <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Image 
              src="/logo.png" 
              alt="NeurotechUofT Logo" 
              width={24} 
              height={24} 
              className="w-6 h-6"
            />
            <span className="text-lg font-extralight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NeurotechUofT
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; 2025 NeurotechUofT. Pioneering the future of Neurotechnology.
          </p>
        </div>
      </footer>
    </div>
  )
}
