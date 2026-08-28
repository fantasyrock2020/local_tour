import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { SplashPage } from './pages/SplashPage';
import { HomePage } from './pages/HomePage';
import { PlacePage } from './pages/PlacePage';
import { CategoryPage } from './pages/CategoryPage';
import { BottomNavigation } from './components/Common/BottomNavigation';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl relative">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/place" element={<PlacePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BottomNavigation />
        </BrowserRouter>
      </div>
    </AppProvider>
  );
};

export default App;
