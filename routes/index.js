const express = require('express');
const router = express.Router();

// Do work here
// req has the info; res has methods for sending data back
router.get('/', (req, res) => {
  console.log("\n========================================\nRequest made to '/'\n========================================\n");
  res.send('<h2 id="success">Hey! It works!</h2>');

  // Will echo all query params
  // res.json(req.query);
});

router.get('/reverse/:name', (req, res) => {
  const reversedName = [...req.params.name].reverse().join('');
  res.send(reversedName);
})

module.exports = router;
