import React, {useState} from 'react';
import Icon from '../../components/Icon/Icon';
import Logo from '../../components/Logo/Logo';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import {useOrder} from '../../state/OrderContext';
import styles from './Auth.module.css';
import typographyStyles from '../../styles/typography.module.css';
import {joinClasses} from '../../utils/classNames';

export default function AuthPage() {
    const {path, onContinue, notify, navigate} = useOrder();
    const mode = path.split('/').pop();
    const signup = mode === 'signup',
        reset = mode === 'reset-password';
    const [resetDone, setResetDone] = useState(false);
    return (
        <div className={styles['auth-screen']}>
            <a href="#/app" className={styles['auth-back']}>
                <Icon name="back"/> Explore as a guest
            </a>
            <div className={styles['auth-top']}>
                <Logo className={styles['brand-logo']}/>
                <div className={styles['auth-tabs']}>
                    <a href="#/app/login" className={!signup && !reset ? styles['active'] : ''}>
                        Login
                    </a>
                    <a href="#/app/signup" className={signup ? styles['active'] : ''}>
                        Sign-up
                    </a>
                </div>
            </div>
            <form
                className={styles['auth-form']}
                onSubmit={(event) => {
                    event.preventDefault();
                    const values = new FormData(event.currentTarget);
                    if (reset) {
                        setResetDone(true);
                        return;
                    }
                    onContinue({
                        name: signup ? values.get('name').trim() : undefined,
                        email: values.get('email').trim(),
                    });
                    notify(
                        signup
                            ? 'Demo profile created. Welcome to Bella!'
                            : 'Welcome! You’re exploring in demo mode.',
                    );
                    navigate('/app');
                }}
            >
                <p className={joinClasses(styles['demo-label'], typographyStyles['demo-label'])}>
                    DEMO EXPERIENCE
                </p>
                {reset && <h1>Forgot your password?</h1>}
                {signup && (
                    <FormField
                        className={styles['form-field']}
                        label="Your name"
                        name="name"
                        autoComplete="name"
                        required
                        pattern=".*\S.*"
                        maxLength={80}
                    />
                )}
                <FormField
                    className={styles['form-field']}
                    label="Email address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    maxLength={120}
                />
                {!reset && (
                    <FormField
                        className={styles['form-field']}
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete={signup ? 'new-password' : 'current-password'}
                        placeholder="At least 6 characters"
                        minLength={6}
                        maxLength={100}
                        required
                    />
                )}
                {!reset && (
                    <a
                        href="#/app/reset-password"
                        className={joinClasses(typographyStyles['text-link'], styles['forgot-link'])}
                    >
                        Forgot passcode?
                    </a>
                )}
                {resetDone && (
                    <p className={styles['inline-notice']} role="status">
                        No email was sent. Password recovery requires a connected authentication service. You
                        can continue as a guest.
                    </p>
                )}
                <p className={joinClasses(styles['fine-print'], typographyStyles['fine-print'])}>
                    {reset
                        ? 'Recovery is a demonstration. No email service is connected.'
                        : 'This form demonstrates the design. No account is authenticated and your password is never saved.'}
                </p>
                <Button className={styles['primary-button']} type="submit" variant="primary">
                    {reset ? 'Preview recovery' : signup ? 'Create demo profile' : 'Continue in demo mode'}
                </Button>
            </form>
        </div>
    );
}
