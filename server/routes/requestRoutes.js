const express = require("express");
const { Router } = express;
const {
  create,
  read,
  readOne,
  update,
  updateStatus,
  remove
} = require("../controllers/addRequestCrude");
// 👑 שלב א': מייבאים את הפונקציה הנכונה מהקונטרולר של הסטטוס
const { getRequestStatus } = require("../controllers/requestController");

const router = Router();
router.get("/status/:userId", getRequestStatus); // <--- זה הניתוב שהיה חסר!
//  Method   Path                      Controller
router.post  ("/",           create);        // create new request
router.get   ("/",           read);          // get all (+ optional filters)
router.get   ("/:id",        readOne);       // get one by id
router.put   ("/:id",        update);        // update any fields
router.patch ("/:id/status", updateStatus);  // change status only
router.delete("/:id",        remove);        // delete

module.exports = router;
