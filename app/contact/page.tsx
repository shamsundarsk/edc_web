'use client';

import { useState } from 'react';
import MinimalNav from '../components/MinimalNav';
import MinimalFooter from '../components/MinimalFooter';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Failed to send message. Please try again.'}`);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      <MinimalNav />
      
      <main className="flex-grow flex flex-col justify-center w-full px-6 pt-32 pb-20 md:px-20 relative z-10">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="mb-20 md:mb-32 opacity-0 animate-fade-in-up">
            <div className="title-gradient">
              <h1 className="text-charcoal text-[18vw] md:text-[12vw] leading-[0.8] tracking-[-0.05em] font-display font-light select-none cursor-default">
                Dialogue<span className="text-primary">.</span>
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start border-t border-charcoal/10 pt-12 opacity-0 animate-fade-in-up [animation-delay:300ms]">
            {/* Contact Information */}
            <div className="lg:col-span-4 flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-primary text-xs font-sans uppercase tracking-[0.2em] font-bold">Coordinates</span>
                <div className="font-sans text-charcoal-light text-lg leading-relaxed font-light">
                  <p>Innovation Hub, Block B</p>
                  <p>University Campus</p>
                  <p>Cambridge, MA 02139</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="text-primary text-xs font-sans uppercase tracking-[0.2em] font-bold">Digital</span>
                <div className="font-sans text-charcoal-light text-lg leading-relaxed font-light flex flex-col gap-1">
                  <a className="hover:text-primary transition-colors" href="mailto:hello@edc-visionaries.edu">
                    hello@edc-visionaries.edu
                  </a>
                  <a className="hover:text-primary transition-colors" href="tel:+15550192834">
                    +1 (555) 019-2834
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mt-8">
                <span className="text-primary text-xs font-sans uppercase tracking-[0.2em] font-bold">Socials</span>
                <div className="flex gap-6 font-sans text-charcoal-light">
                  <a className="hover:text-primary transition-colors" href="#" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                  <a className="hover:text-primary transition-colors" href="#" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a className="hover:text-primary transition-colors" href="#" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="group relative">
                    <input
                      className="peer w-full bg-transparent border-0 border-b border-charcoal/20 py-4 text-xl text-charcoal placeholder-charcoal/40 focus:border-primary focus:ring-0 transition-colors duration-300 font-sans font-light outline-none"
                      id="name"
                      name="name"
                      placeholder="Name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="group relative">
                    <input
                      className="peer w-full bg-transparent border-0 border-b border-charcoal/20 py-4 text-xl text-charcoal placeholder-charcoal/40 focus:border-primary focus:ring-0 transition-colors duration-300 font-sans font-light outline-none"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="group relative">
                  <input
                    className="peer w-full bg-transparent border-0 border-b border-charcoal/20 py-4 text-xl text-charcoal placeholder-charcoal/40 focus:border-primary focus:ring-0 transition-colors duration-300 font-sans font-light outline-none"
                    id="subject"
                    name="subject"
                    placeholder="Topic of Discourse"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                
                <div className="group relative">
                  <textarea
                    className="peer w-full bg-transparent border-0 border-b border-charcoal/20 py-4 text-xl text-charcoal placeholder-charcoal/40 focus:border-primary focus:ring-0 transition-colors duration-300 font-sans font-light outline-none resize-none"
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                
                <div className="pt-8 flex justify-start">
                  <button
                    className="group relative flex items-center justify-center gap-3 bg-primary text-white rounded-full px-12 py-4 text-sm uppercase tracking-widest font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit Proposal'}</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div aria-hidden="true" className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-bl from-primary/10 to-transparent blur-[100px] -z-10 rounded-full pointer-events-none opacity-60"></div>
      </main>
      
      <MinimalFooter />
    </div>
  );
}
