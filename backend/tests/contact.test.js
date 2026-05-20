jest.mock('nodemailer', () => ({
  createTransport: () => ({ sendMail: jest.fn().mockResolvedValue({}) }),
}));

process.env.GMAIL_USER = 'test@gmail.com';
process.env.GMAIL_APP_PASSWORD = 'test-password';
process.env.CONTACT_RECIPIENT = 'recipient@gmail.com';

const request = require('supertest');
const app = require('../src/app');

describe('POST /api/contact', () => {
  it('returns 200 for valid input', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Alice', email: 'alice@example.com', message: 'Hello!' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ email: 'alice@example.com', message: 'Hello!' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Alice', email: 'not-an-email', message: 'Hello!' });
    expect(res.status).toBe(400);
  });

  it('returns 400 when message is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.status).toBe(400);
  });
});
