export type EventType = "Workshop" | "Seminar" | "Networking" | "Project Demo" | "Conference" | "Hackathon" | "Talk";

export type EventItem = {
  slug: string;
  title: string;
  type: EventType;
  date: string; // ISO date string YYYY-MM-DD
  time?: string; // e.g., "6:00 PM - 8:00 PM"
  location?: string;
  summary: string;
  image?: string;
  content?: string; // long form description/markdown
};

// Seed data. Replace with CMS or DB later.
const events: EventItem[] = [
  {
    slug: "neuronmove-showcase-2024",
    title: "NeuronMove Showcase",
    type: "Project Demo",
    date: "2024-04-12",
    time: "5:00 PM - 7:00 PM",
    location: "Engineering Building",
    summary:
      "See our flagship project in action and learn about the latest developments in Parkinson's treatment.",
    image: "/brain-wallpaper.jpg",
  },
  {
    slug: "future-of-Neurotech-summit-2024",
    title: "Future of Neurotechnology Summit",
    type: "Conference",
    date: "2024-04-20",
    time: "All Day",
    location: "Convocation Hall",
    summary:
      "Annual conference featuring keynote speakers from leading Neurotechnology companies and research institutions.",
    image: "/brain-wallpaper.jpg",
  },
  {
    slug: "bci-fundamentals-workshop-mar-2024",
    title: "Brain-Computer Interface Fundamentals",
    type: "Workshop",
    date: "2024-03-15",
    time: "6:00 PM - 8:00 PM",
    location: "Engineering Building",
    summary:
      "Learn the basics of BCI technology and explore hands-on applications in our state-of-the-art lab environment.",
    image: "/brain-wallpaper.jpg",
  },
  {
    slug: "neural-signal-processing-seminar-2024",
    title: "Neural Signal Processing in Action",
    type: "Seminar",
    date: "2024-03-22",
    time: "6:00 PM - 8:00 PM",
    location: "BA 1130",
    summary:
      "Deep dive into advanced signal processing techniques used in modern Neurotechnology applications.",
    image: "/brain-wallpaper.jpg",
  },
  {
    slug: "industry-connections-mixer-2024",
    title: "Industry Connections Mixer",
    type: "Networking",
    date: "2024-04-05",
    time: "6:00 PM - 9:00 PM",
    location: "Hart House",
    summary:
      "Connect with industry professionals and explore career opportunities in Neurotechnology.",
    image: "/brain-wallpaper.jpg",
  },
  {
    slug: "advanced-neural-interfaces-workshop-2024",
    title: "Advanced Neural Interfaces",
    type: "Workshop",
    date: "2024-05-03",
    time: "2:00 PM - 5:00 PM",
    location: "Medical Sciences Building",
    summary:
      "Explore cutting-edge developments in neural interface technology and their clinical applications.",
    image: "/brain-wallpaper.jpg",
  },
  // Upcoming (relative to Aug 12, 2025)
  {
    slug: "Neurotech-welcome-mixer-2025",
    title: "Neurotech Welcome Mixer",
    type: "Networking",
    date: "2025-09-10",
    time: "6:00 PM - 8:00 PM",
    location: "Grad Lounge",
    summary:
      "Kick off the semester with fellow Neurotech enthusiasts, mentors, and project leads.",
    image: "/brain-wallpaper.jpg",
  },
  {
    slug: "bci-hacknight-sept-2025",
    title: "BCI Hack Night",
    type: "Hackathon",
    date: "2025-09-25",
    time: "5:30 PM - 10:00 PM",
    location: "BA 3185",
    summary:
      "Rapid prototypes with EEG and biosensors. Teams welcome; beginners encouraged!",
    image: "/brain-wallpaper.jpg",
  },
  {
    slug: "guest-talk-neural-implants-oct-2025",
    title: "Guest Talk: Frontiers in Neural Implants",
    type: "Talk",
    date: "2025-10-14",
    time: "4:00 PM - 5:30 PM",
    location: "BA 1130",
    summary:
      "A leading researcher shares the state-of-the-art in long-term, high-channel-count implants.",
    image: "/brain-wallpaper.jpg",
  },
];

export function getAllEvents(): EventItem[] {
  return [...events].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents(limit?: number): EventItem[] {
  const today = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= new Date(today.toISOString().slice(0, 10)))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export function getPastEvents(): EventItem[] {
  const today = new Date();
  return events
    .filter((e) => new Date(e.date) < new Date(today.toISOString().slice(0, 10)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
