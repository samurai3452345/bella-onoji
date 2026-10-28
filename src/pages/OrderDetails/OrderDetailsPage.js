import React from 'react';
import {money} from '../../data/catalog';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import {useOrder} from '../../state/OrderContext';
import styles from './OrderDetails.module.css';
import typographyStyles from '../../styles/typography.module.css';
import {joinClasses} from '../../utils/classNames';

export default function OrderDetailsPage() {
    const {route, order, navigate} = useOrder();
    return (
        <>
            <div className={styles['order-success']}>
        <span>
          <Icon name="check" size={36}/>
        </span>
                <h1>{route.includes('success=1') ? 'That’s a delicious choice!' : 'Your demo order'}</h1>
                <p>Demo order confirmed. No payment was collected and no delivery will be made.</p>
            </div>
            <div className={styles['order-detail']}>
        <span className={joinClasses(styles['demo-label'], typographyStyles['demo-label'])}>
          {order.id}
        </span>
                {order.items.map((item, index) => (
                    <div className={styles['order-line']} key={index}>
            <span>
              {item.quantity} × {item.name}
            </span>
                        <strong>{money(item.quantity * item.price)}</strong>
                    </div>
                ))}
                <div className={styles['order-line']}>
                    <span>Delivery · {order.delivery === 'pickup' ? 'Pick up' : order.region}</span>
                    <span>{money(order.fee)}</span>
                </div>
                <div className={joinClasses(styles['order-line'], styles['order-total'])}>
                    <strong>Total</strong>
                    <strong>{money(order.total)}</strong>
                </div>
                <p>{order.delivery === 'pickup' ? 'Pick-up selected' : order.address}</p>
            </div>
            <Button onClick={() => navigate('/app')} variant="primary">
                Back to the menu
            </Button>
            <Button href="#/app/orders" variant="subtle" as="a">
                View all demo orders
            </Button>
        </>
    );
}
