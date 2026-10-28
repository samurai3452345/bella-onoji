import React from 'react';
import {asset} from '../../data/catalog';
import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

export default function Footer({onSocial}) {
    return (
        <footer className={styles['site-footer']} id="contact">
            <a href="#/" aria-label="Back to top">
                <Logo className={styles['brand-logo']}/>
            </a>
            <nav className={styles['social-links']} aria-label="Social media">
                {[
                    ['Twitter', 'desktop-ant-design-twitter-outlined.svg', ''],
                    ['Facebook', 'desktop-ant-design-facebook-filled.svg', ''],
                    ['Instagram', 'desktop-instagram.svg', 'desktop-social'],
                    ['LinkedIn', 'mobile-ant-design-linkedin-filled.svg', 'mobile-social'],
                ].map(([name, file, className]) => (
                    <button
                        key={name}
                        className={styles[className]}
                        aria-label={name}
                        onClick={() => onSocial(name)}
                    >
                        <img
                            src={asset(file)}
                            alt=""
                            width={name === 'Instagram' ? 39 : 41}
                            height={name === 'Instagram' ? 39 : 41}
                        />
                    </button>
                ))}
            </nav>
            <p className={styles['copyright']}>Copyright 2020 Bella Onojie.com</p>
        </footer>
    );
}
