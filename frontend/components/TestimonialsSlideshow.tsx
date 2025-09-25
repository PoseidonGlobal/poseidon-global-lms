'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

export default function TestimonialsSlideshow() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Captain Sarah Johnson',
      role: 'Maritime Security Officer',
      content: 'The practical training scenarios prepared me for real-world maritime security challenges.'
    },
    {
      id: 2,
      name: 'Officer Miguel Rodriguez',
      role: 'Port Security Specialist',
      content: 'Excellent course content that meets international standards and industry requirements.'
    },
    {
      id: 3,
      name: 'Chief Engineer Lisa Chen',
      role: 'Senior Maritime Professional',
      content: 'Comprehensive training that enhanced my understanding of maritime security protocols.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Students Say</h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <div className="text-center p-6">
                  <blockquote className="text-lg italic text-gray-700 mb-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <cite className="not-italic">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}