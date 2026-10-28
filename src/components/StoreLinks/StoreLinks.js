import React from 'react';
import styles from './StoreLinks.module.css';
import {joinClasses} from '../../utils/classNames';

export default function StoreLinks({compact = false, onStore}) {
    return (
        <div className={joinClasses(styles['store-links'], compact ? styles['compact'] : '')}>
            <button
                className={joinClasses(styles['store-button'], styles['filled'])}
                onClick={() => onStore('Play Store')}
            >
                Playstore
            </button>
            <button
                className={joinClasses(styles['store-button'], styles['outlined'])}
                onClick={() => onStore('App Store')}
            >
                App store
            </button>
        </div>
    );
}
