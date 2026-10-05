function notFound(req, res) {
  return res.status(404).json({
    message: "this route does not exist",
  });
}

module.exports = notFound;
