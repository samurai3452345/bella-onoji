import React from 'react';
import Icon from '../Icon/Icon';
import styles from './ChoiceGroup.module.css';
import {joinClasses} from '../../utils/classNames';

export default function ChoiceGroup({title, name, options, value, onChange}) {
    return (
        <fieldset className={styles['choice-group']}>
            <legend>{title}</legend>
            <div className={styles['choice-card']}>
                {options.map((option) => (
                    <label className={styles['radio-option']} key={option.value}>
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                        />
                        {option.icon && (
                            <span
                                className={joinClasses(
                                    styles['payment-icon'],
                                    option.value === 'card' ? '' : styles[option.value],
                                )}
                            >
                <Icon name={option.icon} size={19}/>
              </span>
                        )}
                        <span>{option.label}</span>
                        {option.note && <small>{option.note}</small>}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
