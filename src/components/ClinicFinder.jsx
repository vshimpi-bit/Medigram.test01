import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Clock, Bed, Navigation, Search, Filter, Calendar, CheckCircle2, ShieldCheck, Star, Mic } from 'lucide-react';

export default function ClinicFinder() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedClinic, setSelectedClinic] = useState({
    id: 4,
    name: "Village Care Pharmacy",
    type: "pharmacy",
    distance: "1.2 km",
    address: "Panchayat Square, Rampur Village",
    doctor: "Pharmacist Rajesh Patel",
    phone: "+91 98765 99001",
    hours: "Open Now • 1.2 km away",
    beds: "Generic Medicines (-80% Discount)",
    rating: 4.9,
    is24x7: false,
    freeCare: true,
    govtApproved: true,
    coords: { top: '60%', left: '40%' }
  });
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const clinics = [
    {
      id: 1,
      name: "City Clinic & PHC",
      type: "clinic",
      distance: "2.4 km",
      address: "Main Gram Panchayat Road, Rampur",
      doctor: "Dr. Ramesh Verma (MBBS)",
      phone: "+91 98765 43210",
      hours: "24x7 Emergency Open",
      beds: "8 Open Beds",
      rating: 4.8,
      is24x7: true,
      freeCare: true,
      govtApproved: true,
      coords: { top: '30%', left: '20%' }
    },
    {
      id: 2,
      name: "ASHA Worker Center (Sunita Devi)",
      type: "asha",
      distance: "0.5 km",
      address: "Block B, Rampur Village",
      doctor: "Sunita Devi (Certified ASHA)",
      phone: "+91 98765 11223",
      hours: "08:00 AM - 08:00 PM",
      beds: "First Aid & Maternity Care",
      rating: 4.9,
      is24x7: false,
      freeCare: true,
      govtApproved: true,
      coords: { top: '45%', left: '75%' }
    },
    {
      id: 4,
      name: "Village Care Pharmacy",
      type: "pharmacy",
      distance: "1.2 km",
      address: "Panchayat Square, Rampur Village",
      doctor: "Pharmacist Rajesh Patel",
      phone: "+91 98765 99001",
      hours: "Open Now • 1.2 km away",
      beds: "Generic Medicines (-80% Discount)",
      rating: 4.9,
      is24x7: false,
      freeCare: true,
      govtApproved: true,
      coords: { top: '60%', left: '40%' }
    },
    {
      id: 3,
      name: "Sanjeevani Govt. Scheme Hospital",
      type: "govt",
      distance: "4.5 km",
      address: "Civil Lines, Near Bus Station",
      doctor: "Dr. Ananya Sharma (MD)",
      phone: "+91 98765 88990",
      hours: "24x7 Emergency & Surgery",
      beds: "24 Open Beds (Ayushman PM-JAY)",
      rating: 4.7,
      is24x7: true,
      freeCare: true,
      govtApproved: true,
      coords: { top: '75%', left: '60%' }
    }
  ];

  const filteredClinics = clinics.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.address.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'clinic') return matchesSearch && (c.type === 'clinic' || c.type === 'asha');
    if (filterType === 'pharmacy') return matchesSearch && c.type === 'pharmacy';
    if (filterType === 'govt') return matchesSearch && c.type === 'govt';
    return matchesSearch;
  });

  const confirmReservation = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingConfirmed(false);
    }, 2200);
  };

  return (
    <div className="w-full relative min-h-[640px] flex flex-col rounded-3xl overflow-hidden shadow-lg border border-[#857462]/15">
      {/* Aerial Map Background Container */}
      <div className="relative flex-1 min-h-[440px] w-full bg-[#d5ebff] dark:bg-[#123348] overflow-hidden">
        {/* Detailed aerial rural landscape map background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-85 transition-opacity duration-500"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')`
          }}
        ></div>

        {/* Top Horizontal Filter Chips */}
        <div className="absolute top-4 left-0 right-0 z-20 px-4 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Locations' },
            { id: 'clinic', label: 'Clinics & ASHA' },
            { id: 'pharmacy', label: 'Pharmacy' },
            { id: 'govt', label: 'Govt. Scheme Hospital' },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setFilterType(chip.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer border ${
                filterType === chip.id
                  ? 'bg-[#0062a2] text-white border-[#0062a2]'
                  : 'bg-white/90 dark:bg-[#001e2f]/90 text-[#001e2f] dark:text-[#ebf5ff] border-[#857462]/20 hover:bg-white'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Custom Map Pins */}
        {filteredClinics.map((c) => {
          const isSelected = selectedClinic?.id === c.id;
          return (
            <div
              key={c.id}
              onClick={() => setSelectedClinic(c)}
              style={{ top: c.coords.top, left: c.coords.left }}
              className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform ${
                isSelected ? 'scale-115 z-40' : 'hover:scale-110'
              }`}
            >
              <div className={`rounded-full flex items-center justify-center shadow-xl border-4 border-white ${
                isSelected 
                  ? 'w-14 h-14 bg-[#0062a2] text-white animate-pulse' 
                  : c.type === 'pharmacy' 
                  ? 'w-12 h-12 bg-amber-500 text-white' 
                  : c.type === 'asha' 
                  ? 'w-12 h-12 bg-teal-600 text-white' 
                  : 'w-12 h-12 bg-[#835500] text-white'
              }`}>
                <span className="material-symbols-outlined text-2xl icon-fill">
                  {c.type === 'pharmacy' ? 'local_pharmacy' : c.type === 'asha' ? 'person' : 'local_hospital'}
                </span>
              </div>
              <span className="mt-1 text-[11px] font-bold text-[#001e2f] bg-white/90 dark:bg-[#001e2f]/90 dark:text-[#ebf5ff] px-2.5 py-1 rounded-md backdrop-blur-md shadow-sm border border-black/5 whitespace-nowrap">
                {c.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Sheet Details Widget (Matching Screen 02 HTML) */}
      {selectedClinic && (
        <div className="bg-white dark:bg-[#001e2f] rounded-t-3xl p-5 border-t border-[#857462]/20 shadow-2xl z-30 transition-all">
          {/* Drag Handle */}
          <div className="w-full flex justify-center pb-3">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#001e2f] dark:text-[#ebf5ff]">
                  {selectedClinic.name}
                </h3>
                <p className="text-xs md:text-sm text-[#524534] dark:text-[#c9e6ff] flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{selectedClinic.hours}</span>
                </p>
              </div>

              <div className="bg-[#d5ebff] dark:bg-[#123348] px-3 py-1 rounded-xl shrink-0">
                <span className="text-xs font-bold text-[#835500] dark:text-[#ffb955] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t('govtApproved')}</span>
                </span>
              </div>
            </div>

            {/* Medicine Search Field with Voice Mic trigger */}
            <div className="w-full h-12 bg-[#ebf5ff] dark:bg-[#123348] rounded-2xl flex items-center px-4 border border-[#857462]/15">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder={t('searchMedicines')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none focus:outline-none text-xs md:text-sm text-[#001e2f] dark:text-[#ebf5ff] ml-2 placeholder:text-gray-400"
              />
              <button
                onClick={() => {
                  setSearchQuery('Paracetamol 500mg');
                  alert('Voice recognized: "Paracetamol 500mg" - In Stock at Village Care Pharmacy');
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#67b3ff]/30 text-[#004473] dark:text-[#67b3ff] hover:bg-[#67b3ff]/50 transition-colors cursor-pointer"
                title="Voice Search Medicine"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="flex-1 py-3.5 rounded-2xl bg-[#f5a623] hover:bg-[#e0951a] text-[#644000] font-bold text-xs md:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">medical_services</span>
                <span>{t('reservePharmacy')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Confirmation Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#001e2f] max-w-md w-full rounded-3xl p-6 shadow-2xl border border-[#857462]/20">
            {!bookingConfirmed ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#001e2f] dark:text-[#ebf5ff]">
                    Reserve Medicines at {selectedClinic.name}
                  </h3>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ebf5ff] dark:bg-[#123348] mb-4 text-xs text-[#001e2f] dark:text-[#ebf5ff] space-y-1">
                  <p className="font-bold">Medicine List: Paracetamol 500mg, ORS Electrolyte Pack</p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-bold">Jan Aushadhi Subsidy: 80% Discount Applied</p>
                </div>

                <button
                  onClick={confirmReservation}
                  className="w-full py-3.5 rounded-2xl bg-[#0062a2] hover:bg-[#004473] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Confirm Reservation Token
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#001e2f] dark:text-[#ebf5ff] mb-1">
                  Pharmacy Reservation Saved!
                </h3>
                <p className="text-xs text-[#524534] dark:text-[#c9e6ff]">
                  Show your token #PH-901 at Village Care Pharmacy counter for instant pickup.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
