import React from 'react';
import {initialProfile} from '../../state/orderModel';
import {money} from '../../data/catalog';
import Modal from '../Modal/Modal';
import ProfileForm from '../ProfileForm/ProfileForm';
import Button from '../Button/Button';
import {useOrder} from '../../state/OrderContext';
import typographyStyles from '../../styles/typography.module.css';
import modalStyles from '../Modal/Modal.module.css';
import {joinClasses} from '../../utils/classNames';

export default function OrderDialogs() {
    const {
        modal,
        setModal,
        profile,
        saveProfile,
        fee,
        total,
        placeOrder,
        setCart,
        setFavorites,
        setOrders,
        setProfile,
        setPaymentPreference,
        setCheckout,
        setSession,
        notify,
        navigate,
    } = useOrder();
    return (
        <>
            {(modal === 'address' || modal === 'profile') && (
                <Modal
                    title={modal === 'address' ? 'Delivery details' : 'Personal details'}
                    onClose={() => setModal(null)}
                >
                    <ProfileForm value={profile} addressOnly={modal === 'address'} onSave={saveProfile}/>
                </Modal>
            )}
            {modal === 'fees' && (
                <Modal
                    title="Please note"
                    onClose={() => setModal(null)}
                    className={modalStyles['fees-modal']}
                    compact
                >
                    <div className={modalStyles['fee-table']}>
                        <p>
                            <span>DELIVERY TO MAINLAND</span>
                            <strong>{money(100000)} – {money(200000)}</strong>
                        </p>
                        <p>
                            <span>DELIVERY TO ISLAND</span>
                            <strong>{money(200000)} – {money(300000)}</strong>
                        </p>
                    </div>
                    <p className={modalStyles['fee-explanation']}>
                        Your demo delivery: <strong>{money(fee)}</strong>
                        <br/>
                        Order total: <strong>{money(total)}</strong>
                    </p>
                    <p className={joinClasses(typographyStyles['fine-print'], modalStyles['fine-print'])}>
                        This confirms a demo order only. You won’t be charged.
                    </p>
                    <div className={modalStyles['dialog-actions']}>
                        <Button
                            className={modalStyles['subtle-button']}
                            onClick={() => setModal(null)}
                            variant="subtle"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={modalStyles['primary-button']}
                            onClick={placeOrder}
                            variant="primary"
                        >
                            Proceed
                        </Button>
                    </div>
                </Modal>
            )}
            {modal === 'clear' && (
                <Modal title="Clear demo data?" onClose={() => setModal(null)}>
                    <p className={modalStyles['modal-description']}>
                        This removes your basket, favourites, saved profile and demo orders from this browser.
                    </p>
                    <div className={modalStyles['dialog-actions']}>
                        <Button
                            className={modalStyles['subtle-button']}
                            onClick={() => setModal(null)}
                            variant="subtle"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={modalStyles['primary-button']}
                            onClick={() => {
                                setCart([]);
                                setFavorites([]);
                                setOrders([]);
                                setProfile(initialProfile);
                                setPaymentPreference('card');
                                setCheckout({
                                    delivery: 'door',
                                    payment: 'card',
                                });
                                setSession(false);
                                setModal(null);
                                notify('Demo data cleared');
                                navigate('/app');
                            }}
                            variant="primary"
                        >
                            Clear data
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
}
