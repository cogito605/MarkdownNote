const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { error } = require("console");

const publicKey = fs.readFileSync(path.join(__dirname, "../public.pem"));

function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      error: "invalid token",
    });
  } else {
    try {
      const token = authHeader.split(" ")[1];
      console.log("AUTH:", req.headers.authorization);
      console.log("TOKEN:", token);
      const decode = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
      });

      req.user = decode;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        error: "invalid or expired token",
      });
    }
  }
}

module.exports = authMiddleWare;
