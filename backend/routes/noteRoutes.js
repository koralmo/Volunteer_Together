const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
  getNotes1,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/").get(protect, getNotes);
router.route("/allnotes").get(getNotes1);
router
  .route("/:id")
  .get(getNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);
router.route("/create").post(protect, createNote);
module.exports = router;
