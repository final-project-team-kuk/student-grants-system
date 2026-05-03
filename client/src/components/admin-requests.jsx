import React from 'react';

export default function AdminRequests() {
  return (
    <div className="min-h-screen bg-[#E8E3D7] px-6 py-10" dir="rtl">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm text-[#071325]/60">שלום, מנהל המערכת 👋</span>
          <h1 className="text-3xl font-bold text-[#071325] mt-1 mb-2">ניהול בקשות מענק</h1>
          <p className="text-[#071325]/70">כל הבקשות הממתינות לטיפול במערכת</p>
        </div>

        {/* Filter panel */}
        <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#071325]">חיפוש לפי ת.ז</label>
              <input
                type="text"
                placeholder="הזן מספר זהות..."
                className="border border-[#e2dfd8] rounded-xl px-4 py-2 text-sm text-[#071325] bg-[#E8E3D7]/40 focus:outline-none focus:border-[#071325]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#071325]">עיר מגורים</label>
              <input
                type="text"
                placeholder="עיר..."
                className="border border-[#e2dfd8] rounded-xl px-4 py-2 text-sm text-[#071325] bg-[#E8E3D7]/40 focus:outline-none focus:border-[#071325]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#071325]">מתאריך</label>
              <input
                type="date"
                className="border border-[#e2dfd8] rounded-xl px-4 py-2 text-sm text-[#071325] bg-[#E8E3D7]/40 focus:outline-none focus:border-[#071325]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#071325]">עד תאריך</label>
              <input
                type="date"
                className="border border-[#e2dfd8] rounded-xl px-4 py-2 text-sm text-[#071325] bg-[#E8E3D7]/40 focus:outline-none focus:border-[#071325]/40 transition"
              />
            </div>

          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-[#071325] hover:bg-[#0d2544] text-white text-sm font-medium px-8 py-2.5 rounded-xl transition">
              סנן תוצאות
            </button>
          </div>
        </div>

        {/* Table placeholder */}
        <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center text-[#071325]/40 text-sm">
          הטבלה תופיע כאן
        </div>

      </div>
    </div>
  );
}