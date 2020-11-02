const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the home route. Please enter localhost:9090/api/search/{params} to conduct a proper search.');
});

module.exports = router;
