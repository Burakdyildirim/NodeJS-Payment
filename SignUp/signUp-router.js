const express = require("express"),
  crypto = require("crypto"),
  jwtHelper = require("../Login/JWT/jwt-helper"),
  fs = require("fs"),
  router = express.Router();


router.post("/", (req, res, next) => {
  const model = JSON.parse(fs.readFileSync("users.json"));
  const data = fs.readFileSync('users.json');
  const jsonData  = JSON.parse(data);
    var name = req.body.name;
    var surname = req.body.surname;
    var username = req.body.username;
    var password = req.body.password;
    jsonData.push({
      "name": name,
      "surname": surname,
      "username": username,
      "password":hashPassword(username,password)
    }); 
    var userCheck = model.find((p) => p.username == username);
    if(userCheck != null){
        res.status(400).send("Kullanıcı adı Kayıtlı!");
        return;
    }else{
    const newData = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync('users.json', newData);
    
    var user = jsonData.find((p) => p.username == username);
    var token = jwtHelper.generateAccessToken(user);

    res.json({ access_token: token });
    }
    
});

function hashPassword(username, password) {
    let hash = crypto.createHmac("sha512", username);
    hash.update(password);
    return hash.digest("hex");
}
module.exports = router;