
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface LeaderboardProps {
  user: User;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const RANKS = [
    { name: "Rahul J.", xp: 2450, rank: 1, avatar: "🦁" },
    { name: "Sita M.", xp: 2100, rank: 2, avatar: "🦋" },
    { name: "Priya K.", xp: 1980, rank: 3, avatar: "🐼" },
    { name: user.name, xp: user.xp, rank: 4, avatar: "🦊", isCurrent: true },
    { name: "Deepak S.", xp: 1100, rank: 5, avatar: "🐯" },
    { name: "Meera B.", xp: 950, rank: 6, avatar: "🐱" },
    { name: "Anil P.", xp: 820, rank: 7, avatar: "🐰" }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-24 pb-32 px-4">
      <Link to="/" className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-2xl clay-button border-2 border-white text-slate-600 font-black hover:text-indigo-600 group">
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        Back to Home
      </Link>

      <div className="text-center space-y-2">
        <h1 className="font-kids text-4xl text-slate-800 font-black">Village Heroes</h1>
        <p className="text-slate-500 font-bold">Top learners this week!</p>
      </div>

      <div className="flex justify-center items-end gap-4 py-10">
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-2 animate-bounce-subtle">🥈</div>
          <div className="w-16 h-16 rounded-full bg-slate-50 border-4 border-white clay-button shadow-inner flex items-center justify-center text-3xl">🦋</div>
          <p className="font-black text-slate-700 mt-3 text-sm">Sita M.</p>
          <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full border border-slate-100 text-slate-400">2,100</span>
        </div>
        <div className="flex flex-col items-center scale-125 z-10">
          <div className="text-4xl mb-2 animate-bounce">🥇</div>
          <div className="w-20 h-20 rounded-full bg-yellow-400 border-4 border-white clay-button shadow-inner flex items-center justify-center text-4xl">🦁</div>
          <p className="font-black text-slate-800 mt-3 text-sm">Rahul J.</p>
          <span className="text-[10px] font-black bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full border border-yellow-200 shadow-inner">2,450</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-2 animate-bounce-subtle delay-300">🥉</div>
          <div className="w-16 h-16 rounded-full bg-orange-400 border-4 border-white clay-button shadow-inner flex items-center justify-center text-3xl">🐼</div>
          <p className="font-black text-slate-700 mt-3 text-sm">Priya K.</p>
          <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full border border-slate-100 text-slate-400">1,980</span>
        </div>
      </div>

      <div className="clay-card bg-white overflow-hidden p-2">
        {RANKS.map((r) => (
          <div 
            key={r.name} 
            className={`flex items-center justify-between p-4 rounded-3xl transition-all ${r.isCurrent ? 'bg-indigo-50 border-2 border-white shadow-inner' : 'hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 text-center font-black ${r.rank <= 3 ? 'text-orange-500' : 'text-slate-300'}`}>
                #{r.rank}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-2xl clay-button shadow-inner">
                {r.avatar}
              </div>
              <div>
                <p className={`font-black text-sm ${r.isCurrent ? 'text-indigo-600' : 'text-slate-700'}`}>
                  {r.name} {r.isCurrent && "⭐"}
                </p>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Explorer</p>
              </div>
            </div>
            <div className="font-black text-slate-800 bg-white px-4 py-2 rounded-2xl border-2 border-slate-50 shadow-inner text-sm">
              {r.xp.toLocaleString()} <span className="text-indigo-400 text-[10px]">XP</span>
            </div>
          </div>
        ))}
      </div>

      <div className="clay-card bg-indigo-600 p-8 text-white text-center shadow-indigo-200 border-indigo-500">
        <h3 className="font-kids text-2xl font-black mb-2">Almost at the Top!</h3>
        <p className="text-indigo-100 text-sm font-bold mb-6">Complete one more quiz to beat Priya!</p>
        <Link to="/quizzes" className="inline-block bg-white text-indigo-600 font-black px-10 py-4 rounded-2xl clay-button border-2 border-white text-sm">
          FIGHT BACK! ⚡
        </Link>
      </div>
    </div>
  );
};
export default Leaderboard;
