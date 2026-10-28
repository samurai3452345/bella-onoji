import React from 'react';
import styles from './HelpContent.module.css';
import {joinClasses} from '../../utils/classNames';

export default function HelpContent({children, className = ''}) {
    return <div className={joinClasses(styles['help-content'], className)}>{children}</div>;
}
