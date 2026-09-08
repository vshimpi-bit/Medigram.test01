import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Globe, Smartphone, Monitor, Bell, Check, X } from 'lucide-react';

export default function Header({ 
  darkMode, 
  setDarkMode, 
  activeTab, 
  setActiveTab, 
  viewMode, 
  setViewMode 
}) {
  const { lang, setLang, t } = useLanguage();
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    { id: 1, text: "Polio Drops (OPV 3) due on 15 Oct for Ravi.", time: "10 mins ago", unread: true },
    { id: 2, text: "Sunita Devi (ASHA) sent a health alert: High Heatwave today.", time: "1 hour ago", unread: true },
    { id: 3, text: "OPD Token #42 confirmed at Rampur PHC.", time: "Yesterday", unread: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f6faff]/90 dark:bg-[#001e2f]/90 backdrop-blur-md border-b border-[#857462]/10 px-4 md:px-8 h-[72px] flex items-center justify-between transition-colors shadow-xs">
      {/* Brand & Back Button */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setActiveTab('home')}
          className="p-2 rounded-xl text-[#835500] dark:text-[#ffb955] hover:bg-[#ebf5ff] dark:hover:bg-[#123348] transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          title="Go to Home"
        >
          <span className="material-symbols-outlined text-2xl">local_hospital</span>
        </button>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl md:text-2xl tracking-tight text-[#835500] dark:text-[#ffb955]">
            {t('appName')}
          </h1>
          <span className="text-[10px] uppercase font-bold text-[#0062a2] dark:text-[#67b3ff] tracking-widest hidden sm:inline-block">
            Smart Healthcare AI
          </span>
        </div>
      </div>

      {/* Center Controls: App View vs Web Desktop View toggle */}
      <div className="hidden lg:flex items-center gap-1 bg-[#e0f0ff] dark:bg-[#123348] p-1 rounded-full border border-[#857462]/10">
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'mobile'
              ? 'bg-[#0062a2] text-white shadow-sm'
              : 'text-[#524534] dark:text-[#c9e6ff] hover:text-[#001e2f]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          {t('mobileView')}
        </button>
        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'desktop'
              ? 'bg-[#0062a2] text-white shadow-sm'
              : 'text-[#524534] dark:text-[#c9e6ff] hover:text-[#001e2f]'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          {t('webView')}
        </button>
      </div>

      {/* Right Controls: Online pill, Language select, Notifications, Dark mode */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Online Pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#d5ebff] dark:bg-[#123348] px-3 py-1 rounded-full border border-[#857462]/10">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-[#004473] dark:text-[#c9e6ff]">{t('online')}</span>
        </div>

        {/* Language Selector */}
        <div className="relative flex items-center bg-[#ebf5ff] dark:bg-[#123348] rounded-xl px-2.5 py-1 border border-[#857462]/15">
          <Globe className="w-4 h-4 text-[#835500] dark:text-[#ffb955] mr-1.5 shrink-0" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-xs font-bold text-[#001e2f] dark:text-[#ebf5ff] focus:outline-none cursor-pointer pr-1 py-0.5"
          >
            <option value="en" className="bg-[#f6faff] dark:bg-[#001e2f]">English</option>
            <option value="hi" className="bg-[#f6faff] dark:bg-[#001e2f]">हिंदी (Hindi)</option>
            <option value="mr" className="bg-[#f6faff] dark:bg-[#001e2f]">मराठी (Marathi)</option>
            <option value="ta" className="bg-[#f6faff] dark:bg-[#001e2f]">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Notification Bell Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setUnreadCount(0);
            }}
            className="relative p-2 rounded-xl text-[#001e2f] dark:text-[#ebf5ff] hover:bg-[#e0f0ff] dark:hover:bg-[#123348] transition-all cursor-pointer"
            title="Health Notifications"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Dropdown Modal */}
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-[#001e2f] rounded-2xl p-4 shadow-2xl border border-[#857462]/20 z-50 animate-scale-up">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-800 mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#001e2f] dark:text-[#ebf5ff]">
                  Health Notifications
                </h4>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-[#f6faff] dark:bg-[#123348] text-xs">
                    <p className="font-semibold text-[#001e2f] dark:text-[#ebf5ff]">{n.text}</p>
                    <span className="text-[10px] text-gray-400 block mt-1">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-[#0062a2] dark:text-[#67b3ff] hover:bg-[#e0f0ff] dark:hover:bg-[#123348] transition-all active:scale-95 cursor-pointer"
          title={darkMode ? t('lightMode') : t('darkMode')}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
