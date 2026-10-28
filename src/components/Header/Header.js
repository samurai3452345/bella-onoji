import React, {useState, useEffect, useRef} from 'react';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './Header.module.css';
import {joinClasses} from '../../utils/classNames';

export default function Header() {
    const headerRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        let frame;
        const update = () => {
            const header = headerRef.current;
            const offset = (header?.getBoundingClientRect().height || 112) + 48;
            let current = 'home';
            for (const id of ['product', 'faq', 'contact']) {
                if (document.getElementById(id)?.getBoundingClientRect().top <= offset) current = id;
            }
            if (
                window.scrollY > 0 &&
                window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8
            )
                current = 'contact';
            setActiveSection(current);
            setScrolled(window.scrollY > 12);
        };
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };
        const onHash = () => {
            setMenu(false);
            const id = window.location.hash.slice(1);
            if (['product', 'faq', 'contact', 'main'].includes(id))
                document.getElementById(id)?.scrollIntoView();
            update();
        };
        update();
        if (window.location.hash && window.location.hash !== '#/')
            frame = requestAnimationFrame(onHash);
        window.addEventListener('scroll', onScroll, {
            passive: true,
        });
        window.addEventListener('resize', onScroll);
        window.addEventListener('hashchange', onHash);
        const escape = (event) => {
            if (event.key === 'Escape') setMenu(false);
        };
        document.addEventListener('keydown', escape);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            window.removeEventListener('hashchange', onHash);
            document.removeEventListener('keydown', escape);
        };
    }, []);
    return (
        <header
            className={joinClasses(styles['site-header'], scrolled ? styles['scrolled'] : '')}
            ref={headerRef}
        >
            <a href="#/" aria-label="Bella Onojie home">
                <Logo className={styles['brand-logo']}/>
            </a>
            <nav
                id="site-navigation"
                className={menu ? joinClasses(styles['site-nav'], styles['open']) : styles['site-nav']}
                aria-label="Main navigation"
            >
                {[
                    ['home', '#/', 'Home'],
                    ['product', '#product', 'Product'],
                    ['faq', '#faq', 'Faq'],
                    ['contact', '#contact', 'Contact'],
                ].map(([id, href, label]) => (
                    <a
                        key={id}
                        href={href}
                        className={activeSection === id ? styles['active'] : ''}
                        aria-current={activeSection === id ? 'location' : undefined}
                        onClick={() => setMenu(false)}
                    >
                        {label}
                    </a>
                ))}
            </nav>
            <Button
                className={styles['mobile-menu-button']}
                aria-controls="site-navigation"
                aria-label={menu ? 'Close menu' : 'Open menu'}
                aria-expanded={menu}
                onClick={() => setMenu(!menu)}
                variant="icon"
            >
                <Icon name={menu ? 'close' : 'menu'}/>
            </Button>
        </header>
    );
}
