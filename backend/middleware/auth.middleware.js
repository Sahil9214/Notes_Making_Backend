const jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenDecoder(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return res.status(400).send({ msg: "Token Nahi aaya bhai" });
    }
    jwt.verify(token, process.env.Secret_key, async function (err, decoded) {
      if (err) {
        return res.status(400).send({ msg: err });
      } else {
        let email = decoded.email;
        req.email = email;
        next();
      }
    });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
}
module.exports = { tokenDecoder };
