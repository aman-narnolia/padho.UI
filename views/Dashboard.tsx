
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Language, Course } from '../types';
import Companion from '../components/Companion';

interface DashboardProps {
  user: User;
  language: Language;
  isLiteMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ user, language, isLiteMode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const translations = {
    en: { welcome: "Chalo Padhte Hain,", sub: "Today's adventure!", subjects: "Explore Worlds", streak: "Streak", xp: "Total XP", rank: "Your Rank" },
    hi: { welcome: "चलो पढ़ते हैं,", sub: "आज का सबक!", subjects: "विषयों की दुनिया", streak: "स्ट्राइक", xp: "कुल XP", rank: "आपकी रैंक" },
    ta: { welcome: "வாங்க படிக்கலாம்,", sub: "இன்றைய பயணம்!", subjects: "உலகங்களை ஆராயுங்கள்", streak: "ஸ்டிரீக்", xp: "மொத்த XP", rank: "உங்கள் தரவரிசை" }
  };

  const t = translations[language];

  const COURSES: Course[] = [
    { id: '1', title: 'Math Magic', subject: 'Math', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400', progress: 45, lessons: [] },
    { id: '2', title: 'Super Science', subject: 'Science', thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400', progress: 20, lessons: [] },
    { id: '3', title: 'English Fun', subject: 'English', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400', progress: 85, lessons: [] },
    { id: '4', title: 'History Mystery', subject: 'History', thumbnail: 'https://images.unsplash.com/photo-1461360228754-6e81c478c882?auto=format&fit=crop&q=80&w=400', progress: 10, lessons: [] }
  ];

  return (
    <div className="space-y-6 pt-20 pb-32 max-w-4xl mx-auto px-2">
      <Companion user={user} language={language} context="starting the day's lesson" />
      
      {/* 1. TOP STATS */}
      <section className="grid grid-cols-2 gap-4">
        <div className="clay-card bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center clay-button border-2 border-white shadow-inner">
               <span className="text-xl animate-bounce-subtle">🔥</span>
            </div>
            <div className="leading-tight">
              <p className="text-slate-800 font-black text-base">{user.streak}</p>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-tight">{t.streak}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(d => (
              <div key={d} className={`h-2 w-2 rounded-full ${d <= user.streak ? 'bg-orange-500 shadow-inner' : 'bg-slate-100 shadow-inner'}`}></div>
            ))}
          </div>
        </div>

        <div className="clay-card bg-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-inner border-2 border-teal-400 clay-button">💎</div>
          <div className="leading-tight">
            <p className="text-slate-800 font-black text-base">{user.xp.toLocaleString()}</p>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-tight">{t.xp}</p>
          </div>
        </div>
      </section>

      {/* 2. HERO */}
      <section className="clay-card bg-indigo-600 p-6 text-white relative overflow-hidden shadow-indigo-200">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-2">
            <h1 className="font-kids text-2xl md:text-3xl font-black leading-tight">
              {t.welcome} <span className="text-yellow-400 drop-shadow-sm">{user.name}!</span>
            </h1>
            <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-[0.2em]">{t.sub}</p>
          </div>
          
          <Link to="/course/3" className="bg-white text-indigo-600 font-black px-6 py-4 rounded-2xl clay-button text-sm flex-shrink-0 border-2 border-white">
            Keep Playing 🎮
          </Link>
        </div>
        <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 rotate-12 select-none pointer-events-none font-black italic">PADHO</div>
      </section>

      {/* 3. SUBJECT GRID */}
      <section id="course-grid">
        <div className="flex items-center gap-4 mb-6 px-2">
          <h2 className="font-kids text-2xl text-slate-800 font-black drop-shadow-sm">{t.subjects}</h2>
          <div className="h-2 flex-1 bg-white rounded-full shadow-inner border border-slate-200/50"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COURSES.map((course) => (
            <div key={course.id} className="group">
              <div className="clay-card bg-white p-3 flex flex-col gap-3 h-full group-hover:-translate-y-2">
                <Link to={`/course/${course.id}`} className="block flex-1 space-y-3">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border-2 border-slate-100 shadow-inner">
                    {!isLiteMode ? (
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📚</div>
                    )}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-xl text-[8px] font-black shadow-inner uppercase tracking-widest border border-slate-100">
                        {course.subject}
                    </div>
                  </div>
                  
                  <div className="px-1 space-y-2 text-center sm:text-left">
                    <h3 className="font-black text-sm text-slate-800 line-clamp-1">{course.title}</h3>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner border border-slate-200/30">
                      <div 
                        className="bg-indigo-500 h-full transition-all duration-1000 ease-out liquid-progress shadow-inner" 
                        style={{ width: mounted ? `${course.progress}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                </Link>

                <Link to={`/course/${course.id}`} className="bg-indigo-50 text-indigo-600 font-black py-2.5 rounded-2xl clay-button text-[10px] text-center group-hover:bg-indigo-600 group-hover:text-white border-2 border-indigo-100 transition-all">
                  START →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOOTER */}
      <section className="clay-card bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0 shadow-inner border-2 border-white clay-button">🦊</div>
            <div className="text-center sm:text-left">
               <h2 className="font-kids text-xl font-black text-slate-800">{t.rank}: Explorer</h2>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-tight">You're in the top 10% this week!</p>
            </div>
         </div>
         <Link to="/leaderboard" className="w-full sm:w-auto bg-slate-800 text-white font-black px-8 py-4 rounded-2xl clay-button border-2 border-slate-700 text-sm text-center">
            See the Leaderboard
         </Link>
      </section>
    </div>
  );
};
export default Dashboard;
