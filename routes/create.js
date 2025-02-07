const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  console.log('/create triggered')

  res.render('create');
});

router.post('/create:id', (req, res) => {

  console.log('id reoute connected');

  res.redirect('/create')
})
module.exports = router;
