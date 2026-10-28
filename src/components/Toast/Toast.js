import React from 'react';
import Icon from '../Icon/Icon';
import {useOrder} from '../../state/OrderContext';
import styles from './Toast.module.css';
import {joinClasses} from '../../utils/classNames';

export default function Toast() {
    const {toast} = useOrder();
    return (
        <div
            className={joinClasses(styles['toast'], toast ? styles['visible'] : '')}
            role="status"
            aria-live="polite"
        >
            {toast && (
                <>
                    <Icon name="check" size={18}/>
                    {toast}
                </>
            )}
        </div>
    );
}
