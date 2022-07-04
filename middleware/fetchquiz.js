const jwt = require("jsonwebtoken");
const JWT_SECRET = "technoboot";

const fetchquiz = async (req, res, next) => {
  const quiz_token = req.header("get-quiz");
  if (!quiz_token) {
    res
      .status(401)
      .send({ error: "Please authenticate with valid quiz id token" });
  }
  try {
    const data = await jwt.verify(quiz_token, JWT_SECRET);
    req.quiz = data.quiz;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate with valid quiz id token" });
  }
};
module.exports = fetchquiz;
