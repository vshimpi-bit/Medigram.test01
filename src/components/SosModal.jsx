import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, PhoneCall, MapPin, X, ShieldAlert, CheckCircle2, Volume2, Navigation } from 'lucide-react';

export default function SosModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState(3);
  const [sosSent, setSosSent] = useState(false);
  const [sirenActive, setSirenActive] = useState(true);

  useEffect(() => {
    let timer = null;
    if (isOpen && !sosSent) {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setSosSent(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, sosSent]);

  if (!isOpen) return null;

  const handleCancel = () => {
    setSosSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#001e2f] max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-red-600 animate-scale-up">
        {/* Urgent Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between sos-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/20 animate-ping">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide">
                EMERGENCY SOS ALERT
              </h3>
              <p className="text-xs text-red-100 font-semibold">
                Instant Health Dispatch Protocol
              </p>
            </div>
          </div>

          <button
            onClick={handleCancel}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {!sosSent ? (
            <div>
              <div className="my-4">
                <div className="w-24 h-24 rounded-full bg-red-100 text-red-600 font-extrabold text-4xl mx-auto flex items-center justify-center border-4 border-red-500 animate-bounce shadow-lg">
                  {countdown}
                </div>
                <p className="text-sm font-bold text-[#001e2f] dark:text-[#ebf5ff] mt-3">
                  Broadcasting GPS position & SOS alarm to 108 Ambulance in {countdown} seconds...
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-100 dark:bg-[#123348] text-xs font-semibold text-[#524534] dark:text-[#c9e6ff] mb-6 flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span>GPS Location: Rampur Village Block 4 (Lat: 26.8467° N, Long: 80.9462° E)</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3.5 rounded-2xl bg-gray-200 dark:bg-[#123348] text-[#001e2f] dark:text-[#ebf5ff] hover:bg-gray-300 font-bold text-sm transition-all cursor-pointer"
                >
                  {t('cancel')} (False Alarm)
                </button>
                <button
                  onClick={() => setSosSent(true)}
                  className="flex-1 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  Send NOW
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-1">
                SOS Dispatch Activated!
              </h4>
              <p className="text-xs text-[#524534] dark:text-[#c9e6ff] mb-4">
                Emergency signal dispatched to 108 Central Control Room and 3 registered family contacts.
              </p>

              {/* Direct Dial Buttons */}
              <div className="space-y-2.5 mb-6">
                <a
                  href="tel:108"
                  className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all block"
                >
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                  <span>Direct Call 108 Ambulance</span>
                </a>

                <a
                  href="tel:112"
                  className="w-full py-3 px-4 rounded-2xl bg-[#0062a2] hover:bg-[#004473] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all block"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Call Emergency Helpline 112</span>
                </a>
              </div>

              <button
                onClick={handleCancel}
                className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-[#123348] text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer"
              >
                Close SOS Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
