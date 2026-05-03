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

    res.status(400).json({ message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, idNumber, password } = req.body;

    const student = await Student.findById(id).select('+password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
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
      return res.status(409).json({ message: 'ID number already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

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

module.exports = {
  register,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
