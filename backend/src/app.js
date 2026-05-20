const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');

const app = express();
app.use(express.json());

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  subject: z.string().max(300).optional().default(''),
  message: z.string().min(1).max(2000),
});

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/contact', limiter, async (req, res) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const { name, email, subject, message } = result.data;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = app;
