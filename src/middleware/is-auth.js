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
  const secret = process.env.COREAPP_DB_PROVIDER;
  try {
    decodedToken = jwt.verify(token, secret);
    req.userEmail = decodedToken.userEmail;
  } catch (err) {
    console.log(err);
  }
  if (!decodedToken) {
    res.status(401).send({
      message: "Not authenticated!",
    });
  }
  next();
};
