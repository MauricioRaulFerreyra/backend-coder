const express = require("express");
const { reset } = require("nodemon");
const session = require('express-session');

const app = express();
const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
  req.session.destroy((err =>{
    if (err) console.log("Error ")
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8080");
    res.end()
  }))
});


module.exports = router;
