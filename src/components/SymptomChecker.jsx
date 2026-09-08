import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Stethoscope, AlertCircle, ShieldAlert, CheckCircle, ArrowRight, Activity, Thermometer, HeartPulse, RefreshCw } from 'lucide-react';

export default function SymptomChecker({ setActiveTab, onOpenAshaCall }) {
  const { t } = useLanguage();
  const [selectedBodyPart, setSelectedBodyPart] = useState('head');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState('1-2 days');
  const [triageResult, setTriageResult] = useState(null);

  const categories = [
    { id: 'head', title: 'Head & Eyes', icon: 'psychology', color: 'bg-amber-500/10 text-amber-600' },
    { id: 'chest', title: 'Chest & Breathing', icon: 'lungs', color: 'bg-blue-500/10 text-blue-600' },
    { id: 'stomach', title: 'Stomach & Gut', icon: 'digestive_system', color: 'bg-emerald-500/10 text-emerald-600' },
    { id: 'joints', title: 'Joints & Bones', icon: 'skeleton', color: 'bg-purple-500/10 text-purple-600' },
    { id: 'skin', title: 'Skin & Rash', icon: 'dermatology', color: 'bg-rose-500/10 text-rose-600' },
    { id: 'fever', title: 'Fever & General', icon: 'thermometer', color: 'bg-orange-500/10 text-orange-600' },
  ];

  const symptomsByCategory = {
    head: [
      "Severe Headache", "Dizziness / Vertigo", "Blurred Vision", "High Sensitivity to Light", "Nausea or Vomiting"
    ],
    chest: [
      "Shortness of Breath", "Chest Tightness", "Persistent Dry Cough", "Wheezing Sound", "Heart Palpitations"
    ],
    stomach: [
      "Sharp Abdominal Pain", "Diarrhea", "Vomiting", "Loss of Appetite", "Bloating & Acid Reflux"
    ],
    joints: [
      "Swollen Joints", "Lower Back Stiff Pain", "Knee Pain while Walking", "Muscle Soreness"
    ],
    skin: [
      "Red Itchy Rash", "Skin Swelling", "Blisters or Sores", "Allergic Hives"
    ],
    fever: [
      "High Body Temperature (>101°F)", "Body Shivering / Chills", "Extreme Fatigue", "Sweating & Dehydration"
    ]
  };

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleEvaluate = () => {
    let risk = 'low';
    if (severity >= 8 || selectedSymptoms.includes("Shortness of Breath") || selectedSymptoms.includes("Chest Tightness")) {
      risk = 'high';
    } else if (severity >= 5 || selectedSymptoms.length >= 3) {
      risk = 'moderate';
    }

    setTriageResult({
      risk,
      score: severity,
      symptomsCount: selectedSymptoms.length,
      recommendation: risk === 'high' 
        ? "URGENT MEDICAL ATTENTION: Seek immediate emergency care at nearest hospital or dial 108 Ambulance."
        : risk === 'moderate'
        ? "MODERATE RISK: Visit nearest Primary Health Center (PHC) today for doctor consultation."
        : "LOW RISK: Manage with rest, hydration, and home care. Monitor for next 24 hours.",
      nextSteps: risk === 'high'
        ? ["Dial 108 for Emergency Ambulance", "Do not drive yourself", "Keep patient lying flat with feet elevated"]
        : risk === 'moderate'
        ? ["Visit Rampur Primary Health Center", "Consult ASHA Sunita Devi for digital tele-triage", "Take ORS water"]
        : ["Drink 3L boiled water", "Rest adequately", "Take Paracetamol if body pain persists"]
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 w-full">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center shadow-md">
          <Stethoscope className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#001e2f] dark:text-[#ebf5ff]">
            Interactive AI Symptom Triage
          </h2>
          <p className="text-xs md:text-sm text-[#524534] dark:text-[#c9e6ff]">
            Select symptoms to calculate medical urgency score
          </p>
        </div>
      </div>

      {/* Step 1: Category Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-3">
          1. Select Body Area / System:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedBodyPart(cat.id);
                setSelectedSymptoms([]);
                setTriageResult(null);
              }}
              className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                selectedBodyPart === cat.id
                  ? 'border-[#0062a2] bg-[#ebf5ff] dark:bg-[#123348] ring-2 ring-[#0062a2]/20 font-bold shadow-sm'
                  : 'border-[#857462]/15 bg-white dark:bg-[#001e2f]/80 hover:bg-[#f6faff]'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cat.color}`}>
                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
              </div>
              <span className="text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff]">
                {cat.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Symptom Checklist */}
      <div className="mb-6 bg-white dark:bg-[#123348] p-5 rounded-3xl border border-[#857462]/15 shadow-xs">
        <h3 className="text-sm font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-3">
          2. Check all symptoms that apply ({symptomsByCategory[selectedBodyPart]?.length}):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
          {symptomsByCategory[selectedBodyPart]?.map((sym, idx) => {
            const isChecked = selectedSymptoms.includes(sym);
            return (
              <label
                key={idx}
                onClick={() => toggleSymptom(sym)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? 'border-[#0062a2] bg-[#e0f0ff] dark:bg-[#004473] text-[#004473] dark:text-[#c9e6ff] font-bold'
                    : 'border-[#857462]/15 bg-[#f6faff] dark:bg-[#001e2f] text-[#524534] dark:text-[#ebf5ff]'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                  isChecked ? 'bg-[#0062a2] border-[#0062a2] text-white' : 'border-gray-400'
                }`}>
                  {isChecked && <CheckCircle className="w-4 h-4" />}
                </div>
                <span className="text-xs md:text-sm">{sym}</span>
              </label>
            );
          })}
        </div>

        {/* Severity Slider & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#857462]/10">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[#001e2f] dark:text-[#ebf5ff]">Pain / Discomfort Severity:</span>
              <span className="text-[#0062a2] dark:text-[#67b3ff]">{severity} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full h-2 bg-[#d5ebff] dark:bg-[#001e2f] rounded-lg appearance-none cursor-pointer accent-[#0062a2]"
            />
            <div className="flex justify-between text-[10px] text-[#524534] dark:text-[#c9e6ff] mt-1">
              <span>Mild (1-3)</span>
              <span>Moderate (4-7)</span>
              <span>Severe (8-10)</span>
            </div>
          </div>

          <div>
            <span className="block text-xs font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-1">
              Duration of symptoms:
            </span>
            <div className="flex gap-2">
              {['Today', '2-3 Days', 'Over a week'].map((dur) => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    duration === dur
                      ? 'bg-[#0062a2] text-white border-[#0062a2]'
                      : 'bg-[#f6faff] dark:bg-[#001e2f] border-[#857462]/15 text-[#524534] dark:text-[#c9e6ff]'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Assessment Button */}
        <button
          onClick={handleEvaluate}
          disabled={selectedSymptoms.length === 0}
          className="mt-6 w-full py-3.5 rounded-2xl bg-[#f5a623] hover:bg-[#e0951a] disabled:opacity-50 text-[#644000] font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Activity className="w-5 h-5" />
          <span>Assess Medical Urgency ({selectedSymptoms.length} Selected)</span>
        </button>
      </div>

      {/* Triage Output Card */}
      {triageResult && (
        <div className={`p-6 rounded-3xl border shadow-lg animate-fade-in ${
          triageResult.risk === 'high'
            ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800'
            : triageResult.risk === 'moderate'
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
            : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
        }`}>
          <div className="flex items-start gap-4 mb-4">
            {triageResult.risk === 'high' ? (
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                <ShieldAlert className="w-7 h-7" />
              </div>
            ) : triageResult.risk === 'moderate' ? (
              <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                <AlertCircle className="w-7 h-7" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7" />
              </div>
            )}
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                triageResult.risk === 'high'
                  ? 'bg-red-200 text-red-800'
                  : triageResult.risk === 'moderate'
                  ? 'bg-amber-200 text-amber-800'
                  : 'bg-emerald-200 text-emerald-800'
              }`}>
                {triageResult.risk === 'high' ? t('riskHigh') : triageResult.risk === 'moderate' ? t('riskModerate') : t('riskLow')}
              </span>
              <p className="text-base font-bold text-[#001e2f] dark:text-[#ebf5ff] mt-1.5">
                {triageResult.recommendation}
              </p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-[#001e2f]/80 rounded-2xl p-4 mb-5 border border-black/5">
            <h4 className="text-xs font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-2 uppercase tracking-wider">
              Immediate Action Plan:
            </h4>
            <ul className="space-y-2">
              {triageResult.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[#001e2f] dark:text-[#ebf5ff]">
                  <ArrowRight className="w-4 h-4 text-[#0062a2] shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('clinics')}
              className="flex-1 py-3 px-4 rounded-xl bg-[#0062a2] hover:bg-[#004473] text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{t('findClinic')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAshaCall}
              className="py-3 px-4 rounded-xl bg-[#f5a623] hover:bg-[#e0951a] text-[#644000] font-bold text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-base">phone</span>
              <span>{t('callAsha')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
