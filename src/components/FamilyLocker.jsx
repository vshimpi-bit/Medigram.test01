import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Phone, MessageSquare, Syringe, History, FileText, Check, Lock, Bell, Calendar, ShieldCheck, QrCode } from 'lucide-react';

export default function FamilyLocker({ onOpenAshaCall }) {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState('ravi');
  const [activeSubTab, setActiveSubTab] = useState('tracker'); // 'tracker', 'history', 'reports'

  const members = [
    {
      id: 'ravi',
      name: 'Ravi',
      relation: 'Son',
      img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
      active: true,
    },
    {
      id: 'anil',
      name: 'Anil',
      relation: 'Husband',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      active: false,
    },
    {
      id: 'meena',
      name: 'Meena',
      relation: 'Mother',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      active: false,
    }
  ];

  const vaccineSchedule = [
    {
      id: 1,
      name: 'BCG',
      subtitle: 'Given at birth',
      status: 'done',
    },
    {
      id: 2,
      name: 'OPV 1, Pentavalent 1',
      subtitle: '6 Weeks',
      status: 'done',
    },
    {
      id: 3,
      name: 'OPV 3, Pentavalent 3',
      subtitle: 'Due: 15 Oct 2023',
      status: 'due',
    },
    {
      id: 4,
      name: 'Measles 1st Dose',
      subtitle: '9-12 Months',
      status: 'future',
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 w-full space-y-6">
      {/* ASHA Worker Persistent Card (Matching Screen 02 HTML) */}
      <section className="bg-white dark:bg-[#123348] rounded-2xl border border-[#857462]/20 p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            alt="Sunita Devi ASHA Worker"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#d5ebff]"
          />
          <div>
            <h2 className="text-base md:text-lg font-bold text-[#001e2f] dark:text-[#ebf5ff]">
              {t('ashaWorkerName')}
            </h2>
            <p className="text-xs text-[#524534] dark:text-[#c9e6ff]">
              {t('ashaTitle')}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onOpenAshaCall}
            aria-label="Call ASHA Worker"
            className="w-11 h-11 rounded-full bg-[#67b3ff]/20 text-[#004473] dark:text-[#67b3ff] flex items-center justify-center hover:bg-[#67b3ff]/40 transition-colors cursor-pointer"
            title="Call Sunita Devi"
          >
            <span className="material-symbols-outlined text-xl">call</span>
          </button>
          <button
            onClick={onOpenAshaCall}
            aria-label="Message ASHA Worker"
            className="w-11 h-11 rounded-full bg-[#67b3ff]/20 text-[#004473] dark:text-[#67b3ff] flex items-center justify-center hover:bg-[#67b3ff]/40 transition-colors cursor-pointer"
            title="Message Sunita Devi"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
          </button>
        </div>
      </section>

      {/* Family Member Selector */}
      <section>
        <h2 className="text-base font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-3">
          Family Profiles
        </h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {members.map((m) => {
            const isSelected = selectedMember === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMember(m.id)}
                className={`flex flex-col items-center gap-1.5 min-w-[72px] transition-all cursor-pointer ${
                  isSelected ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-16 h-16 rounded-full p-0.5 border-4 ${
                  isSelected ? 'border-[#f5a623]' : 'border-transparent'
                }`}>
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className={`text-xs ${isSelected ? 'font-bold text-[#001e2f] dark:text-[#ebf5ff]' : 'text-[#524534] dark:text-[#c9e6ff]'}`}>
                  {m.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sub-Tabs for Selected Member */}
      <section className="flex bg-[#e0f0ff] dark:bg-[#123348] rounded-2xl p-1 gap-1">
        <button
          onClick={() => setActiveSubTab('tracker')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeSubTab === 'tracker'
              ? 'bg-white dark:bg-[#001e2f] text-[#001e2f] dark:text-[#ebf5ff] shadow-xs'
              : 'text-[#524534] dark:text-[#c9e6ff] hover:bg-white/40'
          }`}
        >
          <span className="material-symbols-outlined text-base">vaccines</span>
          <span>{t('tracker')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeSubTab === 'history'
              ? 'bg-white dark:bg-[#001e2f] text-[#001e2f] dark:text-[#ebf5ff] shadow-xs'
              : 'text-[#524534] dark:text-[#c9e6ff] hover:bg-white/40'
          }`}
        >
          <span className="material-symbols-outlined text-base">history</span>
          <span>{t('history')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reports')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeSubTab === 'reports'
              ? 'bg-white dark:bg-[#001e2f] text-[#001e2f] dark:text-[#ebf5ff] shadow-xs'
              : 'text-[#524534] dark:text-[#c9e6ff] hover:bg-white/40'
          }`}
        >
          <span className="material-symbols-outlined text-base">description</span>
          <span>{t('reports')}</span>
        </button>
      </section>

      {/* Tab Content */}
      {activeSubTab === 'tracker' && (
        <div className="space-y-6">
          {/* Next Due Card */}
          <div className="bg-[#f5a623] text-[#644000] rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-15 transform translate-x-4 -translate-y-4 pointer-events-none">
              <span className="material-symbols-outlined text-[130px]">vaccines</span>
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1">
                {t('nextDue')}
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-1">
                {t('polioDrops')}
              </h3>
              <p className="text-sm font-bold mb-4 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{t('dueDate')}</span>
              </p>
              <button
                onClick={() => alert(`Reminder set for Polio Drops (OPV 3) on 15 Oct 2023`)}
                className="py-2.5 px-5 bg-white text-[#835500] rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-xs cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>{t('setReminder')}</span>
              </button>
            </div>
          </div>

          {/* Tracker Vaccination Timeline Checklist */}
          <div className="bg-white dark:bg-[#123348] rounded-2xl border border-[#857462]/20 p-5 shadow-xs">
            <h3 className="text-base font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-4">
              {t('vaccinationSchedule')}
            </h3>

            <div className="flex flex-col gap-1 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#c9e6ff] dark:bg-gray-700 z-0"></div>

              {vaccineSchedule.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-3 relative z-10 text-left">
                  {item.status === 'done' && (
                    <div className="w-12 h-12 rounded-full bg-[#0062a2] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">check</span>
                    </div>
                  )}

                  {item.status === 'due' && (
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#001e2f] border-4 border-[#835500] text-[#835500] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <div className="w-4 h-4 rounded-full bg-[#835500]"></div>
                    </div>
                  )}

                  {item.status === 'future' && (
                    <div className="w-12 h-12 rounded-full bg-[#c9e6ff] text-[#524534] flex items-center justify-center shrink-0 mt-0.5 border-2 border-[#d5ebff]">
                      <span className="material-symbols-outlined text-xl">lock</span>
                    </div>
                  )}

                  <div className="flex-1">
                    <h4 className={`text-sm md:text-base font-bold ${
                      item.status === 'done' 
                        ? 'line-through opacity-70 text-[#001e2f] dark:text-[#ebf5ff]' 
                        : item.status === 'due'
                        ? 'text-[#001e2f] dark:text-[#ebf5ff]'
                        : 'text-[#524534] dark:text-[#c9e6ff]'
                    }`}>
                      {item.name}
                    </h4>
                    <p className={`text-xs ${item.status === 'due' ? 'text-[#835500] dark:text-[#ffb955] font-bold' : 'text-[#524534] dark:text-[#c9e6ff]'}`}>
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'history' && (
        <div className="bg-white dark:bg-[#123348] rounded-2xl p-6 border border-[#857462]/15 text-center text-xs text-[#524534] dark:text-[#c9e6ff]">
          <p className="font-bold mb-2">Past Vaccination & Medical History for {members.find(m=>m.id===selectedMember)?.name}</p>
          <ul className="text-left space-y-2 mt-4">
            <li className="p-3 rounded-xl bg-[#f6faff] dark:bg-[#001e2f] border border-[#857462]/10">
              ✓ BCG Vaccine administered on 12 Jan 2023 at Rampur PHC.
            </li>
            <li className="p-3 rounded-xl bg-[#f6faff] dark:bg-[#001e2f] border border-[#857462]/10">
              ✓ OPV 1 & Pentavalent 1 given on 24 Feb 2023.
            </li>
          </ul>
        </div>
      )}

      {activeSubTab === 'reports' && (
        <div className="bg-white dark:bg-[#123348] rounded-2xl p-6 border border-[#857462]/15 text-center text-xs text-[#524534] dark:text-[#c9e6ff]">
          <p className="font-bold mb-2">Prescriptions & Lab Reports for {members.find(m=>m.id===selectedMember)?.name}</p>
          <p className="text-gray-400">All PDF reports are synced with ABHA Digital ID locker.</p>
        </div>
      )}
    </div>
  );
}
