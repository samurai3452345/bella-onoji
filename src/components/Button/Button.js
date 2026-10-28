import React from 'react';
import styles from './Button.module.css';
import {joinClasses} from '../../utils/classNames';

export default function Button({
                                   as: Element = 'button',
                                   variant = 'primary',
                                   className,
                                   children,
                                   ...props
                               }) {
    return (
        <Element
            {...props}
            className={joinClasses(
                styles[
                    variant === 'icon'
                        ? 'icon-button'
                        : variant === 'subtle'
                            ? 'subtle-button'
                            : 'primary-button'
                    ],
                className,
            )}
        >
            {children}
        </Element>
    );
}
