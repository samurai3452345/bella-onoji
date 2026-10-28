import React from 'react';
import {asset, foods, money} from '../../data/catalog';
import FoodImage from '../../components/FoodImage/FoodImage';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import ActionBar from '../../components/ActionBar/ActionBar';
import EmptyState from '../../components/EmptyState/EmptyState';
import {useOrder} from '../../state/OrderContext';
import styles from './Cart.module.css';
import {joinClasses} from '../../utils/classNames';

export default function CartPage() {
    const {
        cart,
        activeSwipe,
        pointer,
        setActiveSwipe,
        updateQuantity,
        favorites,
        toggleFavorite,
        removeItem,
        sum,
        navigate,
    } = useOrder();
    return cart.length ? (
        <>
            <p className={styles['swipe-hint']}>
                <img src={asset('cart-iwwa-swipe.svg')} alt="" width="20" height="20"/> Swipe left on an
                item for more options
            </p>
            <div className={styles['cart-list']}>
                {cart.map((item) => {
                    const food = foods.find((food) => food.id === item.foodId);
                    return (
                        <div className={styles['cart-row-wrap']} key={item.foodId}>
                            <div
                                className={joinClasses(
                                    styles['cart-row'],
                                    activeSwipe === food.id ? styles['revealed'] : '',
                                )}
                                onPointerDown={(e) => {
                                    pointer.current = {
                                        x: e.clientX,
                                        y: e.clientY,
                                    };
                                }}
                                onPointerUp={(e) => {
                                    if (pointer.current && Math.abs(e.clientY - pointer.current.y) < 50) {
                                        if (e.clientX - pointer.current.x < -45) setActiveSwipe(food.id);
                                        if (e.clientX - pointer.current.x > 45) setActiveSwipe(null);
                                    }
                                    pointer.current = null;
                                }}
                            >
                                <a href={`#/app/foods/${food.id}`} className={styles['cart-photo']}>
                                    <FoodImage
                                        food={food}
                                        className={joinClasses(styles['food-image'], styles['food-illustration'])}
                                    />
                                </a>
                                <div className={styles['cart-row-info']}>
                                    <a href={`#/app/foods/${food.id}`}>
                                        <h2>{food.name}</h2>
                                    </a>
                                    <p>{money(food.price * item.quantity)}</p>
                                    <div className={styles['quantity-control']}>
                                        <button
                                            aria-label={`Decrease ${food.name}`}
                                            onClick={() => updateQuantity(food.id, -1)}
                                        >
                                            −
                                        </button>
                                        <span aria-live="polite">{item.quantity}</span>
                                        <button
                                            aria-label={`Increase ${food.name}`}
                                            onClick={() => updateQuantity(food.id, 1)}
                                            disabled={item.quantity >= 99}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <Button
                                    className={styles['cart-more']}
                                    aria-label={`Options for ${food.name}`}
                                    aria-expanded={activeSwipe === food.id}
                                    onClick={() => setActiveSwipe(activeSwipe === food.id ? null : food.id)}
                                    variant="icon"
                                >
                                    ···
                                </Button>
                            </div>
                            <div
                                className={joinClasses(
                                    styles['cart-row-actions'],
                                    activeSwipe === food.id ? styles['visible'] : '',
                                )}
                            >
                                <button
                                    aria-label={`Favourite ${food.name}`}
                                    aria-pressed={favorites.includes(food.id)}
                                    onClick={() => toggleFavorite(food.id)}
                                >
                                    <Icon name="heart" size={20}/>
                                </button>
                                <button aria-label={`Remove ${food.name}`} onClick={() => removeItem(food.id)}>
                                    <Icon name="trash" size={20}/>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles['cart-summary']}>
                <span>Subtotal</span>
                <strong>{money(sum)}</strong>
                <p>Delivery calculated at checkout</p>
            </div>
            <ActionBar>
                <Button onClick={() => navigate('/app/checkout/delivery')} variant="primary">
                    Complete order <Icon name="arrow" size={18}/>
                </Button>
            </ActionBar>
        </>
    ) : (
        <EmptyState
            title="Your cart is empty"
            description="Something delicious is waiting for you. Let’s find your next favourite."
            action="Explore the menu"
            onAction={() => navigate('/app')}
        />
    );
}
