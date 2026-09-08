import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Stethoscope, Building2, Users, Phone, Droplet, ShieldAlert, Sparkles, Heart, Award, FileText } from 'lucide-react';

export default function HealthTips({ setActiveTab, onOpenAshaCall }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Contextual Hero Banner */}
      <div className="w-full h-48 sm:h-56 md:h-64 rounded-3xl overflow-hidden shadow-md border border-[#857462]/10 relative group">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
          alt="Healthcare guide rural and urban"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001e2f]/85 via-[#001e2f]/40 to-transparent flex flex-col justify-end p-5 md:p-8">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Care Mission</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t('tagline')}
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
            Voice-guided medical triage, PHC appointments, and direct ASHA worker support for your village and family.
          </p>
        </div>
      </div>

      {/* Action Grid (6 Cards matching Screen 02 updated Home) */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: Check Symptoms */}
        <button
          onClick={() => setActiveTab('symptoms')}
          className="bg-white dark:bg-[#123348] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-[#857462]/10 shadow-xs transition-all active:scale-95 hover:border-[#0062a2] hover:shadow-md min-h-[120px] cursor-pointer group"
        >
          <div className="w-13 h-13 rounded-full bg-[#67b3ff]/20 text-[#004473] dark:text-[#67b3ff] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">stethoscope</span>
          </div>
          <span className="font-bold text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff] text-center">
            {t('checkSymptoms')}
          </span>
        </button>

        {/* Card 2: Find Clinic */}
        <button
          onClick={() => setActiveTab('clinics')}
          className="bg-white dark:bg-[#123348] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-[#857462]/10 shadow-xs transition-all active:scale-95 hover:border-[#0062a2] hover:shadow-md min-h-[120px] cursor-pointer group"
        >
          <div className="w-13 h-13 rounded-full bg-[#d5ebff] dark:bg-[#004473] text-[#0062a2] dark:text-[#9dcaff] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">local_hospital</span>
          </div>
          <span className="font-bold text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff] text-center">
            {t('findClinic')}
          </span>
        </button>

        {/* Card 3: My Family */}
        <button
          onClick={() => setActiveTab('family')}
          className="bg-white dark:bg-[#123348] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-[#857462]/10 shadow-xs transition-all active:scale-95 hover:border-[#0062a2] hover:shadow-md min-h-[120px] cursor-pointer group"
        >
          <div className="w-13 h-13 rounded-full bg-[#d5ebff] dark:bg-[#004473] text-[#0062a2] dark:text-[#9dcaff] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">group</span>
          </div>
          <span className="font-bold text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff] text-center">
            {t('myFamily')}
          </span>
        </button>

        {/* Card 4: Call ASHA */}
        <button
          onClick={onOpenAshaCall}
          className="bg-white dark:bg-[#123348] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-[#857462]/10 shadow-xs transition-all active:scale-95 hover:border-[#f5a623] hover:shadow-md min-h-[120px] cursor-pointer group"
        >
          <div className="w-13 h-13 rounded-full bg-[#f5a623]/20 text-[#644000] dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">person</span>
          </div>
          <span className="font-bold text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff] text-center">
            {t('callAsha')}
          </span>
        </button>

        {/* Card 5: Govt. Schemes */}
        <button
          onClick={() => setActiveTab('schemes')}
          className="bg-white dark:bg-[#123348] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-[#857462]/10 shadow-xs transition-all active:scale-95 hover:border-[#835500] hover:shadow-md min-h-[120px] cursor-pointer group"
        >
          <div className="w-13 h-13 rounded-full bg-amber-500/15 text-[#835500] dark:text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">account_balance</span>
          </div>
          <span className="font-bold text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff] text-center">
            {t('govtSchemes')}
          </span>
        </button>

        {/* Card 6: Health Records */}
        <button
          onClick={() => setActiveTab('records')}
          className="bg-white dark:bg-[#123348] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-[#857462]/10 shadow-xs transition-all active:scale-95 hover:border-[#0062a2] hover:shadow-md min-h-[120px] cursor-pointer group"
        >
          <div className="w-13 h-13 rounded-full bg-[#d5ebff] dark:bg-[#004473] text-[#0062a2] dark:text-[#9dcaff] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">description</span>
          </div>
          <span className="font-bold text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff] text-center">
            {t('healthRecords')}
          </span>
        </button>
      </section>

      {/* Horizontal Swipeable Health Tips Carousel */}
      <section className="flex overflow-x-auto gap-4 pb-2 no-scrollbar scroll-smooth">
        {/* Tip 1 */}
        <div className="shrink-0 w-[280px] sm:w-[320px] bg-white dark:bg-[#123348] rounded-2xl p-4 border border-[#857462]/10 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f5a623] text-[#644000] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">wb_sunny</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#001e2f] dark:text-[#ebf5ff]">{t('stayHydratedTitle')}</h4>
            <p className="text-xs text-[#524534] dark:text-[#c9e6ff] mt-0.5 line-clamp-2">{t('stayHydratedBody')}</p>
          </div>
        </div>

        {/* Tip 2 */}
        <div className="shrink-0 w-[280px] sm:w-[320px] bg-white dark:bg-[#123348] rounded-2xl p-4 border border-[#857462]/10 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#001e2f] dark:text-[#ebf5ff]">Clean Water & ORS Tip</h4>
            <p className="text-xs text-[#524534] dark:text-[#c9e6ff] mt-0.5 line-clamp-2">Add 1 pinch salt + 1 spoon sugar to boiled water for instant dehydration recovery.</p>
          </div>
        </div>

        {/* Tip 3 */}
        <div className="shrink-0 w-[280px] sm:w-[320px] bg-white dark:bg-[#123348] rounded-2xl p-4 border border-[#857462]/10 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#001e2f] dark:text-[#ebf5ff]">Monsoon Dengue Guard</h4>
            <p className="text-xs text-[#524534] dark:text-[#c9e6ff] mt-0.5 line-clamp-2">Empty stagnant water containers around home to stop mosquito breeding.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
