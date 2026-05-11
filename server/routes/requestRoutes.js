import { Router } from "express";
import {
  create,
  read,
  readOne,
  update,
  updateStatus,
  remove
} from "../controllers/requestController.js";

const router = Router();

//  Method   Path                      Controller
router.post  ("/",          create);        // create new request
router.get   ("/",          read);          // get all (+ optional filters)
router.get   ("/:id",       readOne);       // get one by id
router.put   ("/:id",       update);        // update any fields
router.patch ("/:id/status",updateStatus);  // change status only
router.delete("/:id",       remove);        // delete

export default router;
