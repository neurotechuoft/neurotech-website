import Image from "next/image";
import Link from "next/link";
import TopNav from "@/components/top-nav";
import { getEventBySlug } from "@/lib/events";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEventBySlug(slug);
  return {
    title: e ? `${e.title} | Events | NeurotechUofT` : "Event | NeurotechUofT",
    description: e?.summary || "NeurotechUofT event details.",
  };
}

export function generateStaticParams() {
  // In a real app you might fetch slugs; for now fallback to dynamic rendering.
  return [];
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <TopNav />
        <div className="max-w-3xl mx-auto px-6 py-28">
          <h1 className="text-2xl font-light">Event not found</h1>
          <p className="text-muted-foreground mt-2">We couldn&apos;t find that event. See all events instead.</p>
          <Link href="/events" className="text-purple-500 mt-4 inline-block">Back to Events →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <article className="max-w-4xl mx-auto px-6 py-28">
        <Link href="/events" className="text-purple-500 text-sm">← All Events</Link>
        <h1 className="text-4xl md:text-5xl font-light mt-4">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{event.title}</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          {new Date(event.date).toLocaleDateString()} {event.time ? `• ${event.time}` : ""}
        </p>
        {(event.location || event.type) && (
          <p className="text-muted-foreground mt-1 text-sm">
            {event.location} {event.location && event.type ? "• " : ""} {event.type}
          </p>
        )}

        <div className="mt-8 rounded-2xl overflow-hidden border border-border">
          <div className="aspect-video relative">
            <Image src={event.image || "/brain-wallpaper.jpg"} alt={event.title} fill className="object-cover" />
          </div>
        </div>

        <div className="prose prose-invert max-w-none mt-8">
          <p className="text-foreground/90">
            {event.content || event.summary}
          </p>
        </div>
      </article>
    </div>
  );
}
