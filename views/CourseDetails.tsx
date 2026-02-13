
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Language, Lesson } from '../types';

interface CourseDetailsProps {
  language: Language;
  isLiteMode: boolean;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ language, isLiteMode }) => {
  const { id } = useParams();
  const [downloadedIds, setDownloadedIds] = useState<string[]>(['1']);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isEnglishCourse = id === '3';
  const courseProgress = isEnglishCourse ? 85 : 45;

  const lessons: Lesson[] = [
    { id: '1', title: 'Introduction to Planets', type: 'video', isDownloaded: true },
    { id: '2', title: 'The Sun: Our Star', type: 'video', isDownloaded: false },
    { id: '3', title: 'Inner vs Outer Planets', type: 'audio', isDownloaded: false },
    { id: '4', title: 'Mars Exploration', type: 'text', isDownloaded: false },
    { id: '5', title: 'Chapter Quiz', type: 'video', isDownloaded: false }
  ];

  const handleDownload = (id: string) => {
    setDownloadedIds(prev => [...prev, id]);
    alert("Lesson downloaded! You can now watch it offline.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-24 pb-32 px-4">
      <Link to="/" className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-2xl clay-button border-2 border-white text-slate-600 font-black hover:text-indigo-600 group">
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        Back to Dashboard
      </Link>

      <div className="clay-card bg-white p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-full md:w-48 aspect-square bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner border-4 border-white clay-button flex-shrink-0">
            {isEnglishCourse ? '📖' : '🚀'}
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="font-kids text-4xl text-slate-800 font-black">
                {isEnglishCourse ? 'English Fun' : 'Earth Story'}
              </h1>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-end text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Syllabus Progress</span>
                  <span className="text-indigo-600">{courseProgress}%</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-inner">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-1000 ease-out liquid-progress shadow-inner"
                    style={{ width: mounted ? `${courseProgress}%` : '0%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed font-bold">
              {isEnglishCourse 
                ? "Let's explore the world of stories, words, and magic together! Learning English is like finding a key to a new universe." 
                : "In this course, we will journey through space and time to learn how our beautiful blue planet was born and how it supports life!"}
            </p>
            <div className="flex flex-wrap gap-3">
               <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 border-white shadow-inner">
                 ✅ Beginner
               </div>
               <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 border-white shadow-inner">
                 ⭐ 500 XP
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-kids text-2xl text-slate-800 font-black px-2">Path to Mastery</h2>
        <div className="grid gap-4">
          {lessons.map((lesson, index) => {
            const isDownloaded = downloadedIds.includes(lesson.id);
            return (
              <div key={lesson.id} className="clay-card bg-white p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-black border-2 border-white shadow-inner group-hover:bg-indigo-500 group-hover:text-white transition-colors clay-button">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-sm">{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                       <span>{lesson.type}</span>
                       <span>•</span>
                       {isDownloaded && <span className="text-teal-500">✓ Saved</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {!isDownloaded && (
                    <button 
                      onClick={() => handleDownload(lesson.id)}
                      className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-white clay-button shadow-inner text-indigo-500"
                    >
                      ⬇️
                    </button>
                  )}
                  {lesson.id === '5' ? (
                    <Link to="/quiz/1" className="bg-orange-500 text-white font-black px-6 py-3 rounded-2xl clay-button border-2 border-orange-400 text-xs shadow-inner">
                      QUIZ
                    </Link>
                  ) : (
                    <button className="bg-indigo-600 text-white font-black px-6 py-3 rounded-2xl clay-button border-2 border-indigo-400 text-xs shadow-inner">
                      PLAY
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
