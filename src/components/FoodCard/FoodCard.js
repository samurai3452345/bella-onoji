import React from 'react';
import {money} from '../../data/catalog';
import FoodImage from '../FoodImage/FoodImage';
import styles from './FoodCard.module.css';
import {joinClasses} from '../../utils/classNames';

export default function FoodCard({food, className = '', imageClassName = ''}) {
    return (
        <article className={joinClasses(styles['food-card'], className)}>
            <a href={`#/app/foods/${food.id}`}>
                <FoodImage
                    food={food}
                    className={joinClasses(styles['food-image'], styles['food-illustration'], imageClassName)}
                />
                <h3>{food.name}</h3>
                <p>{money(food.price)}</p>
            </a>
        </article>
    );
}
