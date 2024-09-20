const jwt = require("jsonwebtoken");
const user = require("../models/users");

const tokenVerify = (req, res, next) => {
  const authHead = req.headers["authorization"];
  if (!authHead) return res.status(404).send("unauthorized");

  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(404).send("token not found");

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(500).json({ message: "invalid token" });
    req.user = await user.findOne({ _id: decoded.id });
    next();
  });
};
module.exports = tokenVerify;
