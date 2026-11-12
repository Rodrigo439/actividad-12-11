import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DigimonProvider, useDigimons } from './context/DigimonContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import DigimonFormModal from './components/DigimonFormModal';

function AppContent() {
  const [isGlobalCreateOpen, setIsGlobalCreateOpen] = useState(false);
  const { addDigimon } = useDigimons();

  const handleGlobalCreateSubmit = (newData) => {
    addDigimon(newData);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar onOpenCreateModal={() => setIsGlobalCreateOpen(true)} />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<HomePage onOpenCreate={() => setIsGlobalCreateOpen(true)} />}
            />
            <Route path="/digimon/:id" element={<DetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Modal global para crear nuevo Digimon (Alta) */}
        <DigimonFormModal
          isOpen={isGlobalCreateOpen}
          onClose={() => setIsGlobalCreateOpen(false)}
          onSubmit={handleGlobalCreateSubmit}
        />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <DigimonProvider>
      <AppContent />
    </DigimonProvider>
  );
}
