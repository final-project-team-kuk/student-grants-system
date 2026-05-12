import React, { useState, useEffect } from 'react';
import './admin-requests.css'; // השורה הזו מחברת את העיצוב למעלה

function AdminRequests() {
  const [searchId, setSearchId] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [requests, setRequests] = useState([]);





  
  const fetchRequests = async () => {
    console.log("הכפתור נלחץ! מחפש את:", searchId, searchCity); // שורת בדיקה
    try {
      const response = await fetch(`http://localhost:5000/api/admin/search?id=${searchId}&city=${searchCity}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("שגיאה במשיכת נתונים:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="main-navbar">
        <a href="/" className="nav-logo">
          <div className="logo-icon">🎓</div>
          <span className="logo-text">מערכת מענקים</span>
        </a>
        <div className="nav-links">
          <a href="/login" className="nav-link-btn">🚪 יציאה / כניסת משתמש</a>
        </div>
      </nav>

      <div className="content-wrapper">
        <header className="page-header">
          <span className="welcome-text">שלום, מנהל המערכת 👋</span>
          <h1 className="main-title">ניהול בקשות מענק</h1>
          <p className="sub-title">כל הבקשות הממתינות לטיפול במערכת</p>
        </header>

        <section className="filter-panel">
          <div className="filter-grid">
            <div className="input-group">
              <label>חיפוש לפי ת.ז</label>
              <input 
                type="text" 
                placeholder="הזן מספר זהות..." 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>עיר מגורים</label>
              <input 
                type="text" 
                placeholder="עיר..." 
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className="primary-button" onClick={fetchRequests}>סנן תוצאות</button>
          </div>
        </section>

        <section className="table-section">
          <table className="requests-table">
            <thead>
              <tr>
                <th>שם סטודנט</th>
                <th>תעודת זהות</th>
                <th>עיר</th>
                <th>סכום</th>
                <th>סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((item) => (
                  <tr key={item._id}>
                    <td>{item.studentName}</td>
                    <td>{item.studentId}</td>
                    <td>{item.city}</td>
                    <td>{item.amount}₪</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#a0b3bc' }}>
                    לא נמצאו נתונים להצגה. וודאי שהשרת רץ ויש נתונים ב-Database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default AdminRequests;