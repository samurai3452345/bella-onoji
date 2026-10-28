import React from 'react';
import styles from './ActionBar.module.css';
import {joinClasses} from '../../utils/classNames';

export default function ActionBar({children, className = ''}) {
    return <div className={joinClasses(styles['bottom-action'], className)}>{children}</div>;
}
