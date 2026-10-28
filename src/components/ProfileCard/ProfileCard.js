import React from 'react';
import {asset} from '../../data/catalog';
import styles from './ProfileCard.module.css';
import {joinClasses} from '../../utils/classNames';

export default function ProfileCard({profile, compact = false}) {
    return (
        <div className={joinClasses(styles['profile-card'], compact ? styles['compact-profile'] : '')}>
            <img
                src={asset('profile-rectangle6.png')}
                alt={compact ? '' : 'Demo profile avatar'}
                width={compact ? 60 : 80}
                height={compact ? 60 : 90}
            />
            <div>
                <strong>{profile.name}</strong>
                <p>{profile.email}</p>
                {!compact && (
                    <>
                        <p>{profile.phone}</p>
                        <p>{profile.address}</p>
                    </>
                )}
            </div>
        </div>
    );
}
