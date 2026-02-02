'use client';

import { useState } from 'react';
import MinimalNav from '../components/MinimalNav';
import MinimalFooter from '../components/MinimalFooter';

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    year: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your application! We will review it and get back to you soon.');
        setFormData({ name: '', email: '', studentId: '', year: '' });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Failed to submit application. Please try again.'}`);
      }
    } catch (error) {
      console.error('Join form error:', error);
      alert('Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light relative overflow-hidden">
      <MinimalNav />
      
      <main className="flex flex-col items-center justify-center min-h-screen w-full px-6 py-24 relative z-10">
        <div className="max-w-[1000px] w-full flex flex-col items-center text-center gap-8">
          <div className="title-gradient">
            <h1 className="text-charcoal text-[12vw] md:text-[7rem] leading-[0.85] tracking-[-0.04em] font-display font-light select-none cursor-default opacity-0 animate-fade-in-up">
              Collaborate<span className="text-primary">.</span>
            </h1>
          </div>
          
          <p className="text-charcoal-light text-lg md:text-xl font-normal leading-relaxed max-w-[580px] text-center font-sans opacity-0 animate-fade-in-up [animation-delay:300ms]">
            We are curating a collective of builders, thinkers, and architects of change. The application window for the next cohort is now open.
          </p>
          
          <div className="w-full max-w-lg mt-8 opacity-0 animate-fade-in-up [animation-delay:600ms]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
              <div className="group relative z-0 w-full">
                <input
                  className="block py-3 px-0 w-full text-lg text-charcoal bg-transparent border-0 border-b border-charcoal/20 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors font-sans"
                  id="name"
                  name="name"
                  placeholder=" "
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-charcoal-light/60 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-sans"
                  htmlFor="name"
                >
                  Full Name
                </label>
              </div>
              
              <div className="group relative z-0 w-full">
                <input
                  className="block py-3 px-0 w-full text-lg text-charcoal bg-transparent border-0 border-b border-charcoal/20 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors font-sans"
                  id="email"
                  name="email"
                  placeholder=" "
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-charcoal-light/60 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-sans"
                  htmlFor="email"
                >
                  University Email
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="group relative z-0 w-full">
                  <input
                    className="block py-3 px-0 w-full text-lg text-charcoal bg-transparent border-0 border-b border-charcoal/20 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors font-sans"
                    id="student_id"
                    name="student_id"
                    placeholder=" "
                    required
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-charcoal-light/60 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-sans"
                    htmlFor="student_id"
                  >
                    Student ID
                  </label>
                </div>
                
                <div className="group relative z-0 w-full">
                  <select
                    className="block py-3 px-0 w-full text-lg text-charcoal bg-transparent border-0 border-b border-charcoal/20 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors cursor-pointer font-sans"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                  >
                    <option className="bg-background-light" disabled value="">
                      
                    </option>
                    <option className="bg-background-light" value="1">
                      Year 1
                    </option>
                    <option className="bg-background-light" value="2">
                      Year 2
                    </option>
                    <option className="bg-background-light" value="3">
                      Year 3
                    </option>
                    <option className="bg-background-light" value="4">
                      Year 4
                    </option>
                  </select>
                  <label
                    className="peer-focus:font-medium absolute text-sm text-charcoal-light/60 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-sans"
                    htmlFor="year"
                  >
                    Current Year
                  </label>
                </div>
              </div>
              
              <div className="pt-8 flex justify-center">
                <button
                  className="group relative flex items-center justify-center gap-3 bg-primary text-white rounded-full w-full md:w-auto md:px-16 py-4 text-base font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Join'}</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7m10 0v10" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-primary/10 to-transparent blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      </main>
      
      <MinimalFooter />
    </div>
  );
}
