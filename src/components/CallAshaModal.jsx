import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Video, Mic, MicOff, Camera, PhoneOff, Send, Paperclip, CheckCircle2, ShieldAlert, UserCheck } from 'lucide-react';

export default function CallAshaModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [callActive, setCallActive] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'asha', text: 'Namaste! I am Sunita Devi, your village ASHA worker. How can I help your family today?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  useEffect(() => {
    let interval = null;
    if (callActive) {
      interval = setInterval(() => {
        setCallSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  if (!isOpen) return null;

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = (videoMode = false) => {
    setIsVideo(videoMode);
    setCallActive(true);
  };

  const handleEndCall = () => {
    setCallActive(false);
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: inputMsg },
      { sender: 'asha', text: 'Thank you. I have received your update and will coordinate with Rampur PHC doctor.' }
    ]);
    setInputMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#001e2f] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#857462]/20 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#f6faff] dark:bg-[#123348] border-b border-[#857462]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-[#f5a623] flex items-center justify-center font-bold text-[#644000] border-2 border-white shadow-xs">
                SD
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#001e2f] dark:text-[#ebf5ff] flex items-center gap-1.5">
                <span>{t('ashaWorkerName')}</span>
                <UserCheck className="w-4 h-4 text-[#0062a2]" />
              </h3>
              <p className="text-xs text-[#524534] dark:text-[#c9e6ff]">
                {t('ashaDistrict')} • Certified Community Worker
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#001e2f] text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-300 transition-all flex items-center justify-center cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
          {/* Active Call Video Screen Simulation */}
          {callActive ? (
            <div className="relative w-full h-64 md:h-80 bg-slate-900 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-white shadow-inner">
              {isVideo ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center text-xs font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full w-max">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-2"></span>
                    <span>LIVE VIDEO TELECONSULT • {formatTime(callSeconds)}</span>
                  </div>

                  {/* Simulated ASHA Avatar Frame */}
                  <div className="text-center my-auto">
                    <div className="w-24 h-24 rounded-full bg-amber-500/20 border-4 border-amber-400 mx-auto flex items-center justify-center mb-2 animate-pulse">
                      <span className="material-symbols-outlined text-6xl text-amber-300">female</span>
                    </div>
                    <h4 className="text-lg font-bold">Sunita Devi (ASHA)</h4>
                    <p className="text-xs text-amber-200">Connected to Rampur Village Tele-Health</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-[#0062a2] text-white mx-auto flex items-center justify-center mb-3 animate-pulse">
                    <Phone className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold mb-1">Audio Call Connected</h4>
                  <p className="text-sm font-semibold text-emerald-400">{formatTime(callSeconds)}</p>
                </div>
              )}

              {/* Call Controls Bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-all cursor-pointer ${
                    isMuted ? 'bg-amber-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsVideo(!isVideo)}
                  className={`p-3 rounded-full transition-all cursor-pointer ${
                    isVideo ? 'bg-blue-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Camera className="w-5 h-5" />
                </button>
                <button
                  onClick={handleEndCall}
                  className="p-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer"
                  title="End Call"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            /* Call Initiation Buttons */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleStartCall(false)}
                className="p-5 rounded-3xl bg-gradient-to-br from-[#0062a2] to-[#004473] text-white flex items-center gap-4 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-base font-bold">Start Audio Call</h4>
                  <p className="text-xs text-white/80">Direct toll-free connection</p>
                </div>
              </button>

              <button
                onClick={() => handleStartCall(true)}
                className="p-5 rounded-3xl bg-gradient-to-br from-[#f5a623] to-[#e0951a] text-[#644000] flex items-center gap-4 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#644000]/10 flex items-center justify-center shrink-0">
                  <Video className="w-6 h-6 text-[#644000]" />
                </div>
                <div className="text-left">
                  <h4 className="text-base font-bold">Start Video Consult</h4>
                  <p className="text-xs text-[#644000]/80">Visual symptom inspection</p>
                </div>
              </button>
            </div>
          )}

          {/* Quick Chat Messenger with ASHA */}
          <div className="bg-[#f6faff] dark:bg-[#123348] rounded-3xl p-4 border border-[#857462]/10 flex flex-col h-60">
            <div className="text-xs font-bold text-[#524534] dark:text-[#c9e6ff] uppercase tracking-wider mb-2">
              Direct Health Message & Photo Upload
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${
                      msg.sender === 'user'
                        ? 'bg-[#0062a2] text-white rounded-br-none'
                        : 'bg-white dark:bg-[#001e2f] text-[#001e2f] dark:text-[#ebf5ff] rounded-bl-none border border-[#857462]/10 shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="mt-3 flex items-center gap-2">
              <button
                className="p-2 rounded-xl bg-white dark:bg-[#001e2f] text-gray-500 hover:text-[#0062a2] border border-gray-200 dark:border-gray-700 cursor-pointer"
                title="Attach Prescription or Symptom Photo"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Type a message or symptom update..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#001e2f] border border-[#857462]/20 text-xs text-[#001e2f] dark:text-[#ebf5ff] focus:outline-none focus:border-[#0062a2]"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-xl bg-[#0062a2] text-white hover:bg-[#004473] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
