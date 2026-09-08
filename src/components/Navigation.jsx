import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Home, Mic, Stethoscope, MapPin, Users, AlertTriangle, Award, FileText } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab, onOpenSos, viewMode }) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('home'), icon: 'home', lucide: Home },
    { id: 'voice', label: t('voice'), icon: 'mic', lucide: Mic },
    { id: 'symptoms', label: t('symptomsTab'), icon: 'stethoscope', lucide: Stethoscope },
    { id: 'clinics', label: t('map'), icon: 'map', lucide: MapPin },
    { id: 'family', label: t('family'), icon: 'group', lucide: Users },
    { id: 'schemes', label: t('govtSchemes'), icon: 'account_balance', lucide: Award },
    { id: 'records', label: t('healthRecords'), icon: 'description', lucide: FileText },
  ];

  return (
    <>
      {/* Desktop Sidebar (visible on md+ screens when in web mode) */}
      <aside className={`hidden md:flex flex-col w-64 bg-white dark:bg-[#001e2f] border-r border-[#857462]/10 p-4 shrink-0 transition-all ${viewMode === 'mobile' ? 'hidden' : ''}`}>
        <div className="text-xs font-bold uppercase tracking-wider text-[#524534] dark:text-[#c9e6ff] px-3 mb-3">
          Main Navigation
        </div>
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#67b3ff]/20 text-[#004473] dark:text-[#9dcaff] font-bold border-l-4 border-[#0062a2]'
                    : 'text-[#524534] dark:text-[#c9e6ff] hover:bg-[#ebf5ff] dark:hover:bg-[#123348]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop SOS Trigger Widget */}
        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/20 border border-red-500/20 text-center">
          <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-bold mb-1">
            <AlertTriangle className="w-5 h-5 animate-bounce" />
            <span>Emergency 24x7</span>
          </div>
          <p className="text-xs text-[#524534] dark:text-[#c9e6ff] mb-3">
            Press SOS for immediate medical dispatch
          </p>
          <button
            onClick={onOpenSos}
            className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Trigger SOS Alert
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (4 primary items matching Screen 02 spec) */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#001e2f]/95 backdrop-blur-md border-t border-[#857462]/10 px-2 py-2 flex justify-around items-center h-[68px] ${viewMode === 'desktop' ? 'md:hidden' : ''}`}>
        {[
          { id: 'home', label: t('home'), icon: 'home' },
          { id: 'voice', label: t('voice'), icon: 'mic' },
          { id: 'clinics', label: t('map'), icon: 'map' },
          { id: 'family', label: t('family'), icon: 'group' },
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#67b3ff]/25 dark:bg-[#004473] text-[#004473] dark:text-[#9dcaff] font-bold scale-105'
                  : 'text-[#524534] dark:text-[#c9e6ff] hover:opacity-80'
              }`}
            >
              <span className={`material-symbols-outlined text-2xl ${isActive ? 'icon-fill' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[11px] font-medium mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
