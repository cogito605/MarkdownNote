const prisma = require("../db/connect.js");
const parseMarkdown = require("../utility/mark_parser.js");
async function postNote(req, res) {
  try {
    const { content } = req.body;
    const newNote = await prisma.Note.create({
      data: {
        content,
        userId: req.user.userId,
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({
      message: "somthing went to wrong ",
    });
    console.log(error);
  }
}
async function getHtml(req, res) {
  try {
    const { id } = req.params;
    const note = await prisma.Note.findUnique({
      where: { id: id, userId: req.user.userId },
    });
    if (!note) {
      return res.status(404).json({
        message: "there no note",
      });
    }
    const { content } = note;
    let newHtml = parseMarkdown(content);
    res.status(200).json({
      note: note,
      html: newHtml,
    });
  } catch (error) {
    res.status(500).json("somthing went to wrong ");
    console.log(error);
  }
}
module.exports = { postNote, getHtml };
