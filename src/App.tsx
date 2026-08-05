import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { SplashPage } from './pages/SplashPage';
import { HomePage } from './pages/HomePage';
import { PlacePage } from './pages/PlacePage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl relative overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/place" element={<PlacePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
};

export default App;
