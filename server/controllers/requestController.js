const Request = require('../db/Request');
const mongoose = require('mongoose');

const formatRequestResponse = (request) => ({
  status: request.status,
  createdAt: request.createdAt,
  education: request.education,
  userSnapshot: request.userSnapshot,
});

const getRequestStatus = async (req, res) => {
  try {
    const { userId } = req.params;
   // const objectId = new mongoose.Types.ObjectId(userId);
const request = await Request.findOne({ "userSnapshot.nationalId": userId }).sort({ createdAt: -1 });
    if (!request) {
      return res.status(404).json({ message: 'No request found for this user' });
    }

    res.json(formatRequestResponse(request));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getCurrentRequestStatus = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    const request = await Request.findOne({ userId: objectId }).sort({ createdAt: -1 });

    if (!request) {
      return res.status(404).json({ message: 'No request found for this user' });
    }

    res.json(formatRequestResponse(request));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRequestStatus,
  getCurrentRequestStatus,
};