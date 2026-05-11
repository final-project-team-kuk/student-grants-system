import requestModel from "../models/requestModel.js";

// ─── CREATE ───────────────────────────────────────────────────────────────────
// POST /api/requests
// Gets the full request body and saves it as a new document in MongoDB.
export const create = (req, res) => {
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
// Optional query filters: ?status=pending  /  ?userId=<id>
export const read = (req, res) => {
  requestModel.find()
    .then(requests => res.status(200).send(requests))
    .catch(error => res.status(500).send({ error: error.message }));
};

// ─── READ ONE ─────────────────────────────────────────────────────────────────
// GET /api/requests/:id
// Returns a single request that matches the given MongoDB _id.
export const readOne = (req, res) => {
  requestModel.findById(req.params.id)
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
// Updates only the fields you send in the body — everything else stays the same.
// runValidators makes sure the new values still pass the schema rules.
export const update = (req, res) => {
  requestModel.findByIdAndUpdate(
    req.params.id,
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
// Changes only the status field.  Body must be: { "status": "approved" }
export const updateStatus = (req, res) => {
  const { status } = req.body;
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).send({ error: "Invalid status value" });
  }

  requestModel.findByIdAndUpdate(
    req.params.id,
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
// Permanently removes the request from the database.
export const remove = (req, res) => {
  requestModel.findByIdAndDelete(req.params.id)
    .then(request => {
      if (!request) {
        return res.status(404).send({ error: "Request not found" });
      }
      return res.status(200).send({ message: "Request deleted successfully" });
    })
    .catch(error => {
      return res.status(500).send({ error: error.message });
    });
};