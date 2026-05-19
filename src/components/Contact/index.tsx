import { FormEvent, useState } from 'react';
import styles from './Contact.module.scss';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
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
              <button type="submit" className={styles.btn}>Send message →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
