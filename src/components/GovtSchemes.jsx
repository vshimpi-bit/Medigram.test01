import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Award, FileText, Search, CheckCircle2, ArrowRight, ExternalLink, HelpCircle, HeartHandshake } from 'lucide-react';

export default function GovtSchemes() {
  const { t } = useLanguage();
  const [rationCardInput, setRationCardInput] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const schemes = [
    {
      id: 'pmjay',
      title: 'Ayushman Bharat (PM-JAY)',
      benefit: '₹5,00,000 Free Health Cover',
      tag: '5 Lakh Coverage / Year',
      color: 'from-amber-500 to-amber-600',
      description: 'Cashless hospital treatment for 1,900+ surgical & medical procedures in empanelled public & private hospitals.',
      eligibility: 'SECC 2011 Families, Ration Card Holder, BPL / Antyodaya Families',
      documents: 'Aadhaar Card, Ration Card, Mobile Number'
    },
    {
      id: 'pmmvy',
      title: 'Pradhan Mantri Matru Vandana Yojana',
      benefit: '₹5,000 Cash Support for Pregnant Mothers',
      tag: 'Maternity Support',
      color: 'from-pink-500 to-rose-600',
      description: 'Direct Benefit Transfer (DBT) into bank account for pregnant & lactating mothers for first child.',
      eligibility: 'Pregnant women registered at Anganwadi / PHC',
      documents: 'MCP Card, Bank Passbook, Aadhaar Card'
    },
    {
      id: 'janaushadhi',
      title: 'Pradhan Mantri Jan Aushadhi Pariyojana',
      benefit: 'Generic Medicines at 50% - 90% Discount',
      tag: 'Low-Cost Medicines',
      color: 'from-emerald-500 to-teal-600',
      description: 'High quality generic medicines & medical consumables available at dedicated Kendra outlets.',
      eligibility: 'Open to all citizens without restriction',
      documents: 'Doctor Prescription (optional for OTC)'
    },
    {
      id: 'immunization',
      title: 'Universal Immunization Programme (UIP)',
      benefit: '100% Free Vaccination for Newborns',
      tag: 'Free Vaccines',
      color: 'from-blue-500 to-indigo-600',
      description: 'Protects children against 12 life-threatening diseases including Polio, Hepatitis B, Tetanus, and Measles.',
      eligibility: 'All infants and pregnant women in India',
      documents: 'Mother and Child Protection (MCP) Card'
    }
  ];

  const handleCheckEligibility = (e) => {
    e.preventDefault();
    if (!rationCardInput.trim()) return;
    setCheckResult({
      status: 'eligible',
      scheme: 'Ayushman Bharat (PM-JAY)',
      cardNo: rationCardInput,
      familyCover: '₹5,00,000 / Year',
      empanelledHospital: 'Rampur PHC & Sanjeevani District Hospital'
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 w-full">
      {/* Title Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#835500] text-white flex items-center justify-center shadow-md">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#001e2f] dark:text-[#ebf5ff]">
            Government Health Schemes & PM-JAY Coverage
          </h2>
          <p className="text-xs md:text-sm text-[#524534] dark:text-[#c9e6ff]">
            Check cash-free medical coverage eligibility, maternity support & generic medicine schemes
          </p>
        </div>
      </div>

      {/* PM-JAY Eligibility Search Card */}
      <div className="bg-gradient-to-br from-[#ebf5ff] to-[#e0f0ff] dark:from-[#123348] dark:to-[#001e2f] rounded-3xl p-6 border border-[#0062a2]/20 shadow-md mb-8">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-6 h-6 text-[#0062a2] dark:text-[#67b3ff]" />
          <h3 className="text-base md:text-lg font-bold text-[#001e2f] dark:text-[#ebf5ff]">
            Check Ayushman Bharat PM-JAY Card Eligibility
          </h3>
        </div>
        <p className="text-xs md:text-sm text-[#524534] dark:text-[#c9e6ff] mb-4">
          Enter Ration Card number, ABHA ID, or Registered Mobile Number to verify ₹5 Lakh free health treatment coverage.
        </p>

        <form onSubmit={handleCheckEligibility} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Ration Card No. / ABHA ID / Mobile..."
              value={rationCardInput}
              onChange={(e) => setRationCardInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-[#001e2f] border border-[#857462]/20 text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff] focus:outline-none focus:border-[#0062a2]"
            />
          </div>
          <button
            type="submit"
            className="py-3 px-6 rounded-2xl bg-[#0062a2] hover:bg-[#004473] text-white font-bold text-xs md:text-sm shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Check Status Now
          </button>
        </form>

        {checkResult && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 animate-fade-in flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                ELIGIBLE FOR AYUSHMAN CARD!
              </span>
              <p className="text-sm font-bold text-[#001e2f] dark:text-[#ebf5ff] mt-0.5">
                Card ID: <span className="font-mono">{checkResult.cardNo}</span> • Covered up to {checkResult.familyCover}
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-1">
                Accepted at: {checkResult.empanelledHospital}. Visit nearest Jan Seva Kendra or ASHA worker to download physical card.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {schemes.map((s) => (
          <div
            key={s.id}
            className="bg-white dark:bg-[#123348] rounded-3xl p-6 border border-[#857462]/15 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-white bg-gradient-to-r ${s.color}`}>
                  {s.tag}
                </span>
                <span className="text-xs font-bold text-[#0062a2] dark:text-[#67b3ff] flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official Scheme</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-1">
                {s.title}
              </h3>
              <p className="text-sm font-extrabold text-[#835500] dark:text-[#ffb955] mb-3">
                {s.benefit}
              </p>
              <p className="text-xs text-[#524534] dark:text-[#c9e6ff] mb-4 leading-relaxed">
                {s.description}
              </p>

              <div className="space-y-2 p-3.5 rounded-2xl bg-[#f6faff] dark:bg-[#001e2f] border border-[#857462]/10 text-xs">
                <div>
                  <span className="font-bold text-[#001e2f] dark:text-[#ebf5ff] block">Who can apply?</span>
                  <span className="text-[#524534] dark:text-[#c9e6ff]">{s.eligibility}</span>
                </div>
                <div>
                  <span className="font-bold text-[#001e2f] dark:text-[#ebf5ff] block">Required Documents:</span>
                  <span className="text-[#524534] dark:text-[#c9e6ff]">{s.documents}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Redirecting to official portal for ${s.title}`)}
              className="mt-5 w-full py-2.5 rounded-xl border border-[#0062a2] text-[#0062a2] dark:text-[#67b3ff] hover:bg-[#ebf5ff] dark:hover:bg-[#001e2f] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Apply / View Empanelled Centers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
