import { useNavigate } from 'react-router-dom';

export const MainComponent = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E8E3D7] via-[#F9F7EF] to-[#E0E7F7] relative overflow-hidden" dir="rtl">
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#1f4ea8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-96 w-96 rounded-full bg-[#071325]/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl">
          <section className="overflow-hidden rounded-[32px] border border-[#071325]/10 bg-white/85 shadow-[0_40px_120px_-65px_rgba(7,19,37,0.65)] backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-10 text-right lg:p-14">
                <span className="inline-flex rounded-full bg-[#1f4ea8]/10 px-4 py-2 text-sm font-semibold text-[#1f4ea8]">
                  מערכת מענקי סטודנטים
                </span>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#071325] sm:text-5xl">
                  החוויה החדשה להגשת בקשות מענק אקדמי
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#475569] sm:text-lg">
                  כאן תוכל להגיש בקשות מענק, לעקוב אחרי הסטטוס שלהן, ולנהל את המסמכים האקדמיים שלך בצורה מאורגנת וברורה. המערכת שלנו מותאמת במיוחד לסטודנטים המעוניינים לחסוך זמן ולהגביר את סיכויי קבלת התמיכה.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center justify-center rounded-3xl bg-[#071325] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#071325]/20 transition hover:bg-[#0b294c]"
                  >
                    התחבר עכשיו
                  </button>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-[#071325]/10 bg-[#F7F6F0] p-5">
                    <p className="text-sm font-semibold text-[#071325]">הגש בקשות בצורה מהירה</p>
                    <p className="mt-2 text-sm leading-6 text-[#64748b]">טפסים דיגיטליים שמפשטים את התהליך ומפחיתים בירוקרטיה.</p>
                  </div>
                  <div className="rounded-[24px] border border-[#071325]/10 bg-[#F7F6F0] p-5">
                    <p className="text-sm font-semibold text-[#071325]">עקוב אחרי כל שלב</p>
                    <p className="mt-2 text-sm leading-6 text-[#64748b]">עדכוני סטטוס ברורים שיעזרו לך לדעת בדיוק היכן הבקשה נמצאת.</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center p-10 lg:p-14">
                <div className="relative w-full rounded-[32px] bg-[#1f4ea8]/10 p-8 shadow-[0_24px_60px_-30px_rgba(7,19,37,0.35)]">
                  <div className="rounded-[28px] border border-[#071325]/10 bg-white p-7 shadow-sm">
                    <div className="flex items-center justify-between gap-4 rounded-3xl bg-[#071325] p-5 text-white sm:px-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-[#cbd5ea]">מענק אקדמי</p>
                        <p className="mt-3 text-lg font-semibold">קבל תמיכה בניהול הבקשה</p>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 text-2xl">
                        ⭐
                      </div>
                    </div>
                    <div className="mt-8 space-y-5">
                      <div className="rounded-[24px] bg-[#F8FAFC] p-5">
                        <p className="text-sm font-semibold text-[#071325]">הגשה מאובטחת</p>
                        <p className="mt-2 text-sm leading-6 text-[#64748b]">שמור על מידע אישי ומסמכים בצורה בטוחה ונגישה.</p>
                      </div>
                      <div className="rounded-[24px] bg-[#F8FAFC] p-5">
                        <p className="text-sm font-semibold text-[#071325]">תמיכה ברורה</p>
                        <p className="mt-2 text-sm leading-6 text-[#64748b]">התקדמות יומיומית ושליטה בכל הפניות שלך במערכת.</p>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-10 top-10 hidden h-24 w-24 rounded-full bg-[#1f4ea8]/20 blur-3xl lg:block" />
                  <div className="pointer-events-none absolute -bottom-10 left-10 hidden h-28 w-28 rounded-full bg-[#071325]/10 blur-3xl lg:block" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};