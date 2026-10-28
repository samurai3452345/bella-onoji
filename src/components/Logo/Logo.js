import React from 'react';
import {asset} from '../../data/catalog';
import styles from './Logo.module.css';
import {joinClasses} from '../../utils/classNames';

export default function Logo({className = ''}) {
    return (
        <span className={joinClasses(styles['brand-logo'], className)}>
      <img src={asset('desktop-bella-olonje-logo1111.png')} alt="Bella Onojie"/>
    </span>
    );
}
