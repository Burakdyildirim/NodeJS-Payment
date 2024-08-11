const express = require("express"),
  crypto = require("crypto"),
  jwtHelper = require("./JWT/jwt-helper"),
  fs = require("fs"),
  router = express.Router();

const model = JSON.parse(fs.readFileSync("users.json"));

router.post("/", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var user = model.find((p) => p.username == username);

  if (!user) {
    res.status(404).send("Kullanıcı bulunamadı !");
    return;
  }

  var hashedPassword = hashPassword(username, password);
  if (hashedPassword != user.password) {
    res.status(400).send("Kullanıcı adı veya şifre hatalı!");
    return;
  }
  var token = jwtHelper.generateAccessToken(user);

  res.json({ access_token: token });
});

function hashPassword(username, password) {
  let hash = crypto.createHmac("sha512", username);
  hash.update(password);
  return hash.digest("hex");
}

module.exports = router;