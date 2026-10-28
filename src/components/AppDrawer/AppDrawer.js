import React, {useEffect, useRef} from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './AppDrawer.module.css';
import {joinClasses} from '../../utils/classNames';

export default function AppDrawer({open, onClose, session, onSignOut, className = ''}) {
    const ref = useRef(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    useEffect(() => {
        if (!open) return;
        const previous = document.activeElement;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        ref.current?.querySelector('button')?.focus();
        const keydown = (event) => {
            if (event.key === 'Escape') closeRef.current();
            if (event.key === 'Tab') {
                const controls = [...ref.current.querySelectorAll('a[href],button')];
                const first = controls[0],
                    last = controls[controls.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', keydown);
        return () => {
            document.body.style.overflow = overflow;
            document.removeEventListener('keydown', keydown);
            previous?.focus();
        };
    }, [open]);
    return (
        <div
            ref={ref}
            className={joinClasses(styles['app-drawer'], open ? styles['open'] : '', className)}
            role={open ? 'dialog' : undefined}
            aria-modal={open ? 'true' : undefined}
            aria-label="Account navigation"
            aria-hidden={!open}
            inert={!open ? true : undefined}
        >
            <Button
                className={styles['drawer-close']}
                aria-label="Close navigation"
                onClick={onClose}
                variant="icon"
            >
                <Icon name="close"/>
            </Button>
            <nav className={styles['canvas-menu-links']} aria-label="Account menu">
                {[
                    ['user', 'Profile', '/app/profile'],
                    ['bag', 'Orders', '/app/orders'],
                    ['gift', 'Offer and promo', '/app/offers'],
                    ['shield', 'Privacy policy', '/app/privacy'],
                    ['shield', 'Security', '/app/security'],
                    ['help', 'Help', '/app/help'],
                ].map(([icon, label, target]) => (
                    <a key={target} href={`#${target}`} onClick={onClose}>
                        <Icon name={icon} size={20}/>
                        <span>{label}</span>
                    </a>
                ))}
            </nav>
            <a className={styles['canvas-welcome-link']} href="#/app/welcome" onClick={onClose}>
                Food for Everyone
            </a>
            <button className={styles['canvas-signout']} onClick={onSignOut}>
                {session ? 'Sign-out' : 'Login / Sign-up'}
                <Icon name="arrow" size={20}/>
            </button>
            <button className={styles['drawer-dismiss']} aria-label="Return to menu" onClick={onClose}/>
        </div>
    );
}
