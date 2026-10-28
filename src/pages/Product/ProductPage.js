import React from 'react';
import {money} from '../../data/catalog';
import FoodImage from '../../components/FoodImage/FoodImage';
import ActionBar from '../../components/ActionBar/ActionBar';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import {useOrder} from '../../state/OrderContext';
import styles from './Product.module.css';
import {joinClasses} from '../../utils/classNames';

export default function ProductPage() {
    const {pointer, setGalleryIndex, selectedFood, galleryIndex, addToCart, count} = useOrder();
    return (
        <>
            <div
                className={styles['product-visual']}
                onTouchStart={(event) => {
                    pointer.current = {
                        x: event.touches[0].clientX,
                    };
                }}
                onTouchEnd={(event) => {
                    const delta = event.changedTouches[0].clientX - (pointer.current?.x || 0);
                    if (Math.abs(delta) > 40)
                        setGalleryIndex((current) => (current + (delta < 0 ? 1 : 3)) % 4);
                    pointer.current = null;
                }}
            >
                <FoodImage
                    food={selectedFood}
                    eager
                    className={joinClasses(
                        styles['product-photo'],
                        galleryIndex ? styles[`view-${galleryIndex}`] : '',
                        styles['food-image'],
                        styles['food-illustration'],
                    )}
                />
                <div
                    className={styles['gallery-dots']}
                    role="group"
                    aria-label="Product image view"
                    onKeyDown={(event) => {
                        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                            event.preventDefault();
                            const next = (galleryIndex + (event.key === 'ArrowRight' ? 1 : 3)) % 4;
                            setGalleryIndex(next);
                            event.currentTarget.querySelectorAll('button')[next]?.focus();
                        }
                    }}
                >
                    {['Full view', 'Closer view', 'Left detail', 'Right detail'].map((label, index) => (
                        <button
                            aria-label={label}
                            aria-pressed={index === galleryIndex}
                            key={label}
                            className={index === galleryIndex ? styles['active'] : ''}
                            onClick={() => setGalleryIndex(index)}
                        />
                    ))}
                </div>
            </div>
            <h1 className={styles['product-title']}>{selectedFood.name}</h1>
            <p className={styles['product-price']}>{money(selectedFood.price)}</p>
            <div className={styles['product-copy']}>
                <p>{selectedFood.description}</p>
                <h2>Delivery info</h2>
                <p>
                    Choose door delivery or pick-up at checkout. Demo delivery is available for Mainland and
                    Island regions.
                </p>
                <h2>Return policy</h2>
                <p>
                    Meals are prepared with care. This is a demonstration menu; no food is delivered and no
                    payment is collected.
                </p>
            </div>
            <ActionBar>
                <Button onClick={() => addToCart(selectedFood.id)} variant="primary">
                    Add to cart <span>{count > 0 ? `(${count})` : ''}</span>
                </Button>
                <a className={styles['view-cart-link']} href="#/app/cart">
                    View cart <Icon name="arrow" size={16}/>
                </a>
            </ActionBar>
        </>
    );
}
