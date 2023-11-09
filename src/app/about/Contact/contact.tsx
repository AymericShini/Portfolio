'use client';

import Image from 'next/image';
import './contact.scss';

import arrowUpRight from 'assets/images/about/contact/arrowUpRight.svg';
import github from 'assets/images/about/contact/github.svg';
import linkedin from 'assets/images/about/contact/linkedin.svg';
import logo from 'assets/images/logo.ico';

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__content">
        <div className="contact__wrapper">
          <div className="contact__left">
            <h1 className="contact__title">Contact me !</h1>
            <div className="contact__buttons">
              <div className="button">
                <a href="mailto:demange.aymeric@hotmail.com" className="contact__button">
                  <p>Send an email</p>
                  <Image src={arrowUpRight} alt="" />
                </a>
                <div className="cursor" />
              </div>
              <div className="button">
                <a
                  href={`${process.env.PUBLIC_URL}/downloads/mycv.pdf`}
                  download
                  className="contact__button"
                >
                  <p>Download my resume</p>
                  <Image src={arrowUpRight} alt="" />
                </a>
                <div className="cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact__bottom">
        <div className="contact__legend">
          <div className="contact__legend-logo">
            <a className="navbar__link navbar__link--name" href="/dashboard">
              <Image src={logo} width={50} height={50} alt="logo" className="navbar__link-logo" />
              <p className="navbar__name navbar__name--contact">Aymeric</p>
            </a>
          </div>
          <ul className="contact__legend-list">
            <li>
              <a
                href="https://github.com/AymericShini"
                target="_blank"
                rel="noreferrer"
                className="contact__legend-link"
              >
                <Image src={github} alt="github" />
              </a>
            </li>
            <li>
              <a
                href="http://linkedin.com/in/demange-aymeric/"
                target="_blank"
                rel="noreferrer"
                className="contact__legend-link"
              >
                <Image src={linkedin} alt="linkedin" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Contact;
