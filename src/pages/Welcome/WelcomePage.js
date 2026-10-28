import React from 'react';
import {asset} from '../../data/catalog';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import {useOrder} from '../../state/OrderContext';
import styles from './Welcome.module.css';

export default function WelcomePage() {
    const {navigate} = useOrder();
    return (
        <section className={styles['welcome-screen']}>
            <a href="#/" className={styles['welcome-logo']} aria-label="Back to website">
                <Logo className={styles['brand-logo']}/>
            </a>
            <h1>
                Food for
                <br/>
                Everyone
            </h1>
            <div className={styles['welcome-characters']} aria-hidden="true">
                <img
                    className={styles['character-one']}
                    src={asset('onboarding-toy-faces-tansparent-bg49.png')}
                    alt=""
                />
                <img
                    className={styles['character-two']}
                    src={asset('onboarding-toy-faces-tansparent-bg29.png')}
                    alt=""
                />
            </div>
            <div className={styles['welcome-actions']}>
                <Button
                    className={styles['primary-button']}
                    onClick={() => navigate('/app/login')}
                    variant="primary"
                >
                    Get started
                </Button>
                <a href="#/app">
                    Explore the menu as a guest <Icon name="arrow" size={16}/>
                </a>
            </div>
        </section>
    );
}
