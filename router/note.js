const express = require("express");

const router = express.Router();
const { postNote, getHtml } = require("../controllers/note.js");

router.route("/").post(postNote);
router.route("/html/:id").get(getHtml);
module.exports = router;
