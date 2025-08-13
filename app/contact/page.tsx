"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Send, MessageCircle } from "lucide-react"
import TopNav from "@/components/top-nav"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    interest: 'general'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
  <TopNav />

      {/* Hero Section */}
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background via-muted/40 to-background">
        <div className="max-w-7xl mx-auto text-center">
  <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Contact Us</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get in touch with our team. Whether you&apos;re interested in joining, collaborating, or just learning more about neurotechnology.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:border-purple-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-light text-foreground mb-4">Email Us</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Send us an email and we&apos;ll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:neurotech@uoft.ca" 
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                neurotech@uoft.ca
              </a>
            </div>

            {/* Location */}
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:border-blue-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-light text-foreground mb-4">Visit Us</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Find us at the University of Toronto Engineering campus.
              </p>
              <p className="text-blue-400">
                Engineering Building<br />
                40 St George St<br />
                Toronto, ON M5S 2E4
              </p>
            </div>

            {/* Social */}
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:border-purple-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-light text-foreground mb-4">Connect</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Follow us on social media for updates and announcements.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-purple-500 hover:text-purple-400 transition-colors duration-300">
                  LinkedIn
                </a>
                <a href="#" className="text-purple-500 hover:text-purple-400 transition-colors duration-300">
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground">
              Send Us a Message
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a specific question or want to get involved? Fill out the form below and we&apos;ll get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-light text-muted-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-400 transition-colors duration-300"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-light text-muted-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-400 transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="interest" className="block text-sm font-light text-muted-foreground mb-2">
                  Area of Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-purple-400 transition-colors duration-300"
                >
                  <option value="general">General Inquiry</option>
                  <option value="joining">Joining the Team</option>
                  <option value="collaboration">Research Collaboration</option>
                  <option value="speaking">Speaking Opportunity</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-light text-muted-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-400 transition-colors duration-300"
                  placeholder="Brief subject line"
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-light text-muted-foreground mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-400 transition-colors duration-300 resize-vertical"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 font-light transition-all duration-300 hover:scale-105"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-light text-foreground mb-3">How can I join NeuroTechUofT?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We welcome students from all backgrounds! Check out our community page for upcoming recruitment events and application processes.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-light text-foreground mb-3">Do I need prior experience in neuroscience?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Not at all! We value diverse perspectives and provide training for members interested in learning about neurotechnology.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-light text-foreground mb-3">Can I collaborate on research projects?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Yes! We actively seek collaborations with researchers, industry partners, and other student organizations. Contact us to discuss opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Image 
              src="/logo.png" 
              alt="NeuroTechUofT Logo" 
              width={24} 
              height={24} 
              className="w-6 h-6"
            />
            <span className="text-lg font-extralight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NeuroTechUofT
            </span>
          </div>
      <p className="text-muted-foreground text-sm">
            &copy; 2025 NeuroTechUofT. Pioneering the future of neurotechnology.
          </p>
        </div>
      </footer>
    </div>
  )
}
