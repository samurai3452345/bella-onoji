import React from 'react';
import {money} from '../../data/catalog';
import EmptyState from '../../components/EmptyState/EmptyState';
import ChoiceGroup from '../../components/ChoiceGroup/ChoiceGroup';
import ActionBar from '../../components/ActionBar/ActionBar';
import Button from '../../components/Button/Button';
import {useOrder} from '../../state/OrderContext';
import {paymentOptions} from '../../state/orderModel';
import styles from './Checkout.module.css';
import typographyStyles from '../../styles/typography.module.css';
import {joinClasses} from '../../utils/classNames';

export default function CheckoutPage() {
    const {
        cart,
        navigate,
        path,
        setModal,
        profile,
        checkout,
        choosePayment,
        setCheckout,
        sum,
        fee,
        total,
    } = useOrder();
    return !cart.length ? (
        <EmptyState
            title="Your cart is empty"
            description="Add a meal before checking out."
            action="Explore the menu"
            onAction={() => navigate('/app')}
        />
    ) : (
        <>
            <h1 className={typographyStyles['page-title']}>
                {path.endsWith('delivery') ? 'Delivery' : 'Payment'}
            </h1>
            {path.endsWith('delivery') ? (
                <>
                    <div className={typographyStyles['section-label']}>
                        <h2>Address details</h2>
                        <button className={typographyStyles['text-link']} onClick={() => setModal('address')}>
                            change
                        </button>
                    </div>
                    <div className={styles['address-card']}>
                        <strong>{profile.name}</strong>
                        <p>{profile.address}</p>
                        <p>{profile.phone}</p>
                        <span className={styles['region-tag']}>{profile.region}</span>
                    </div>
                </>
            ) : (
                <>
                    <ChoiceGroup
                        title={'Payment method'}
                        name={'payment'}
                        options={paymentOptions}
                        value={checkout.payment}
                        onChange={choosePayment}
                    />
                    <p className={joinClasses(typographyStyles['fine-print'], styles['payment-notice'])}>
                        Demo checkout — no payment details required.
                    </p>
                </>
            )}
            <ChoiceGroup
                title={'Delivery method'}
                name={'delivery'}
                options={[
                    {
                        value: 'door',
                        label: 'Door delivery',
                        note: money(profile.region === 'Island' ? 250000 : 150000),
                    },
                    {
                        value: 'pickup',
                        label: 'Pick up',
                        note: 'Free',
                    },
                ]}
                value={checkout.delivery}
                onChange={(delivery) =>
                    setCheckout({
                        ...checkout,
                        delivery,
                    })
                }
            />
            <div className={styles['checkout-totals']}>
                <p>
                    <span>Meals</span>
                    <span>{money(sum)}</span>
                </p>
                <p>
                    <span>Delivery</span>
                    <span>{money(fee)}</span>
                </p>
                <p className={styles['total']}>
                    <span>Total</span>
                    <strong>{money(total)}</strong>
                </p>
            </div>
            <ActionBar>
                <Button
                    onClick={() =>
                        path.endsWith('delivery') ? navigate('/app/checkout/payment') : setModal('fees')
                    }
                    variant="primary"
                >
                    {path.endsWith('delivery') ? 'Proceed to payment' : 'Review demo order'}
                </Button>
            </ActionBar>
        </>
    );
}
