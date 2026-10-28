import React from 'react';
import {asset} from '../../data/catalog';
import styles from './Icon.module.css';
import {joinClasses} from '../../utils/classNames';

const iconAssets = {
    menu: 'catalog-vector.svg',
    search: 'catalog-vector1.svg',
    home: 'catalog-group.svg',
    cart: 'catalog-shopping-cart.svg',
    user: 'catalog-user.svg',
    heart: 'catalog-heart.svg',
    history: 'catalog-ic-sharp-history.svg',
    back: 'detail-chevron-left.svg',
};
const paths = {
    close: 'M6 6l12 12M18 6L6 18',
    arrow: 'M5 12h14m-6-6 6 6-6 6',
    chevron: 'm9 5 7 7-7 7',
    trash: 'M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',
    check: 'm5 12 4 4L19 6',
    bag: 'M5 7h14l2 14H3L5 7Zm3 0V6a4 4 0 0 1 8 0v1',
    gift: 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8C5 8 4 2 8 3c3 0 4 5 4 5Zm0 0s1-5 4-5c4-1 3 5-4 5Z',
    shield: 'm12 2 8 3v6c0 6-8 11-8 11S4 17 4 11V5l8-3Zm-4 9 3 3 5-6',
    card: 'M3 5h18v14H3zM3 9h18M7 15h3',
    bank: 'm3 8 9-5 9 5H3Zm3 3v7m6-7v7m6-7v7M3 21h18',
    wifi: 'M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-10 4a5 5 0 0 1 6 0M12 20h.01M3 3l18 18',
    help: 'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
    logout: 'M9 3H4v18h5m4-15 6 6-6 6m-6-6h12',
    star: 'm12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z',
};
export default function Icon({name, size = 24, className = ''}) {
    if (name === 'paypal')
        return (
            <span
                className={joinClasses(styles['icon'], styles['paypal-mark'], className)}
                style={{
                    width: size,
                    height: size,
                }}
                aria-hidden="true"
            >
        P
      </span>
        );
    if (iconAssets[name])
        return (
            <img
                className={joinClasses(styles['icon'], className)}
                src={asset(iconAssets[name])}
                width={size}
                height={size}
                alt=""
                aria-hidden="true"
            />
        );
    return (
        <svg
            className={joinClasses(styles['icon'], className)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d={paths[name] || paths.help}/>
        </svg>
    );
}
