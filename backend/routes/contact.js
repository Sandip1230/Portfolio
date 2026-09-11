const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
    const entry = await Contact.create({ name, email, message });
    res.status(201).json({ ok: true, id: entry._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;