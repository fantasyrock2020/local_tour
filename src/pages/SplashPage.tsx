import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 1600);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-slate-50 py-20 px-6 text-center animate-fadeIn">
      <div className="my-auto space-y-4">
        {/* Animated App Logo Icon */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-transform duration-500 animate-bounce">
          <Compass className="w-14 h-14 text-white stroke-[1.75]" />
        </div>

        {/* App Title */}
        <h1 className="text-3xl font-extrabold text-purple-700 tracking-tight">
          Đi Đâu
        </h1>

        {/* App Highlight Subtitle */}
        <p className="text-sm font-medium text-slate-600">
          Ăn gì • Chơi đâu • Nghỉ đâu
        </p>
      </div>

      {/* Fancy Loading Spinner matching Flutter FancyLoading */}
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-ping" />
        <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-ping [animation-delay:0.2s]" />
        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping [animation-delay:0.4s]" />
      </div>
    </div>
  );
};
