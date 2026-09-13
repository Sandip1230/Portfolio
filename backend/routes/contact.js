const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

function checkAdmin(req, res, next) {
  if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
    const entry = await Contact.create({ name, email, message });
    transporter.sendMail({
      from: process.env.EMAIL_USER, to: process.env.EMAIL_USER, replyTo: email,
      subject: `Portfolio contact: ${name}`, text: `From: ${name} (${email})\n\n${message}`,
    }).catch(err => console.error('Email send failed:', err.message));
    res.status(201).json({ ok: true, id: entry._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', checkAdmin, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.patch('/:id/read', checkAdmin, async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ ok: true });
});

router.delete('/:id', checkAdmin, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;