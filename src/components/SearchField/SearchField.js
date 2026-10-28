import React from 'react';
import Icon from '../Icon/Icon';
import styles from './SearchField.module.css';
import {joinClasses} from '../../utils/classNames';

export default function SearchField({value, onChange, onSubmit, className = ''}) {
    return (
        <form
            onSubmit={onSubmit}
            className={joinClasses(styles['food-search'], className)}
            role="search"
        >
            <Icon name="search" size={20}/>
            <input
                aria-label="Search meals"
                placeholder="Search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button type="submit" aria-label="Submit search">
                <Icon name="arrow" size={19}/>
            </button>
        </form>
    );
}
