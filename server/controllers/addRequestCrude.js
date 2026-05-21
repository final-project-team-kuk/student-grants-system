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
// Optional query filters: ?status=pending  /  ?userId=<id>
const read = (req, res) => {
  requestModel.find()
    .then(requests => res.status(200).send(requests))
    .catch(error => res.status(500).send({ error: error.message }));
};

// ─── READ ONE ─────────────────────────────────────────────────────────────────
// GET /api/requests/:id
// Returns a single request that matches the given MongoDB _id.
const readOne = (req, res) => {
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
const update = (req, res) => {
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
const updateStatus = (req, res) => {
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
const remove = (req, res) => {
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

// ─── UPDATE STEP ONE (הפונקציה החדשה שלנו) ───────────────────────────────────
// POST או PUT /api/requests/step-one
// מעדכן את נתוני שלב 1 ומבצע בדיקות תקינות
const updateStepOne = (req, res) => {
  const { nationalId, firstName, lastName, personal, requestId } = req.body;

  // 1. בדיקות תקינות (ולידציות)
  if (!nationalId || !firstName || !lastName) {
    return res.status(400).send({ error: "חובה למלא מספר זהות, שם פרטי ושם משפחה." });
  }
  if (nationalId.trim().length !== 9) {
    return res.status(400).send({ error: "מספר זהות חייב להכיל בדיוק 9 ספרות." });
  }
  if (!personal || !personal.birthDate || !personal.city || !personal.address || !personal.mobile) {
    return res.status(400).send({ error: "חובה למלא את כל פרטי המגורים והטלפון הנייד." });
  }

  // 2. הכנת המבנה המדויק לעדכון לפי המודל שלכם
  const updateData = {
    userSnapshot: {
      nationalId: nationalId.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim()
    },
    personal: {
      birthDate: personal.birthDate,
      city: personal.city.trim(),
      address: personal.address.trim(),
      phone: personal.phone ? personal.phone.trim() : "",
      mobile: personal.mobile.trim()
    }
  };

  // 3. שמירה בבסיס הנתונים
  // אם יש לנו כבר requestId (כי הוא שמר טיוטה או עבר שלב), נעדכן אותה. 
  // אם אין, נחפש לפי תעודת זהות או ניצור חדש (upsert)
  const filter = requestId ? { _id: requestId } : { "userSnapshot.nationalId": nationalId.trim() };

  requestModel.findOneAndUpdate(
    filter,
    { $set: updateData },
    { new: true, upsert: true, runValidators: true }
  )
    .then(request => {
      return res.status(200).send({
        success: true,
        message: "שלב 1 נשמר בהצלחה!",
        requestId: request._id, // מחזירים את ה-ID כדי שהשלבים הבאים ידעו לעדכן את אותה בקשה
        data: request
      });
    })
    .catch(error => {
      return res.status(500).send({ error: error.message });
    });
};

module.exports = { create, read, readOne, update, updateStatus, remove, updateStepOne };

