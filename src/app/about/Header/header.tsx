'use client';

import { gsapHeader } from 'gsap/header/header';
import { useEffect } from 'react';
import Splitting from 'splitting';
import 'splitting/dist/splitting-cells.css';
import 'splitting/dist/splitting.css';
import EmojiHeader from '../../../components/EmojiHeader';
import './header.scss';

import react from 'assets/images/about/header/react.png';
import BadgeHeader from '../../../components/BadgeHeader';

const Header = () => {
  useEffect(() => {
    Splitting({
      by: 'chars',
    });
    gsapHeader();
  }, []);

  return (
    <section className="header">
      <div className="header__gradient header__gradient--1" />
      <div className="header__gradient header__gradient--2" />
      <div className="header__gradient header__gradient--3" />
      <div className="header__container">
        <div className="header__wrapper">
          <p className="header__headline" data-splitting>
            Front end
          </p>
          <div className="header__headline-gradient" />
        </div>
        <div className="header__wrapper">
          <p className="header__subhead" data-splitting>
            Web{' '}
            <span className="underline">
              <span className="underline__container underline__container--banner" />
              <span className="underline__word">developer</span>
            </span>
          </p>
        </div>
        <div className="header__wrapper header__wrapper--position">
          <div className="header__description">
            <BadgeHeader href="https://react.dev/" text="React" />
            <p>,</p>
            <BadgeHeader href="https://webflow.com/" text="Webflow" />
            <p>&</p>
            <BadgeHeader href="https://www.typescriptlang.org/" text="Typescript" />
          </div>
        </div>
        <div className="header__wrapper header__wrapper--emoji-right">
          <EmojiHeader name="right" image={react} />
        </div>
        <div className="header__wrapper header__wrapper--emoji-left">
          <EmojiHeader name="left" image={react} />
        </div>
      </div>
      <svg className="header__arrow" width="71" height="77" viewBox="0 0 71 77" fill="none">
        <g opacity="0.8">
          <path
            opacity="1"
            d="M70 1L40.5153 18.0926C37.4135 19.8907 33.5865 19.8907 30.4847 18.0926L1 1"
            stroke="#6363a8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.8"
            d="M70 29L40.5153 46.0926C37.4135 47.8907 33.5865 47.8907 30.4847 46.0926L1 29"
            stroke="#6363a8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.7"
            d="M70 57L40.5153 74.0926C37.4135 75.8907 33.5865 75.8907 30.4847 74.0926L1 57"
            stroke="#6363a8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </section>
  );
};

export default Header;
