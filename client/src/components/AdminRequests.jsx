
import { useEffect, useState } from "react";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    id: "",
    city: "",
    startDate: "",
    endDate: ""
  });
  // const [filteredRequests, setFilteredRequests] = useState([]);


  const filteredRequests = requests.filter(req => {


    const matchId =
      filters.id === "" || (req.id || req._id)?.includes(filters.id);

    const matchCity =
      filters.city === "" ||
      req.city?.toLowerCase().includes(filters.city.toLowerCase());

    const matchStart =
      !filters.startDate ||
      new Date(req.createdAt) >= new Date(filters.startDate);

    const matchEnd =
      !filters.endDate ||
      new Date(req.createdAt) <= new Date(filters.endDate);

    return matchId && matchCity && matchStart && matchEnd;
  });

  const handleFilter = () => {
    console.log(filteredRequests);

  };

  useEffect(() => {
    fetch("http://localhost:5000/api/search")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRequests(data);
      });
  }, []);
  return (
    <div className="min-h-screen bg-[#E8E3D7] px-6 py-10" dir="rtl">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm text-[#071325]/60">שלום, מנהל המערכת 👋</span>
          <h1 className="text-3xl font-bold text-[#071325] mt-1 mb-2">ניהול בקשות מענק</h1>
          <p className="text-[#071325]/70">כל הבקשות הממתינות לטיפול במערכת</p>
        </div>

        {/* ריבוע המונה */}
        <div className="bg-blue-100 text-blue-800 p-3 rounded-lg shadow-sm mb-4 inline-block font-bold">
          נמצאו {requests.length} בקשות מתאימות
        </div>

        {/* הטבלה שלך
        <div className="mt-6">
          {filteredRequests.length > 0 ? (
            <Table data={filteredRequests} />
          ) : (
            //<p className="text-gray-500 text-center">לא נמצאו תוצאות העונות לסינון</p>
          )
          }
        </div> */}

        {/* Filter panel */}
        <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#071325]">חיפוש לפי ת.ז</label>
              <input
                type="text"
                placeholder="הזן מספר זהות..."
                value={filters.id}
                onChange={(e) =>
                  setFilters({ ...filters, id: e.target.value })
                }
                className="border border-[#e2dfd8] rounded-xl px-4 py-2 text-sm text-[#071325] bg-[#E8E3D7]/40 focus:outline-none focus:border-[#071325]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#071325]">עיר מגורים</label>
              <input
                type="text"
                placeholder="עיר..."
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
                className="border border-[#e2dfd8] rounded-xl px-4 py-2 text-sm text-[#071325] bg-[#E8E3D7]/40 focus:outline-none focus:border-[#071325]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#071325]">מתאריך</label>
              <input
                type="date"
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
                className="border border-[#e2dfd8] rounded-xl px-4 py-2 text-sm text-[#071325] bg-[#E8E3D7]/40 focus:outline-none focus:border-[#071325]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#071325]">עד תאריך</label>
              <input
                type="date"
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
                className="border border-[#e2dfd8] rounded-xl px-4 py-2 text-sm text-[#071325] bg-[#E8E3D7]/40 focus:outline-none focus:border-[#071325]/40 transition"
              />
            </div>

          </div>

          <div className="flex justify-center mt-8">
            {/* <button className="bg-[#071325] hover:bg-[#0d2544] text-white text-sm font-medium px-8 py-2.5 rounded-xl transition">
              סנן תוצאות
            </button> */}
          </div>
        </div>

        {/* Table placeholder */}
        <table className="w-full mt-6 bg-white rounded-xl overflow-hidden shadow">

          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-2">ת.ז</th>
              <th>שם מלא</th>
              <th>מגמה</th>
              <th>תאריך הגשה</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req._id} className="border-t text-sm">

                {/* ת.ז */}
                <td className="p-2">{req.id}</td>

                {/* שם */}
                <td>{req.studentName}</td>

                {/* עיר */}
                <td>{req.city}</td>

                {/* תאריך */}
                <td>
                  {new Date(req.createdAt).toLocaleDateString('he-IL')}
                </td>

                {/* סטטוס */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${req.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {req.status}
                  </span>
                </td>

                {/* כפתור */}
                <td>
                  {/* <button
                    onClick={handleFilter}
                    className="bg-[#071325] hover:bg-[#0d2544] text-white text-sm font-medium px-8 py-2.5 rounded-xl transition"
                  >
                    סנן תוצאות
                  </button> */}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default AdminRequests;