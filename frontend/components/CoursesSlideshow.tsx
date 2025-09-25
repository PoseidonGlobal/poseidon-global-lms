'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  summary: string;
  level: string;
  duration: string;
  image?: string;
}

export default function CoursesSlideshow() {
  const featuredCourses: Course[] = [
    {
      id: 'maritime-security-fundamentals',
      title: 'Maritime Security Fundamentals',
      summary: 'Essential security protocols and threat assessment for maritime professionals.',
      level: 'Beginner',
      duration: '4 weeks'
    },
    {
      id: 'port-security-management',
      title: 'Port Security Management',
      summary: 'Advanced port security strategies and emergency response procedures.',
      level: 'Intermediate',
      duration: '6 weeks'
    },
    {
      id: 'vessel-protection-systems',
      title: 'Vessel Protection Systems',
      summary: 'Comprehensive training on vessel security systems and technologies.',
      level: 'Advanced',
      duration: '8 weeks'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredCourses.length]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Courses</h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredCourses.map((course) => (
              <div key={course.id} className="w-full flex-shrink-0">
                <div className="mx-auto max-w-lg bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.summary}</p>
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <span>Level: {course.level}</span>
                    <span>Duration: {course.duration}</span>
                  </div>
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {featuredCourses.map((_, index) => (
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