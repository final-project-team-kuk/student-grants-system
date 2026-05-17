const Request = require('../db/Request');

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().select('-__v');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).select('-__v');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: 'Invalid request ID' });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRequestEducation = async (req, res) => {
  try {
    const { education } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { education },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllRequests, getRequestById, updateRequestStatus, updateRequestEducation };
