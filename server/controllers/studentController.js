const Student = require('../models/student');
const bcrypt = require('bcrypt');

// 1. יצירת סטודנט חדש (הרשמה עצמאית עם וידוא סיסמה כפולה)
const register = async (req, res) => {
  try {
    const { firstName, lastName, idNumber, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !idNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = await Student.create({
      firstName,
      lastName,
      idNumber,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'Student registered successfully',
      student: {
        id: newStudent._id,
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        idNumber: newStudent.idNumber,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'ID number already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// 2. הוספה ידנית של סטודנט (על ידי מנהל, ללא צורך באימות סיסמה כפולה)
const addStudent = async (req, res) => {
  try {
    const { firstName, lastName, idNumber, password } = req.body;

    if (!firstName || !lastName || !idNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = await Student.create({
      firstName,
      lastName,
      idNumber,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'Student added manually successfully',
      student: { id: newStudent._id, firstName, lastName, idNumber },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'ID number already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// 3. התחברות למערכת (Login)
const login = async (req, res) => {
  try {
    const { idNumber, password } = req.body;

    if (!idNumber || !password) {
      return res.status(400).json({ message: 'ID number and password are required' });
    }

    const student = await Student.findOne({ idNumber }).select('+password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      student: { id: student._id, firstName: student.firstName, lastName: student.lastName },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. שליפת כל הסטודנטים כולל סינון ודפדוף (Pagination)
const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.query.firstName) {
      query.firstName = { $regex: req.query.firstName, $options: 'i' };
    }

    const students = await Student.find(query).select('-password').skip(skip).limit(limit);
    const total = await Student.countDocuments(query);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      students,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. שליפת סטודנט ספציפי 
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: 'Invalid student ID' });
  }
};

// 6. עדכון פרטי סטודנט (ללא טיפול בסיסמה)
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, idNumber } = req.body;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (firstName !== undefined) student.firstName = firstName;
    if (lastName !== undefined) student.lastName = lastName;
    if (idNumber !== undefined) student.idNumber = idNumber;

    await student.save();
    res.json(student);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'ID number already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// 7. עדכון סיסמה ייעודי מאובטח
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Please provide valid old and new passwords (min 6 characters)' });
    }

    const student = await Student.findById(id).select('+password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);
    await student.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8. מחיקה רגילה (Hard Delete) - מוחקת את הסטודנט לגמרי (פעיל)
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid student ID' });
  }
};

/* 
 * ==========================================
 * אופציה עתידית: מחיקה רכה (Soft Delete) 
 * ==========================================
 * אם בעתיד תרצו רק להסתיר סטודנטים בלי למחוק אותם ממסד הנתונים:
 * 1. הוסיפו למודל (models/student.js) את השורה: isActive: { type: Boolean, default: true }
 * 2. עדכנו את פונקציות השליפה (getAllStudents, getStudentById) שיוסיפו לחיפוש: { isActive: true }
 * 3. הוציאו מהערה את הפונקציה הבאה ואת הייצוא שלה למטה.
 */
// const softDeleteStudent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const student = await Student.findByIdAndUpdate(id, { isActive: false }, { new: true });
//     if (!student) return res.status(404).json({ message: 'Student not found' });
//     res.json({ message: 'Student deleted successfully (soft delete)' });
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid student ID' });
//   }
// };

module.exports = {
  register,
  addStudent,
  login,
  getAllStudents,
  getStudentById,
  updateStudent,
  changePassword,
  deleteStudent, // המחיקה הרגילה מיוצאת ופעילה
  // softDeleteStudent, // בהערה בינתיים
};