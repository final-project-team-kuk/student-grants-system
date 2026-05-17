// server/routes/requestRouters.js
const express = require("express");
const router = express.Router();
const Request = require("../db/Request");

const updateFamilyStep = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { family } = req.body;

    if (!family || !family.father || !family.father.id) {
      return res.status(400).json({ error: "נתוני פרטי אב חסרים או לא מלאים" });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { $set: { family: family } },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "הבקשה למענק לא נמצאה במערכת" });
    }

    res.status(200).json({
      message: "פרטי המשפחה עודכנו בהצלחה!",
      request: updatedRequest
    });

  } catch (error) {
    console.error("Error in updateFamilyStep:", error);
    res.status(500).json({ error: "שגיאה פנימית בשרת" });
  }
};

// ⬅️ זה מה שהיה חסר — חיבור הפונקציה ל-URL
router.put("/:requestId/family", updateFamilyStep);

module.exports = router;