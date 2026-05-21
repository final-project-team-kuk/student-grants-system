const express = require("express");
const { Router } = express;
const {
  create,
  read,
  readOne,
  update,
  updateStatus,
  remove,
  updateStepOne
} = require("../controllers/addRequestCrude");

const router = Router();

//  Method   Path                      Controller
router.post  ("/",           create);        // create new request
router.get   ("/",           read);          // get all (+ optional filters)
router.get   ("/:id",        readOne);       // get one by id
router.put   ("/:id",        update);        // update any fields
router.patch ("/:id/status", updateStatus);  // change status only
router.delete("/:id",        remove); 
router.post   ("/step-one",   updateStepOne);       // delete

module.exports = router;
