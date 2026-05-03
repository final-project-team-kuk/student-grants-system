import React from 'react';
// import './Dashboard.css';

function App() {
  return (
    <div className="dashboard-container">
{/* סרגל ניווט עליון */}
      <nav className="main-navbar">
        {/* צד ימין - לוגו (הכנתי מקום ללינק) */}
        <a href="/" className="nav-logo">
          <div className="logo-icon">🎓</div>
          <span className="logo-text">מערכת מענקים</span>
        </a>

        {/* צד שמאל - כפתור חזרה לכניסה */}
        <div className="nav-links">
          <a href="/login" className="nav-link-btn">
             🚪 יציאה / כניסת משתמש
          </a>
        </div>
      </nav>    <div className="content-wrapper">
     
        
       <header className="page-header">
          <span className="welcome-text">שלום, מנהל המערכת 👋</span>
          <h1 className="main-title">ניהול בקשות מענק</h1>
          <p className="sub-title">כל הבקשות הממתינות לטיפול במערכת</p>
        </header>

        <section className="filter-panel">
          <div className="filter-grid">
            
            <div className="input-group">
              <label>חיפוש לפי ת.ז</label>
              <input type="text" placeholder="הזן מספר זהות..." />
            </div>

            <div className="input-group">
              <label>מתאריך</label>
              <input type="date" />
            </div>

            <div className="input-group">
              <label>עד תאריך</label>
              <input type="date" />
            </div>

            <div className="input-group">
              <label>עיר מגורים</label>
              <input type="text" placeholder="עיר..." />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
             <button className="primary-button">סנן תוצאות</button>
          </div>
        </section>

        {/* פה תבוא הטבלה בהמשך - היא גם תהיה ברוחב של ה-content-wrapper */}
      </div>
    </div>

     
    
  );
}

export default App;