/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';

const VIDEOS = [
  "544615537", // Hero background (also first in the list as requested)
  "544618316",
  "544616540",
  "544697432",
  "544689911",
  "544623494",
  "802727089",
  "802733345",
  "544619509"
];

export default function App() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = dir === 'right' ? scrollLeft + clientWidth * 0.8 : scrollLeft - clientWidth * 0.8;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formsubmit.co/ajax/baez@hitster.page', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact from ${formData.name}`,
          _template: "box"
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden flex flex-col relative selection:bg-white/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-8 border-b border-white/10 mix-blend-normal backdrop-blur-md bg-black/40">
        <a href="#" className="text-xs tracking-[0.4em] uppercase font-semibold text-white/50 underline underline-offset-8 decoration-white/20 hover:text-white transition-colors">MR. MAIOLA</a>
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/40">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[180px] font-black tracking-tighter leading-none mix-blend-difference select-none text-center"
          >
            MR. MAIOLA
          </motion.h1>
        </div>

        <motion.div 
          className="absolute inset-0 z-0 w-full h-full"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
          <iframe 
            src={`https://player.vimeo.com/video/${VIDEOS[0]}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
            className="w-[150vw] h-[150vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            allow="autoplay; fullscreen"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 text-[10px] tracking-widest uppercase text-white/50"
        >
          <span>Scroll to explore</span>
          <div className="w-[1px] h-12 bg-white/20" />
        </motion.div>
      </section>

      {/* About / Copy Section */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center min-h-[70vh]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/40"></span>
              The Philosophy
            </h2>
          </div>
          <div className="md:col-span-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-serif italic leading-snug mb-10"
            >
              El estilo de narrativa lo es todo. <br/>
              Celebramos la devoción por el <span className="text-white font-sans not-italic font-black tracking-tighter">CRAFT</span>.
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-white/70 mt-4 leading-relaxed max-w-sm text-justify"
            >
              No hacemos simplemente comerciales; construimos atmósferas. Nuestro enfoque está diseñado para hacer que las marcas vendan a través de una <strong className="text-white font-medium">estética cinematográfica</strong> inmersiva. Contamos historias que elevan la percepción, capturan la atención y dejan una marca imborrable en el espectador.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Selected Work Carousel */}
      <section id="work" className="py-24 relative overflow-hidden">
        <div className="px-6 md:px-12 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/40"></span>
              Selected Work
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter">Filmography</h3>
          </div>
          
          <div className="hidden md:flex gap-4">
            <button onClick={() => scrollCarousel('left')} className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors" aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scrollCarousel('right')} className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors" aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-12 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {VIDEOS.map((id, idx) => (
            <motion.div 
              key={id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] aspect-video snap-center group cursor-pointer border border-white/10"
              onClick={() => setActiveVideo(idx)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
              <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-3 py-1 bg-zinc-800 border border-white/10 text-[10px] text-white/60 tracking-widest uppercase">
                  REEL {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
              <iframe 
                src={`https://player.vimeo.com/video/${id}?background=1&autoplay=0&loop=1&muted=1`} 
                className="w-full h-full pointer-events-none"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 scale-90 group-hover:scale-100 duration-300">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <Play className="text-white ml-2" size={32} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 bg-white/[0.02] border border-white/10 p-8 md:p-12">
          <div className="col-span-1 md:col-span-5">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/40"></span>
              Connect — Hitster Media
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 block">Start a project.</h3>
            <p className="text-sm text-white/70 mb-12 max-w-sm text-justify">
              We collaborate with visionary brands and agencies to craft exceptional cinematic experiences.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-7 flex flex-col justify-center">
            <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <div className="space-y-1">
                <label htmlFor="name" className="text-[9px] uppercase tracking-widest text-white/30">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border-b border-white/20 py-2 px-3 text-sm focus:border-white focus:outline-none transition-colors hover:border-white/40"
                  placeholder="Name Surname"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-[9px] uppercase tracking-widest text-white/30">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border-b border-white/20 py-2 px-3 text-sm focus:border-white focus:outline-none transition-colors hover:border-white/40"
                  placeholder="name@agency.com"
                />
              </div>

              <div className="col-span-1 md:col-span-2 space-y-1">
                <label htmlFor="message" className="text-[9px] uppercase tracking-widest text-white/30">
                  Your Message
                </label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border-b border-white/20 py-2 px-3 text-sm focus:border-white focus:outline-none transition-colors resize-none hover:border-white/40"
                  placeholder="How can we help?"
                />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:items-center justify-between pt-4 gap-4">
                 <span className="text-[10px] text-white/30 italic">To: baez@hitster.page</span>
                 <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50"
                  >
                   {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                 </button>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                {submitStatus === 'success' && (
                  <p className="text-green-400 text-xs mt-2">Thank you for your message. We'll be in touch.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-xs mt-2">There was an error sending your message. Please try again.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-8 bg-black z-30 relative border-t border-white/10 gap-6">
        <div className="text-[10px] tracking-widest text-white/40 uppercase text-center md:text-left">
          © 2026 Todos los derechos reservados para Hitster Media
        </div>
        <div className="flex gap-8">
          <a href="https://www.youtube.com/@hitstermedia" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-widest text-white/40 uppercase hover:text-white transition-colors">Youtube</a>
          <a href="https://www.instagram.com/mediahitster/" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-widest text-white/40 uppercase hover:text-white transition-colors">Instagram</a>
          <a href="https://www.behance.net/hitstermedia" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-widest text-white/40 uppercase hover:text-white transition-colors">Behance</a>
        </div>
      </footer>

      {/* Video Modal */}
      {activeVideo !== null && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-12">
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white uppercase tracking-widest text-sm z-50 transition-colors"
          >
            Close 
          </button>
          <div className="w-full h-full max-w-7xl mx-auto rounded-xl overflow-hidden relative">
            <iframe 
              src={`https://player.vimeo.com/video/${VIDEOS[activeVideo]}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`} 
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
