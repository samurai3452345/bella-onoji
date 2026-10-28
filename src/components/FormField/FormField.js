import React from 'react';
import styles from './FormField.module.css';
import {joinClasses} from '../../utils/classNames';

export default function FormField({label, className = '', ...props}) {
    return (
        <label className={joinClasses(styles['form-field'], className)}>
            <span>{label}</span>
            <input {...props} />
        </label>
    );
}
