"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Zap, Brain, Activity, Users } from "lucide-react"
import TopNav from "@/components/top-nav"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const projects = [
    {
      id: 1,
      title: "NeuronMove - Solving Parkinson's",
      description: "Our 2024-25 Flagship Project developing a solution for Parkinson's patients using neural implant data and cortex-level information.",
      category: "bci",
      status: "active",
      image: "/project-neuronmove.jpg",
      technologies: ["EEG", "Machine Learning", "Neuroscience"],
      team: "15 members",
      duration: "8 months",
      flagship: true
    },
    {
      id: 2,
      title: "NTUT Bioprosthetic Arm",
      description: "2023-24 Flagship Project: A robotic prosthetic arm controlled by EEG brain signals for intuitive movement control.",
      category: "bci",
      status: "completed",
      image: "/project-bioprosthetic.jpg",
      technologies: ["EEG", "Robotics", "Rehabilitation"],
      team: "12 members",
      duration: "12 months",
      flagship: true
    },
    {
      id: 3,
      title: "MindType",
      description: "A mind-controlled keyboard using imagined sign language gestures for efficient character selection.",
      category: "bci",
      status: "active",
      image: "/project-mindtype.jpg",
      technologies: ["EEG", "Accessibility", "Communication"],
      team: "8 members",
      duration: "6 months"
    },
    {
      id: 4,
      title: "WallEEG",
  description: "A mind-controlled quidditch robot developed as part of NeurotechUofT's interdisciplinary approach to Neurotechnology.",
      category: "ai",
      status: "active",
      image: "/project-walleeg.jpg",
      technologies: ["EEG", "Robotics", "Gaming"],
      team: "10 members",
      duration: "5 months"
    },
    {
      id: 5,
      title: "Headset",
      description: "A comfortable, easy-to-use EEG headset tailored for researchers and users.",
      category: "hardware",
      status: "active",
      image: "/project-headset.jpg",
      technologies: ["EEG", "Hardware", "Research"],
      team: "6 members",
      duration: "10 months"
    },
    {
      id: 6,
      title: "Neurostack",
      description: "An open-source, real-time EEG processing service hosted on the cloud.",
      category: "ai",
      status: "active",
      image: "/project-neurostack.jpg",
      technologies: ["EEG", "Cloud Computing", "Open Source"],
      team: "7 members",
      duration: "8 months"
    }
  ]

  const categories = [
    { id: "all", name: "All Projects", icon: Brain },
    { id: "bci", name: "Brain-Computer Interface", icon: Zap },
    { id: "ai", name: "AI & Machine Learning", icon: Activity },
    { id: "hardware", name: "Hardware & Devices", icon: Users }
  ]

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background text-foreground">
  <TopNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-sm uppercase tracking-wider text-purple-400 font-light">Innovation Lab</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Research & Development
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto px-4">
            Explore our cutting-edge projects pushing the boundaries of neurotechnology, from brain-computer interfaces to neural signal processing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {[
              { href: '/projects/neuronmove', label: 'NeuronMove' },
              { href: '/projects/stroke-rehab', label: 'Stroke Rehab' },
              { href: '/projects/past', label: 'Past Projects' },
            ].map((t) => (
              <a key={t.href} href={t.href} className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full border border-border/60 bg-card/60 backdrop-blur-sm text-foreground hover:border-purple-500/50 hover:text-purple-500 transition-all duration-300 hover:scale-105">
                {t.label}
              </a>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="w-6 h-6 border-2 border-purple-400 rounded-full mx-auto animate-bounce cursor-pointer hover:border-white transition-colors duration-300"
            />
          </div>
        </div>
        
        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>
      </section>

      {/* Project Categories */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
        <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                    selectedCategory === category.id
          ? 'bg-purple-600/10 border-purple-400 text-purple-600'
          : 'bg-card border-border text-foreground hover:border-purple-400/50 hover:text-purple-500'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-light">{category.name}</span>
                </button>
              )
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`bg-card rounded-2xl border p-4 sm:p-6 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 group ${
                  project.flagship 
                    ? 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-purple-500/5' 
                    : 'border-border'
                }`}
              >
                {/* Flagship Badge */}
        {project.flagship && (
                  <div className="flex justify-end mb-4">
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-light border border-yellow-500/30">
                      🏆 Flagship Project
                    </span>
                  </div>
                )}

                {/* Project Image Placeholder */}
                <div className="aspect-video bg-muted/40 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center text-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">{project.title}</p>
                  </div>
                </div>

                {/* Project Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-light ${
                    project.status === 'active' 
                      ? 'bg-green-500/15 text-green-700 dark:text-green-300' 
                      : 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                  }`}>
                    {project.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-foreground/60 hover:text-purple-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-foreground/60 hover:text-purple-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Project Content */}
                <h3 className="text-xl font-light text-foreground mb-3 group-hover:text-purple-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted/50 text-foreground text-xs rounded border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Stats */}
                <div className="flex justify-between text-xs text-foreground">
                  <span>{project.team}</span>
                  <span>{project.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
    <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 text-foreground">
            Want to Contribute?
          </h2>
  <p className="text-base sm:text-lg text-foreground/80 mb-8 leading-relaxed px-4">
            Join our team and help build the future of Neurotechnology. We&apos;re always looking for passionate students and researchers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-3"
            >
              Get Involved
            </Button>
            <Button 
              onClick={() => window.location.href = '/about'}
              variant="outline" 
              className="px-8 py-3"
            >
              Learn About Us
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
  <p className="text-foreground/80 text-sm">
            &copy; 2025 NeurotechUofT. Pioneering the future of Neurotechnology.
          </p>
        </div>
      </footer>
    </div>
  )
}
