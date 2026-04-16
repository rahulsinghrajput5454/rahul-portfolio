import HeroSection from "@/components/HeroSection";
import ProjectGrid from "@/components/ProjectGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#0a0a0a]">
      <HeroSection />
      <div className="w-full max-w-[1920px] mx-auto">
        <ProjectGrid />
        <ExperienceTimeline />
        
        {/* Contact CTA Section */}
        <section id="contact" className="py-24 md:py-40 px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold mb-12">
              Have an <span className="text-[#00ff88]">Idea?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/50 mb-16 max-w-2xl mx-auto">
              Give me a goal, and you can be sure I come up with some interesting videos and designs. Let’s collaborate!
            </p>
            <a 
              href="https://www.behance.net/rahulrajput8" 
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#00ff88] text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
            >
              Start a Conversation
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-12 border-t border-white/5 text-center text-white/30 text-xs font-mono uppercase tracking-widest">
          © 2024 Rahul Kumar Singh — Gurgaon, India
        </footer>
      </div>
    </div>
  );
}