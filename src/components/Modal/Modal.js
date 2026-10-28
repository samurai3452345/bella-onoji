import React, {useEffect, useRef} from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './Modal.module.css';
import {joinClasses} from '../../utils/classNames';

export default function Modal({title, children, onClose, className = '', compact = false}) {
    const ref = useRef(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    useEffect(() => {
        const previous = document.activeElement;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        ref.current?.focus();
        const key = (event) => {
            if (event.key === 'Escape') closeRef.current();
            if (event.key === 'Tab') {
                const elements = [...ref.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]',),].filter((el) => !el.disabled && el.getClientRects().length);
                const first = elements[0], last = elements[elements.length - 1];
                if (!first) {
                    event.preventDefault();
                    return;
                }
                if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', key);
        return () => {
            document.body.style.overflow = overflow;
            document.removeEventListener('keydown', key);
            previous?.focus();
        };
    }, []);
    return (<div
            className={styles['modal-backdrop']}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                className={joinClasses(styles['modal'], className)}
                ref={ref}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <div className={styles['modal-heading']}>
                    <h2>{title}</h2>
                    {!compact && (<Button
                            className={styles['icon-button']}
                            onClick={onClose}
                            aria-label="Close dialog"
                            variant="icon"
                        >
                            <Icon name="close"/>
                        </Button>)}
                </div>
                {children}
            </section>
        </div>);
}
