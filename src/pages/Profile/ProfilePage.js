import React from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Icon from '../../components/Icon/Icon';
import ActionBar from '../../components/ActionBar/ActionBar';
import Button from '../../components/Button/Button';
import {useOrder} from '../../state/OrderContext';
import styles from './Profile.module.css';
import typographyStyles from '../../styles/typography.module.css';
import {joinClasses} from '../../utils/classNames';

export default function ProfilePage() {
    const {setModal, profile} = useOrder();
    return (
        <>
            <h1 className={typographyStyles['page-title']}>My profile</h1>
            <div className={typographyStyles['section-label']}>
                <h2>Personal details</h2>
                <button className={typographyStyles['text-link']} onClick={() => setModal('profile')}>
                    change
                </button>
            </div>
            <ProfileCard profile={profile}/>
            <div className={styles['profile-links']}>
                {[
                    ['Orders', 'orders'],
                    ['Payment preferences', 'profile/payment'],
                    ['Pending reviews', 'reviews'],
                    ['Faq', 'faq'],
                    ['Help', 'help'],
                ].map(([label, target]) => (
                    <a key={target} href={`#/app/${target}`}>
                        {label}
                        <Icon name="chevron" size={18}/>
                    </a>
                ))}
            </div>
            <p className={joinClasses(typographyStyles['fine-print'], styles['profile-note'])}>
                Your profile is a local demo. These details are not sent to a server.
            </p>
            <ActionBar>
                <Button onClick={() => setModal('profile')} variant="primary">
                    Update
                </Button>
            </ActionBar>
        </>
    );
}
