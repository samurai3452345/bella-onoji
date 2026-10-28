import React from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ChoiceGroup from '../../components/ChoiceGroup/ChoiceGroup';
import ActionBar from '../../components/ActionBar/ActionBar';
import Button from '../../components/Button/Button';
import {useOrder} from '../../state/OrderContext';
import {paymentOptions} from '../../state/orderModel';
import typographyStyles from '../../styles/typography.module.css';

export default function PaymentPreferencesPage() {
    const {profile, checkout, choosePayment, notify, navigate} = useOrder();
    return (
        <>
            <h1 className={typographyStyles['page-title']}>Payment preferences</h1>
            <ProfileCard profile={profile} compact/>
            <ChoiceGroup
                title={'Payment method'}
                name={'preference'}
                options={paymentOptions}
                value={checkout.payment}
                onChange={choosePayment}
            />
            <p className={typographyStyles['fine-print']}>
                A demonstration preference only. No card or bank information is collected.
            </p>
            <ActionBar>
                <Button
                    onClick={() => {
                        notify('Payment preference updated for this visit');
                        navigate('/app/profile');
                    }}
                    variant="primary"
                >
                    Update
                </Button>
            </ActionBar>
        </>
    );
}
