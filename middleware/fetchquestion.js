const jwt = require("jsonwebtoken");
const JWT_SECRET = "technoboot";

const fetchquestion = async (req, res, next) => {
  const question_token = req.header("get-question");
  if (!question_token) {
    res
      .status(401)
      .send({ error: "Please authenticate with valid question id token" });
  }
  try {
    const data = await jwt.verify(question_token, JWT_SECRET);
    req.questions = data.questions;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate with valid question id token" });
  }
};
module.exports = fetchquestion;
