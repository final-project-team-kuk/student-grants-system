const express = require('express');
const router = express.Router();
const {
  register,
  addStudent,
  login,
  getAllStudents,
  getStudentById,
  updateStudent,
  changePassword,
  deleteStudent,
  // softDeleteStudent, // מייבאים בהערה בינתיים
} = require('../controllers/studentController');

// ניהול רשומות
router.get('/', getAllStudents);
router.post('/register', register); 
router.post('/add', addStudent);    
router.post('/login', login);       

// פעולות על סטודנט ספציפי
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.patch('/:id/change-password', changePassword); 

// מחיקה רגילה (מוחקת לגמרי ממסד הנתונים) - פעילה!
router.delete('/:id', deleteStudent);

// נתיב למחיקה רכה - מושהה בהערה בינתיים
// router.patch('/:id/soft-delete', softDeleteStudent);

module.exports = router;