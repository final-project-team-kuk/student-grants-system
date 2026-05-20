import { useNavigate } from 'react-router-dom';

export const MainComponent = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E8E3D7] via-[#F9F7EF] to-[#E0E7F7] relative overflow-hidden font-[Heebo,sans-serif]" dir="rtl">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#1f4ea8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[600px] w-[600px] rounded-full bg-[#071325]/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-7xl">
          <section className="overflow-hidden rounded-[40px] border border-[#071325]/10 bg-white/80 shadow-[0_40px_120px_-40px_rgba(7,19,37,0.45)] backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

              {/* Left content */}
              <div className="flex flex-col justify-center p-12 text-right lg:p-20">
                <span className="inline-flex self-end rounded-full bg-[#1f4ea8]/10 px-5 py-2 text-base font-normal text-[#1f4ea8]">
                  מערכת מענקי סטודנטים
                </span>
                <h1 className="mt-8 text-4xl font-semibold leading-snug tracking-wide text-[#071325] sm:text-5xl">
                  החוויה החדשה להגשת<br />בקשות מענק אקדמי
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-9 text-[#64748b]">
                  הגש בקשות מענק, עקוב אחרי הסטטוס שלהן, ונהל את המסמכים האקדמיים שלך בצורה מאורגנת וברורה.
                </p>
                <div className="mt-10">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#071325] px-10 py-4 text-base font-medium text-white shadow-lg shadow-[#071325]/20 transition hover:bg-[#1f4ea8] hover:shadow-[#1f4ea8]/30"
                  >
                    התחבר עכשיו
                  </button>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[#071325]/8 bg-[#F7F6F0] p-6">
                    <p className="text-base font-medium text-[#071325]">הגש בקשות בצורה מהירה</p>
                    <p className="mt-2 text-sm leading-7 text-[#64748b]">טפסים דיגיטליים שמפשטים את התהליך ומפחיתים בירוקרטיה.</p>
                  </div>
                  <div className="rounded-3xl border border-[#071325]/8 bg-[#F7F6F0] p-6">
                    <p className="text-base font-medium text-[#071325]">עקוב אחרי כל שלב</p>
                    <p className="mt-2 text-sm leading-7 text-[#64748b]">עדכוני סטטוס ברורים שיעזרו לך לדעת בדיוק היכן הבקשה נמצאת.</p>
                  </div>
                </div>
              </div>

              {/* Right card */}
              <div className="relative flex items-center justify-center bg-[#1f4ea8]/5 p-12 lg:p-16">
                <div className="relative w-full max-w-sm">
                  <div className="rounded-[32px] border border-[#071325]/10 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(7,19,37,0.2)]">
                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#071325] p-6 text-white">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#94a3b8]">מענק אקדמי</p>
                        <p className="mt-3 text-lg font-normal leading-snug">קבל תמיכה בניהול הבקשה</p>
                      </div>
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                        🎓
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl bg-[#F8FAFC] p-5">
                        <p className="text-base font-medium text-[#071325]">הגשה מאובטחת</p>
                        <p className="mt-1.5 text-sm leading-7 text-[#64748b]">שמור על מידע אישי ומסמכים בצורה בטוחה ונגישה.</p>
                      </div>
                      <div className="rounded-2xl bg-[#F8FAFC] p-5">
                        <p className="text-base font-medium text-[#071325]">תמיכה ברורה</p>
                        <p className="mt-1.5 text-sm leading-7 text-[#64748b]">התקדמות יומיומית ושליטה בכל הפניות שלך במערכת.</p>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-8 top-8 h-32 w-32 rounded-full bg-[#1f4ea8]/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-8 left-8 h-36 w-36 rounded-full bg-[#071325]/10 blur-3xl" />
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </main>
  );
};