import React from 'react';
import {foods} from '../../data/catalog';
import FoodGrid from '../../components/FoodGrid/FoodGrid';
import EmptyState from '../../components/EmptyState/EmptyState';
import {useOrder} from '../../state/OrderContext';
import styles from './Favourites.module.css';
import typographyStyles from '../../styles/typography.module.css';
import {joinClasses} from '../../utils/classNames';

export default function FavouritesPage() {
    const {favorites, navigate} = useOrder();
    return favorites.length ? (
        <>
            <h1 className={joinClasses(styles['page-title'], typographyStyles['page-title'])}>
                Your favourites
            </h1>
            <FoodGrid foods={foods.filter((food) => favorites.includes(food.id))}/>
        </>
    ) : (
        <EmptyState
            icon="heart"
            title="A little love goes a long way"
            description="Tap the heart on a meal to save it here for later."
            action="Find a favourite"
            onAction={() => navigate('/app')}
        />
    );
}
