import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border py-8 px-4 mt-16 text-sm bg-background text-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl text-purple-600 dark:text-purple-400">NeurotechUofT</span>
          <div className="mt-2 text-foreground/70">Celebrating 10 Years of Innovation</div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <div className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Explore</div>
            <ul className="space-y-1">
              <li><Link href="/about" className="hover:text-purple-500">About</Link></li>
              <li><Link href="/projects" className="hover:text-purple-500">Projects</Link></li>
              <li><Link href="/publications" className="hover:text-purple-500">Publications</Link></li>
              <li><Link href="/events" className="hover:text-purple-500">Events</Link></li>
              <li><Link href="/community" className="hover:text-purple-500">Community</Link></li>
              <li><Link href="/contact" className="hover:text-purple-500">Contact</Link></li>
              <li><Link href="/apply" className="hover:text-purple-500">Apply</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Community</div>
            <ul className="space-y-1">
              <li><Link href="/community/air" className="hover:text-purple-500">NeurON Air</Link></li>
              <li><Link href="/community/education" className="hover:text-purple-500">Education</Link></li>
              <li><Link href="/community/newsletter" className="hover:text-purple-500">Newsletter</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Connect</div>
            <ul className="space-y-1">
              <li><a href="mailto:info@neurotechuoft.ca" className="hover:text-purple-500">Email</a></li>
              <li><a href="https://www.facebook.com/neurotechuoft" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">Facebook</a></li>
              <li><a href="https://www.instagram.com/neurotechuoft" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/neurotechuoft" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-foreground/60">&copy; {new Date().getFullYear()} NeurotechUofT. All rights reserved.</div>
    </footer>
  );
}
