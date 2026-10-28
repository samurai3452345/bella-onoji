import React from 'react';
import {asset} from '../../data/catalog';
import styles from './FoodImage.module.css';
import {joinClasses} from '../../utils/classNames';

export default function FoodImage({food, className = '', eager = false}) {
    if (food.image)
        return (
            <span className={joinClasses(styles['food-image'], className)}>
        <img src={asset(food.image)} alt={food.name} loading={eager ? 'eager' : 'lazy'}/>
      </span>
        );
    const symbols = {
        drink: '🍊',
        berry: '🫐',
        snack: '🍌',
        sauce: '🌶️',
    };
    return (
        <span
            role="img"
            aria-label={food.name}
            className={joinClasses(
                styles['food-illustration'],
                food.illustration === 'drink' ? '' : styles[food.illustration],
                className,
            )}
        >
      <span>{symbols[food.illustration]}</span>
    </span>
    );
}
