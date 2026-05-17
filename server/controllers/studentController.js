const Student = require('../models/student');

const register = async (req, res) => {
  try {
    const { firstName, lastName, idNumber, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !idNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password do not match' });
    }

    const newStudent = await Student.create({
      firstName,
      lastName,
      idNumber,
      password,
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
    // לא שינינו כאן הרבה, כי register לא מקבל ID חיצוני, אז אין סכנת CastError
    res.status(400).json({ message: 'אירעה שגיאה ביצירת המשתמש.' }); 
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (error) {
    console.error("Database Error:", error.message);
    res.status(500).json({ message: 'אירעה תקלה פנימית במערכת.' });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'המשתמש לא נמצא.' });
    }

    res.json(student);
  } catch (error) {
    // === התיקון ===
    if (error.name === 'CastError') {
       return res.status(400).json({ message: 'מזהה המשתמש אינו תקין. ייתכן והתהליך הופסק באמצע.' });
    }
    console.error("Database Error:", error.message);
    res.status(500).json({ message: 'אירעה תקלה במשיכת פרטי המשתמש.' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, idNumber, password } = req.body;

    const student = await Student.findById(id).select('+password');
    if (!student) {
      return res.status(404).json({ message: 'המשתמש לא נמצא במערכת.' });
    }

    if (firstName !== undefined) student.firstName = firstName;
    if (lastName !== undefined) student.lastName = lastName;
    if (idNumber !== undefined) student.idNumber = idNumber;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
      student.password = password;
    }

    await student.save();
    const updatedStudent = await Student.findById(id).select('-password');
    res.json(updatedStudent);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'ID number already exists' }); // את זה השארנו באנגלית כדי שה-React יזהה אותו
    }
    
    // === התיקון המרכזי ===
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'מזהה המשתמש אינו תקין. אנא ודא שהתחלת את התהליך מההתחלה כראוי.' });
    }

    console.error("Database Error in Update:", error.message);
    res.status(500).json({ message: 'אירעה תקלה בעת ניסיון שמירת הנתונים.' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: 'המשתמש לא נמצא.' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    // === התיקון ===
    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'מזהה המשתמש אינו תקין לפעולת המחיקה.' });
    }
    console.error("Database Error in Delete:", error.message);
    res.status(500).json({ message: 'אירעה תקלה בעת מחיקת המשתמש.' });
  }
};

module.exports = {
  register,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};