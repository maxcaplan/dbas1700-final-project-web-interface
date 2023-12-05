const express = require("express");
const router = express.Router();

// MIDDLEWARE

// Make sure there is an active databse connection
router.use((req, res, next) => {
  if (!req.app.locals.db || !req.app.locals.db.connected) {
    res.status(500)
    throw new Error("DATABASE CONNECTION ERROR")
  }

  next()
})

router.get("/", (req, res) => {
  console.log(req.hostname);
  console.log(req.app.locals.db)
  res.send("Hello World!");
});

module.exports = router