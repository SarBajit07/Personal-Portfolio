import express from 'express';
import nodemailer from 'nodemailer';
import { query } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST new message (public contact form submission)
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required fields' });
  }

  try {
    // 1. Store the message in the database
    const dbResult = await query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    // 2. Dispatch the notification email via Google SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Gmail requires sender to be auth user or alias
      to: process.env.RECEIVER_EMAIL,
      replyTo: email, // Set reply-to to the sender's actual email
      subject: `Portfolio Contact Form: Message from ${name}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
      `,
    };

    // Attempt to send email but don't crash if the user hasn't configured SMTP credentials yet
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'your_email@gmail.com') {
        await transporter.sendMail(mailOptions);
        console.log(`Email notification sent to ${process.env.RECEIVER_EMAIL}`);
      } else {
        console.warn('⚠️ SMTP settings not configured or using default template credentials. Email not sent, saved to database only.');
      }
    } catch (emailError) {
      console.error('Nodemailer Error:', emailError);
      // We will still succeed since it saved in the database, but warn the user in the response
      return res.status(201).json({
        message: 'Message saved to database, but email notification failed to send.',
        messageDetails: dbResult.rows[0],
        emailSent: false
      });
    }

    res.status(201).json({
      message: 'Message received and saved successfully!',
      messageDetails: dbResult.rows[0],
      emailSent: true
    });
  } catch (error) {
    console.error('Database/Server Error:', error);
    res.status(500).json({ message: 'Error processing your message' });
  }
});

// GET all contact messages (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Error fetching contact messages' });
  }
});

// DELETE contact message (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully', messageDetails: result.rows[0] });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
});

export default router;
