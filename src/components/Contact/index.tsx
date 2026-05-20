import { FormEvent, useState } from 'react';
import styles from './Contact.module.scss';

function LinkedInIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('server error');
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again or reach me on LinkedIn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.glow} aria-hidden="true" />
          <h2 className={styles.heading}>
            Got a project<br />in mind?{' '}
            <span className={styles.headingGrad}>Let&apos;s talk.</span>
          </h2>
          <p className={styles.sub}>
            Available for freelance projects, full-time roles, and anything interesting in
            between. Drop me a line and I&apos;ll get back to you quickly.
          </p>

          {sent ? (
            <p className={styles.thanks}>Message sent — I&apos;ll be in touch soon!</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="ct-name">Name</label>
                <input id="ct-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-email">Email</label>
                <input id="ct-email" name="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-subject">Subject</label>
                <input id="ct-subject" name="subject" type="text" placeholder="What's this about?" />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-message">Message</label>
                <textarea id="ct-message" name="message" placeholder="Tell me about your project..." required />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? 'Sending…' : 'Send message →'}
              </button>
            </form>
          )}
        </div>

        <div className={styles.linkedin}>
          <span className={styles.linkedinCatch}>Looking for a frontend engineer?</span>
          <a
            href="https://www.linkedin.com/in/demange-aymeric/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedinBtn}
          >
            <LinkedInIcon />
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
