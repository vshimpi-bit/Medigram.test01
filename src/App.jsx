import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import VoiceSection from './components/VoiceSection';
import SymptomChecker from './components/SymptomChecker';
import ClinicFinder from './components/ClinicFinder';
import FamilyLocker from './components/FamilyLocker';
import GovtSchemes from './components/GovtSchemes';
import HealthRecords from './components/HealthRecords';
import HealthTips from './components/HealthTips';
import CallAshaModal from './components/CallAshaModal';
import SosModal from './components/SosModal';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'
  const [activeTab, setActiveTab] = useState('home');
  const [sosOpen, setSosOpen] = useState(false);
  const [ashaCallOpen, setAshaCallOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-[#f6faff] dark:bg-[#001e2f] text-[#001e2f] dark:text-[#ebf5ff] flex flex-col font-sans transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Top Bar Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Desktop Left Navigation Sidebar */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSos={() => setSosOpen(true)}
          viewMode={viewMode}
        />

        {/* Content View Container */}
        <main className={`flex-1 p-4 md:p-6 pb-28 md:pb-12 transition-all ${
          viewMode === 'mobile' ? 'max-w-md mx-auto my-4 bg-white dark:bg-[#001e2f] border border-[#857462]/20 rounded-3xl shadow-2xl overflow-hidden min-h-[760px]' : 'w-full'
        }`}>
          {/* Active Tab Content */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              <VoiceSection 
                setActiveTab={setActiveTab} 
                onOpenAshaCall={() => setAshaCallOpen(true)} 
              />
              <HealthTips 
                setActiveTab={setActiveTab} 
                onOpenAshaCall={() => setAshaCallOpen(true)} 
              />
            </div>
          )}

          {activeTab === 'voice' && (
            <VoiceSection 
              setActiveTab={setActiveTab} 
              onOpenAshaCall={() => setAshaCallOpen(true)} 
            />
          )}

          {activeTab === 'symptoms' && (
            <SymptomChecker 
              setActiveTab={setActiveTab} 
              onOpenAshaCall={() => setAshaCallOpen(true)} 
            />
          )}

          {activeTab === 'clinics' && (
            <ClinicFinder />
          )}

          {activeTab === 'family' && (
            <FamilyLocker onOpenAshaCall={() => setAshaCallOpen(true)} />
          )}

          {activeTab === 'schemes' && (
            <GovtSchemes />
          )}

          {activeTab === 'records' && (
            <HealthRecords />
          )}
        </main>
      </div>

      {/* Fixed SOS Floating Button (From HTML spec) */}
      <button
        onClick={() => setSosOpen(true)}
        className="fixed bottom-[88px] md:bottom-8 right-6 w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm flex items-center justify-center sos-pulse z-40 shadow-xl transition-transform active:scale-90 cursor-pointer border-2 border-white"
        title="Trigger Emergency SOS"
      >
        <span>SOS</span>
      </button>

      {/* Modals */}
      <SosModal isOpen={sosOpen} onClose={() => setSosOpen(false)} />
      <CallAshaModal isOpen={ashaCallOpen} onClose={() => setAshaCallOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
