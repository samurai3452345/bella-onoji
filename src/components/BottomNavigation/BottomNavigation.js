import React from 'react';
import Icon from '../Icon/Icon';
import {useOrder} from '../../state/OrderContext';
import styles from './BottomNavigation.module.css';

export default function BottomNavigation() {
    const {path} = useOrder();
    return (
        <nav className={styles['bottom-nav']} aria-label="App navigation">
            {[
                ['home', '/app', 'Home'],
                ['heart', '/app/favorites', 'Favourites'],
                ['user', '/app/profile', 'Profile'],
                ['history', '/app/history', 'History'],
            ].map(([icon, target, label]) => (
                <a
                    key={target}
                    href={`#${target}`}
                    className={path === target ? styles['active'] : ''}
                    aria-label={label}
                    aria-current={path === target ? 'page' : undefined}
                >
                    <Icon name={icon} size={27} className={styles['icon']}/>
                    <span>{label}</span>
                </a>
            ))}
        </nav>
    );
}
