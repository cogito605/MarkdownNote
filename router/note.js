const express = require("express");

const router = express.Router();
const authMiddleWare = require("../middle-ware/auth.js");
const { postNote, getHtml } = require("../controllers/note.js");

router.use(authMiddleWare);

router.route("/").post(postNote);
router.route("/html/:id").get(getHtml);
module.exports = router;
