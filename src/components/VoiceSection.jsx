import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, Volume2, Play, Pause, Sparkles, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function VoiceSection({ setActiveTab, onOpenAshaCall }) {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const sampleVoiceQueries = [
    { text: "I have high fever and shivering since morning", type: "fever" },
    { text: "My mother has severe stomach pain after lunch", type: "stomach" },
    { text: "Where is the nearest primary health center?", type: "clinic" },
    { text: "What remedies can help prevent heatstroke?", type: "remedy" },
  ];

  const handleStartListening = () => {
    if (isListening) return;
    setIsListening(true);
    setAiResponse(null);
    setTranscript('');

    // Simulate 2.5s speech recognition
    setTimeout(() => {
      const randomQuery = sampleVoiceQueries[Math.floor(Math.random() * sampleVoiceQueries.length)];
      setTranscript(randomQuery.text);
      setIsListening(false);
      
      // Generate AI voice answer simulation
      setTimeout(() => {
        if (randomQuery.type === 'fever') {
          setAiResponse({
            summary: "High fever with chills detected. Rest in a cool area, drink ORS water, and take Paracetamol if prescribed.",
            severity: "Moderate Risk",
            actionText: "Check Symptoms or Consult ASHA worker",
            actionType: "symptoms",
            advice: [
              "Drink plenty of boiled or filtered water",
              "Apply cool sponge cloth on forehead",
              "Contact ASHA Sunita Devi if fever exceeds 102°F"
            ]
          });
        } else if (randomQuery.type === 'stomach') {
          setAiResponse({
            summary: "Severe abdominal pain reported. Avoid heavy food and stay hydrated with light electrolyte liquids.",
            severity: "Requires Attention",
            actionText: "Find Nearest Primary Health Center",
            actionType: "clinics",
            advice: [
              "Do not take unprescribed strong painkillers",
              "Sip warm water or buttermilk with a pinch of salt",
              "Visit Rampur PHC Clinic if pain persists for > 4 hours"
            ]
          });
        } else {
          setAiResponse({
            summary: "Rampur Primary Health Center is 2.4 km away with 24x7 doctor on duty.",
            severity: "Information Ready",
            actionText: "Open Clinic Map & Book",
            actionType: "clinics",
            advice: [
              "Distance: 2.4 km (8 mins via auto/bike)",
              "Emergency Duty Doctor: Dr. Ramesh Verma",
              "Available Beds: 6 Beds Open"
            ]
          });
        }
      }, 600);
    }, 2400);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 max-w-2xl mx-auto w-full">
      {/* Header Prompt */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-2 tracking-tight">
          {t('howAreYouFeeling')}
        </h2>
        <p className="text-sm md:text-base text-[#524534] dark:text-[#c9e6ff]">
          {isListening ? t('listening') : t('tapToTell')}
        </p>
      </div>

      {/* Main Mic Pulse Button */}
      <button
        onClick={handleStartListening}
        disabled={isListening}
        className={`relative group w-36 h-36 md:w-44 md:h-44 rounded-[48px] flex flex-col items-center justify-center shadow-xl transition-all active:scale-95 cursor-pointer ${
          isListening
            ? 'bg-amber-500 text-white pulse-ring-anim ring-4 ring-amber-300 dark:ring-amber-600'
            : 'bg-[#f5a623] hover:bg-[#e0951a] text-[#644000] shadow-amber-500/20 hover:shadow-amber-500/30'
        }`}
      >
        {isListening ? (
          <div className="flex items-center gap-1.5 h-10 mb-2">
            <span className="w-2 bg-white rounded-full animate-wave-1"></span>
            <span className="w-2 bg-white rounded-full animate-wave-2"></span>
            <span className="w-2 bg-white rounded-full animate-wave-3"></span>
            <span className="w-2 bg-white rounded-full animate-wave-4"></span>
            <span className="w-2 bg-white rounded-full animate-wave-5"></span>
          </div>
        ) : (
          <span className="material-symbols-outlined text-[68px] md:text-[80px] icon-fill text-[#644000] group-hover:scale-110 transition-transform">
            mic
          </span>
        )}
        <span className="text-xs font-bold uppercase tracking-wider text-[#644000] mt-1">
          {isListening ? 'Listening...' : 'Tap & Speak'}
        </span>
      </button>

      {/* Preset Voice Query Chips */}
      <div className="mt-8 w-full">
        <p className="text-xs font-semibold text-[#524534] dark:text-[#c9e6ff] text-center mb-3">
          Or tap a common question:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {sampleVoiceQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTranscript(q.text);
                setIsListening(true);
                setTimeout(() => {
                  setIsListening(false);
                  setAiResponse({
                    summary: `Voice inquiry "${q.text}" analyzed. AI guidance ready below.`,
                    severity: "AI Processed",
                    actionText: "Proceed to Symptoms",
                    actionType: "symptoms",
                    advice: [
                      "Drink 2-3 liters of clean water daily",
                      "Monitor body temperature using digital thermometer",
                      "Reach out to ASHA worker if symptoms worsen"
                    ]
                  });
                }, 1200);
              }}
              className="text-xs px-3.5 py-2 rounded-full bg-white dark:bg-[#123348] text-[#0062a2] dark:text-[#9dcaff] border border-[#857462]/20 hover:border-[#0062a2] shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>"{q.text}"</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Transcript Display */}
      {transcript && (
        <div className="mt-6 w-full p-4 rounded-2xl bg-white dark:bg-[#123348] border border-[#857462]/15 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-[#835500] dark:text-[#ffb955] mb-1">
            <span className="material-symbols-outlined text-sm">record_voice_over</span>
            <span>You Said:</span>
          </div>
          <p className="text-sm font-semibold text-[#001e2f] dark:text-[#ebf5ff] italic">
            "{transcript}"
          </p>
        </div>
      )}

      {/* AI Voice Answer Card with Audio Player */}
      {aiResponse && (
        <div className="mt-6 w-full p-5 rounded-3xl bg-gradient-to-br from-[#ebf5ff] to-[#e0f0ff] dark:from-[#123348] dark:to-[#001e2f] border border-[#0062a2]/20 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0062a2] text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#001e2f] dark:text-[#ebf5ff]">
                  Medigram AI Voice Response
                </h4>
                <span className="text-[11px] font-semibold text-[#0062a2] dark:text-[#67b3ff]">
                  {aiResponse.severity}
                </span>
              </div>
            </div>

            {/* Audio Playback button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0062a2] hover:bg-[#004473] text-white text-xs font-bold transition-all cursor-pointer"
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingAudio ? "Playing Voice..." : "Listen Audio"}</span>
            </button>
          </div>

          <p className="text-sm font-medium text-[#001e2f] dark:text-[#ebf5ff] mb-3 leading-relaxed">
            {aiResponse.summary}
          </p>

          {/* Key Advice Checklist */}
          <div className="bg-white/70 dark:bg-[#001e2f]/60 rounded-2xl p-3.5 mb-4 border border-[#857462]/10">
            <p className="text-xs font-bold text-[#524534] dark:text-[#c9e6ff] mb-2">
              Recommended Steps:
            </p>
            <ul className="space-y-1.5">
              {aiResponse.advice.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#001e2f] dark:text-[#ebf5ff]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab(aiResponse.actionType)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#0062a2] hover:bg-[#00497b] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{aiResponse.actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAshaCall}
              className="py-2.5 px-4 rounded-xl bg-[#f5a623] hover:bg-[#e0951a] text-[#644000] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">phone_in_talk</span>
              <span>{t('callAsha')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
