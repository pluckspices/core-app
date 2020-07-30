const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHead = req.get("Authorization");
  if (!authHead) {
    res.status(401).send({
      message: "Not authenticated!",
    });
  }
  const token = authHead.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "nithin");
  } catch (err) {
    res.status(500).send({
      message: "Server error!",
    });
  }
  if (!decodedToken) {
    res.status(401).send({
      message: "Not authenticated!",
    });
  }
  req.userEmail = decodedToken.email;
  next();
};
