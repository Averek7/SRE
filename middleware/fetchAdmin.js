const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret_token_user";

const fetchadmin = async (req, res, next) => {
  // Get admin from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate with valid token" });
  }
  try {
    const data = await jwt.verify(token, JWT_SECRET);
    req.admin = data.admin;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please authenticate with valid token" });
  }
};

module.exports = fetchadmin;
