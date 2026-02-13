
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Language } from '../types';
import { GoogleGenAI } from "@google/genai";
import { speakText } from '../services/gemini';

interface AIViewProps {
  user: User;
  language: Language;
}

const AIView: React.FC<AIViewProps> = ({ user, language }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'mitra', text: string}[]>([
    { role: 'mitra', text: language === 'hi' ? "नमस्ते अर्जुन! मैं मित्रा हूँ। आप आज क्या सीखना चाहते हैं?" : "Namaste Arjun! I'm Mitra. What do you want to learn today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || loading) return;
    
    const userMsg = textToSend.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are 'Mitra', a friendly AI tutor for a 5th grade student in rural India. Answer this question simply in ${language}: ${userMsg}`,
      });
      
      const mitraText = response.text || "I'm not sure, but let's find out together!";
      setMessages(prev => [...prev, { role: 'mitra', text: mitraText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'mitra', text: "Oops, my thinking wires are tangled. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-14rem)] mt-24 mb-28 flex flex-col bg-white rounded-[3rem] clay-card overflow-hidden relative border-none">
      <div className="bg-orange-500 p-6 text-white flex items-center justify-between border-b-4 border-orange-400 shadow-inner">
        <div className="flex items-center gap-4">
          <Link to="/" className="w-12 h-12 bg-white/20 hover:bg-white/40 rounded-2xl flex items-center justify-center text-2xl transition-all clay-button border-2 border-white/30">←</Link>
          <div>
            <h1 className="font-kids font-black text-xl">Mitra AI Lab</h1>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Always Online • Voice Powered</p>
          </div>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-inner border-2 border-white clay-button">🤖</div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-[85%] p-5 rounded-[2rem] font-bold text-sm border-2 group ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white border-indigo-400 rounded-br-none shadow-inner' 
                : 'bg-white text-slate-800 border-white rounded-bl-none clay-button shadow-none'
            }`}>
              {m.text}
              {m.role === 'mitra' && (
                <button 
                  onClick={() => speakText(m.text, language)}
                  className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border-2 border-indigo-100 flex items-center justify-center text-sm clay-button shadow-inner"
                >
                  🔊
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs font-black text-slate-400 animate-pulse flex items-center gap-2 px-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-inner border-2 border-white clay-button animate-bounce">🤖</div>
          Mitra is thinking...
        </div>}
      </div>

      <div className="p-6 border-t-4 border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="flex gap-3">
          <button 
            onClick={toggleListening}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-4 ${
              isListening ? 'bg-red-500 text-white animate-pulse border-red-400' : 'bg-slate-50 text-indigo-600 border-white clay-button shadow-inner'
            }`}
          >
            {isListening ? '⏹️' : '🎤'}
          </button>
          
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Listening..." : "Ask Mitra anything..."}
            className="flex-1 bg-slate-100 rounded-2xl px-6 py-4 text-sm font-black border-4 border-white shadow-inner focus:border-orange-500 outline-none transition-all"
          />
          
          <button 
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="bg-orange-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-orange-400 clay-button shadow-inner disabled:opacity-50"
          >
            🚀
          </button>
        </div>
      </div>
    </div>
  );
};
export default AIView;
