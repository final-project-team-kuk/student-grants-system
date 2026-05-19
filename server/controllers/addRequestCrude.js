const requestModel = require("../models/requestModel");

// ─── CREATE ───────────────────────────────────────────────────────────────────
// POST /api/requests
// Gets the full request body and saves it as a new document in MongoDB.
const create = (req, res) => {
  const new_request = new requestModel(req.body);

  new_request.save()
    .then(request => {
      return res.status(201).send(request);
    })
    .catch(error => {
      return res.status(500).send({ error: error.message });
    });
};

// ─── READ ALL ─────────────────────────────────────────────────────────────────
// GET /api/requests
// Returns every request in the database.
const read = (req, res) => {
  requestModel.find()
    .then(requests => res.status(200).send(requests))
    .catch(error => res.status(500).send({ error: error.message }));
};

// ─── READ ONE ─────────────────────────────────────────────────────────────────
// GET /api/requests/:id
// Returns a single request that matches the given nationalId.
const readOne = (req, res) => {

  console.log(req.params.id);
  console.log(typeof req.params.id);

  requestModel.findOne({
    "userSnapshot.nationalId": String(req.params.id).trim()
  })
    .then(request => {
      if (!request) {
        return res.status(404).send({ error: "Request not found" });
      }

      return res.status(200).send(request);
    })
    .catch(error => {
      return res.status(500).send({ error: error.message });
    });
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
// PUT /api/requests/:id
const update = (req, res) => {

  console.log(req.params.id);
  console.log(typeof req.params.id);

  requestModel.findOneAndUpdate(
    {
      "userSnapshot.nationalId": String(req.params.id).trim()
    },
    { $set: req.body },
    { new: true, runValidators: true }
  )
    .then(request => {
      if (!request) {
        return res.status(404).send({ error: "Request not found" });
      }

      return res.status(200).send(request);
    })
    .catch(error => {
      return res.status(500).send({ error: error.message });
    });
};

// ─── UPDATE STATUS ────────────────────────────────────────────────────────────
// PATCH /api/requests/:id/status
const updateStatus = (req, res) => {

  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).send({ error: "Invalid status value" });
  }

  console.log(req.params.id);
  console.log(typeof req.params.id);

  requestModel.findOneAndUpdate(
    {
      "userSnapshot.nationalId": String(req.params.id).trim()
    },
    { $set: { status } },
    { new: true }
  )
    .then(request => {
      if (!request) {
        return res.status(404).send({ error: "Request not found" });
      }

      return res.status(200).send(request);
    })
    .catch(error => {
      return res.status(500).send({ error: error.message });
    });
};

// ─── DELETE ───────────────────────────────────────────────────────────────────
// DELETE /api/requests/:id
const remove = (req, res) => {

  console.log(req.params.id);
  console.log(typeof req.params.id);

  requestModel.findOneAndDelete({
    "userSnapshot.nationalId": String(req.params.id).trim()
  })
    .then(request => {
      if (!request) {
        return res.status(404).send({ error: "Request not found" });
      }

      return res.status(200).send({
        message: "Request deleted successfully"
      });
    })
    .catch(error => {
      return res.status(500).send({ error: error.message });
    });
};

module.exports = {
  create,
  read,
  readOne,
  update,
  updateStatus,
  remove
};