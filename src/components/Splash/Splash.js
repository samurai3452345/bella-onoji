import React from 'react';
import {asset} from '../../data/catalog';
import Logo from '../Logo/Logo';
import styles from './Splash.module.css';

export default function Splash() {
    return (
        <main
            className={styles['splash-screen']}
            style={{
                '--splash-image': `url("${asset('splash-breakfast.png')}")`,
            }}
            role="status"
            aria-label="Loading Bella Onojie"
        >
            <div className={styles['splash-brand']}>
                <Logo/>
                <p>Food for Everyone</p>
                <span className={styles['loading-spinner']} aria-hidden="true"/>
            </div>
        </main>
    );
}
