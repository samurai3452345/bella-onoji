import React from 'react';
import FoodCard from '../FoodCard/FoodCard';
import styles from './FoodGrid.module.css';
import {joinClasses} from '../../utils/classNames';

export default function FoodGrid({foods}) {
    return (
        <div className={styles['food-grid']}>
            {foods.map((food) => (
                <FoodCard
                    key={food.id}
                    food={food}
                    className={styles['food-card']}
                    imageClassName={joinClasses(styles['food-image'], styles['food-illustration'])}
                />
            ))}
        </div>
    );
}
