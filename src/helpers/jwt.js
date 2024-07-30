const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
class Token {
  generateToken(userId) {
    const token = jwt.sign(
      {
        id: userId,
      },
      secret
    );
    return token;
  }
}

module.exports = Token;
