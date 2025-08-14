import Image from "next/image";
import Link from "next/link";
import TopNav from "@/components/top-nav";
import { getAllEvents, type EventItem } from "@/lib/events";

export const metadata = {
  title: "Events | NeuroTechUofT",
  description: "All upcoming and past events at NeuroTechUofT.",
};

export default function EventsPage() {
  const all = getAllEvents();
  const today = new Date();
  const upcoming = all.filter((e) => new Date(e.date) >= new Date(today.toISOString().slice(0, 10)));
  const past = all.filter((e) => new Date(e.date) < new Date(today.toISOString().slice(0, 10)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />

      <section className="relative z-10 py-28 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider text-purple-400 font-light">Events</span>
            <h1 className="text-4xl md:text-5xl font-light mt-3">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">All Events</span>
            </h1>
            <p className="text-muted-foreground mt-4">Browse upcoming and past events. Each event has its own page.</p>
          </div>

          {upcoming.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-light mb-6">Upcoming</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcoming.map((e) => (
                  <EventCard key={e.slug} {...e} />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-light mb-6">Past Events</h2>
            {past.length === 0 ? (
              <p className="text-muted-foreground">No past events yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {past.map((e) => (
                  <EventCard key={e.slug} {...e} past />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

type EventCardProps = EventItem & { past?: boolean };
function EventCard({ slug, title, date, type, summary, image, location, time, past }: EventCardProps) {
  return (
    <Link
      href={`/events/${slug}`}
      className="block rounded-2xl border border-border bg-card/60 hover:border-purple-500/50 transition overflow-hidden"
    >
      <div className="aspect-video relative">
        <Image src={image || "/brain-wallpaper.jpg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs ${
            type === "Workshop" || type === "Project Demo" ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"
          }`}>
            {type}
          </span>
          <span className="text-muted-foreground text-xs">{new Date(date).toLocaleDateString()}</span>
        </div>
        <h3 className="text-lg font-light mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
        {(location || time) && (
          <p className="text-xs text-muted-foreground mt-3">{location}{location && time ? " • " : ""}{time}</p>
        )}
        {past && <p className="text-[10px] text-muted-foreground mt-2">Past event</p>}
      </div>
    </Link>
  );
}
