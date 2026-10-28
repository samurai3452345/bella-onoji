import React from 'react';
import {money} from '../../data/catalog';
import Icon from '../../components/Icon/Icon';
import EmptyState from '../../components/EmptyState/EmptyState';
import {useOrder} from '../../state/OrderContext';
import styles from './Orders.module.css';
import typographyStyles from '../../styles/typography.module.css';

export default function OrdersPage() {
    const {orders, path, navigate} = useOrder();
    return orders.length ? (
        <>
            <h1 className={typographyStyles['page-title']}>
                {path.endsWith('history') ? 'Your history' : 'Your orders'}
            </h1>
            <div className={styles['order-list']}>
                {orders.map((item) => (
                    <a key={item.id} href={`#/app/orders/${item.id}`} className={styles['order-card']}>
            <span className={styles['order-icon']}>
              <Icon name="bag"/>
            </span>
                        <div>
                            <strong>{item.id}</strong>
                            <p>
                                {new Date(item.date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}{' '}
                                · {item.items.reduce((sum, row) => sum + row.quantity, 0)} items
                            </p>
                            <span className={styles['status-pill']}>Demo confirmed</span>
                        </div>
                        <strong>{money(item.total)}</strong>
                        <Icon name="chevron" size={16}/>
                    </a>
                ))}
            </div>
        </>
    ) : (
        <EmptyState
            icon={path.endsWith('history') ? 'history' : 'bag'}
            title={path.endsWith('history') ? 'No history yet' : 'No orders yet'}
            description="Hit the orange button below to create your first demonstration order."
            action="Start ordering"
            onAction={() => navigate('/app')}
        />
    );
}
