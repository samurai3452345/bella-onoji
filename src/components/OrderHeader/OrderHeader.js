import React from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import {useOrder} from '../../state/OrderContext';
import styles from './OrderHeader.module.css';
import {joinClasses} from '../../utils/classNames';

export default function OrderHeader() {
    const {
        isCatalogue,
        setDrawer,
        goBack,
        isDetail,
        order,
        titles,
        path,
        selectedFood,
        favorites,
        toggleFavorite,
        count,
    } = useOrder();
    return (
        <header className={styles['order-header']}>
            {isCatalogue ? (
                <Button onClick={() => setDrawer(true)} aria-label="Open navigation" variant="icon">
                    <Icon name="menu" size={24} className={styles['icon']}/>
                </Button>
            ) : (
                <Button onClick={goBack} aria-label="Go back" variant="icon">
                    <Icon name="back" size={24} className={styles['icon']}/>
                </Button>
            )}
            <span>
        {isCatalogue
            ? ''
            : isDetail
                ? ''
                : order
                    ? 'Order details'
                    : titles[path] || 'Bella Onojie'}
      </span>
            {isDetail && selectedFood ? (
                <Button
                    className={joinClasses(
                        styles['favorite-button'],
                        favorites.includes(selectedFood.id) ? styles['selected'] : '',
                    )}
                    aria-label={
                        favorites.includes(selectedFood.id) ? 'Remove from favourites' : 'Add to favourites'
                    }
                    aria-pressed={favorites.includes(selectedFood.id)}
                    onClick={() => toggleFavorite(selectedFood.id)}
                    variant="icon"
                >
                    <Icon name="heart" className={styles['icon']}/>
                </Button>
            ) : (
                <Button
                    href="#/app/cart"
                    className={styles['cart-link']}
                    aria-label={`Cart, ${count} items`}
                    variant="icon"
                    as="a"
                >
                    <Icon name="cart" className={styles['icon']}/>
                    {count > 0 && <span className={styles['cart-badge']}>{count}</span>}
                </Button>
            )}
        </header>
    );
}
