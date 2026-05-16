const User = require('../db/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

// הרשמה
const register = async (req, res) => {
  try {
    const { firstName, lastName, idNumber, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !idNumber || !password || !confirmPassword) {
      return res.status(400).json({ error: 'כל השדות נדרשים' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'הסיסמאות לא תואמות' });
    }

    const existingUser = await User.findOne({ nationalId: idNumber });
    if (existingUser) {
      return res.status(400).json({ error: 'משתמש עם תעודת זהות זו כבר קיים במערכת' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      nationalId: idNumber,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'ההרשמה בוצעה בהצלחה!' });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה בשרת בעת הניסיון להירשם' });
  }
};

// התחברות
const login = async (req, res) => {
  try {
    const { idNumber, password } = req.body;

    if (!idNumber || !password) {
      return res.status(400).json({ error: 'מספר זהות וסיסמה נדרשים' });
    }

    const user = await User.findOne({ nationalId: idNumber });
    if (!user) {
      return res.status(400).json({ error: 'מספר זהות או סיסמה שגויים' });
    }

    const isHashed = typeof user.password === 'string' && user.password.startsWith('$2');
    const isMatch = isHashed ? await bcrypt.compare(password, user.password) : password === user.password;

    if (!isMatch) {
      return res.status(400).json({ error: 'מספר זהות או סיסמה שגויים' });
    }

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'התחברת בהצלחה',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        nationalId: user.nationalId,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה בשרת בעת הניסיון להתחבר' });
  }
};

module.exports = {
  register,
  login,
};