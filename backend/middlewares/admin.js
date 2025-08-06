const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// middleware to validate admin via jwt
async function adminMiddleware(req, res, next) {
  const authVal = req.headers.authorization;
  const bearer = authVal.split(" ")[1];
  const verified = jwt.verify(bearer, SECRET);

  if (verified) {
    next();
  } else {
    res.status(401).json({ status: "Bearer Error" });
  }
}

module.exports = adminMiddleware;
