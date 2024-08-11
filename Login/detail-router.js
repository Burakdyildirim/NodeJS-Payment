const { checkAuthenticate } = require("./JWT/jwt-helper");
const express = require("express"),
  router = express.Router();

router.get("/user", checkAuthenticate, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;