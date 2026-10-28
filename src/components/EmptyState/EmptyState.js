import React from 'react';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import styles from './EmptyState.module.css';

export default function EmptyState({icon = 'bag', title, description, action, onAction}) {
    return (
        <div className={styles['empty-state']}>
            <Icon name={icon} size={112} className={styles['icon']}/>
            <h2>{title}</h2>
            <p>{description}</p>
            {action && (
                <Button className={styles['primary-button']} onClick={onAction} variant="primary">
                    {action}
                </Button>
            )}
        </div>
    );
}
