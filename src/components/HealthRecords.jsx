import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Download, Share2, Upload, Plus, CheckCircle2, Calendar, FileCheck, Eye, Lock, ShieldCheck } from 'lucide-react';

export default function HealthRecords() {
  const { t } = useLanguage();
  const [records, setRecords] = useState([
    {
      id: 1,
      title: "Complete Blood Count (CBC) & Dengue NS1",
      date: "04 Sep 2026",
      facility: "Sanjeevani Pathology Lab, Rampur",
      doctor: "Dr. Ramesh Verma",
      type: "Lab Report",
      status: "Normal Range",
      fileSize: "1.4 MB",
      member: "Sunita Sharma"
    },
    {
      id: 2,
      title: "OPD Digital Prescription - Fever & Cough",
      date: "28 Aug 2026",
      facility: "Rampur Primary Health Center",
      doctor: "Dr. Ananya Sharma",
      type: "Prescription",
      status: "Medication Active",
      fileSize: "850 KB",
      member: "Sunita Sharma"
    },
    {
      id: 3,
      title: "Pediatric Polio & Vaccine Certificate",
      date: "15 Jun 2026",
      facility: "Rampur PHC Vaccination Camp",
      doctor: "Sunita Devi (ASHA)",
      type: "Vaccination Record",
      status: "Verified",
      fileSize: "1.1 MB",
      member: "Aarav Sharma"
    },
    {
      id: 4,
      title: "Maternal Ultrasound Sonography Report",
      date: "12 May 2026",
      facility: "Shanti Maternity Hospital",
      doctor: "Dr. Sunita Kulkarni",
      type: "Radiology Report",
      status: "Healthy",
      fileSize: "3.2 MB",
      member: "Sunita Sharma"
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRecords = records.filter(r => {
    if (activeFilter === 'lab') return r.type.includes('Lab');
    if (activeFilter === 'prescription') return r.type.includes('Prescription');
    if (activeFilter === 'vaccine') return r.type.includes('Vaccination');
    return true;
  });

  const handleUploadNew = () => {
    const title = prompt("Enter title of medical report / prescription:");
    if (!title) return;
    const newRec = {
      id: Date.now(),
      title,
      date: "Today",
      facility: "Uploaded via Medigram Camera",
      doctor: "Self Record",
      type: "User Upload",
      status: "Encrypted & Saved",
      fileSize: "2.1 MB",
      member: "Sunita Sharma"
    };
    setRecords([newRec, ...records]);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 w-full">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0062a2] text-white flex items-center justify-center shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#001e2f] dark:text-[#ebf5ff]">
              Digital Health Records & Prescription Locker
            </h2>
            <p className="text-xs md:text-sm text-[#524534] dark:text-[#c9e6ff]">
              ABHA synchronized lab reports, doctor prescriptions & vaccine certificates
            </p>
          </div>
        </div>

        <button
          onClick={handleUploadNew}
          className="py-2.5 px-4 rounded-2xl bg-[#f5a623] hover:bg-[#e0951a] text-[#644000] font-bold text-xs md:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Prescription / Report</span>
        </button>
      </div>

      {/* ABHA Sync Status Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#123348] border border-[#857462]/15 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-[#001e2f] dark:text-[#ebf5ff] flex items-center gap-1.5">
              <span>ABHA ID Locker Active: 91-4829-1029-4821</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Synced</span>
            </h4>
            <p className="text-[11px] text-[#524534] dark:text-[#c9e6ff]">
              End-to-End Encrypted according to Ayushman Bharat Digital Mission (ABDM) standards.
            </p>
          </div>
        </div>

        <div className="text-xs font-bold text-[#0062a2] dark:text-[#67b3ff] flex items-center gap-1 shrink-0">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit Vault Lock</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {[
          { id: 'all', label: 'All Documents' },
          { id: 'prescription', label: 'Prescriptions' },
          { id: 'lab', label: 'Lab Reports' },
          { id: 'vaccine', label: 'Vaccination Certificates' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-[#0062a2] text-white shadow-sm'
                : 'bg-white dark:bg-[#123348] text-[#524534] dark:text-[#c9e6ff] border border-[#857462]/15 hover:border-[#0062a2]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Records Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecords.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#123348] border border-[#857462]/15 shadow-xs flex flex-col justify-between hover:border-[#0062a2]/40 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#d5ebff] text-[#004473] dark:bg-[#004473] dark:text-[#9dcaff] mb-1 inline-block">
                    {doc.type}
                  </span>
                  <h3 className="text-sm font-bold text-[#001e2f] dark:text-[#ebf5ff] leading-snug">
                    {doc.title}
                  </h3>
                </div>

                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-xl shrink-0">
                  {doc.status}
                </span>
              </div>

              <div className="my-3 space-y-1 text-xs text-[#524534] dark:text-[#c9e6ff]">
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0062a2]" />
                  <span>Date: {doc.date}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Facility: {doc.facility} ({doc.doctor})</span>
                </p>
                <p className="text-[11px] text-gray-400">
                  Patient: {doc.member} • File Size: {doc.fileSize}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-[#857462]/10">
              <button
                onClick={() => alert(`Opening preview of ${doc.title}`)}
                className="flex-1 py-2 rounded-xl bg-[#ebf5ff] dark:bg-[#001e2f] text-[#0062a2] dark:text-[#9dcaff] hover:bg-[#d5ebff] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Report</span>
              </button>

              <button
                onClick={() => alert(`Downloading ${doc.title} PDF`)}
                className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-[#001e2f] text-gray-700 dark:text-gray-300 hover:bg-gray-200 text-xs font-bold cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => alert(`Share link for ${doc.title} sent to Doctor via WhatsApp`)}
                className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-[#001e2f] text-emerald-600 dark:text-emerald-400 hover:bg-gray-200 text-xs font-bold cursor-pointer"
                title="Share with Doctor"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
