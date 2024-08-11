const jwt = require("jsonwebtoken");
const token_secret =
  "457a19fb4cb2e03b1138db036f4aac9cf4701f62fac1fd9fd2bb74e0280bd302";

exports.generateAccessToken = (userInfo) => {
  return jwt.sign(userInfo, token_secret, { expiresIn: "1000s" });
};

exports.checkAuthenticate = (req, res, next) => {
  var header = req.headers.authorization;
  const token = header && header.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, token_secret, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};