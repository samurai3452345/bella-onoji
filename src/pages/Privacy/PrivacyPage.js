import React from 'react';
import HelpContent from '../../components/HelpContent/HelpContent';
import Button from '../../components/Button/Button';
import {useOrder} from '../../state/OrderContext';
import typographyStyles from '../../styles/typography.module.css';
import helpContentStyles from '../../components/HelpContent/HelpContent.module.css';
import {joinClasses} from '../../utils/classNames';

export default function PrivacyPage() {
    const {path, setModal} = useOrder();
    return (
        <HelpContent>
            <p className={joinClasses(typographyStyles['demo-label'], helpContentStyles['demo-label'])}>
                YOUR BROWSER, YOUR DATA
            </p>
            <h1 className={joinClasses(typographyStyles['page-title'], helpContentStyles['page-title'])}>
                {path.endsWith('security') ? 'A simple, local demo.' : 'Privacy in this demo.'}
            </h1>
            <p>
                This prototype stores your cart, favourites, demo profile and demo order history in local
                storage on this device. There is no backend, analytics service, real sign-in or payment
                processing.
            </p>
            <p>
                Don’t enter sensitive information. Login passwords are used only for form validation and are
                never stored or sent. Demo data remains in this browser until you clear it.
            </p>
            <Button
                className={helpContentStyles['primary-button']}
                onClick={() => setModal('clear')}
                variant="primary"
            >
                Clear my demo data
            </Button>
            <Button href="#/app/profile" variant="subtle" as="a">
                Back to profile
            </Button>
        </HelpContent>
    );
}
