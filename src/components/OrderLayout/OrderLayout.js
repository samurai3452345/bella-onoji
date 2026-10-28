import React from 'react';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import AppDrawer from '../AppDrawer/AppDrawer';
import OrderHeader from '../OrderHeader/OrderHeader';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import Toast from '../Toast/Toast';
import OrderDialogs from '../OrderDialogs/OrderDialogs';
import {useOrder} from '../../state/OrderContext';
import styles from './OrderLayout.module.css';
import typographyStyles from '../../styles/typography.module.css';
import {joinClasses} from '../../utils/classNames';

export default function OrderLayout({children}) {
    const {
        drawer,
        setDrawer,
        session,
        setSession,
        navigate,
        notify,
        path,
        cartSaved,
        favoritesSaved,
        profileSaved,
        ordersSaved,
        paymentSaved,
        contentRef,
        isCatalogue,
        isDetail,
        isCheckout,
    } = useOrder();
    return (
        <div className={styles['ordering-site']}>
            <aside className={styles['order-desktop-intro']}>
                <a href="#/">
                    <Logo className={styles['brand-logo']}/>
                </a>
                <div>
                    <p className={joinClasses(styles['feature-label'], typographyStyles['feature-label'])}>
                        A little joy in every bite.
                    </p>
                    <h2>
                        Good food.
                        <br/>
                        Great mood.
                    </h2>
                    <p>
                        Your favourites, a few clicks away.
                        <br/>
                        Fresh ideas for your next meal.
                    </p>
                    <span className={styles['intro-divider']}/>
                    <a href="#/" className={joinClasses(styles['text-link'], typographyStyles['text-link'])}>
                        <Icon name="back" size={18}/> Back to the website
                    </a>
                </div>
                <span className={styles['intro-bottom']}>BELLA ONOJIE · FOOD FOR EVERYONE</span>
            </aside>
            <div className={joinClasses(styles['order-device'], drawer ? styles['drawer-open'] : '')}>
                <AppDrawer
                    open={drawer}
                    onClose={() => setDrawer(false)}
                    session={session}
                    onSignOut={() => {
                        setSession(false);
                        setDrawer(false);
                        navigate('/app/login');
                        notify(
                            session
                                ? 'You’ve left your demo session'
                                : 'Continue with a demo profile or explore as a guest',
                        );
                    }}
                    className={styles['app-drawer']}
                />
                <div className={styles['order-canvas']} inert={drawer ? true : undefined}>
                    <div className={styles['website-bar']}>
                        <a href="#/">
                            Website <Icon name="arrow" size={12}/>
                        </a>
                    </div>
                    {path === '/app/welcome' ||
                    ['/app/login', '/app/signup', '/app/reset-password'].includes(path) ? (
                        children
                    ) : (
                        <>
                            <OrderHeader/>
                            {(!cartSaved ||
                                !favoritesSaved ||
                                !profileSaved ||
                                !ordersSaved ||
                                !paymentSaved) && (
                                <p className={styles['storage-warning']}>
                                    Browser storage is unavailable. Changes will last for this visit only.
                                </p>
                            )}
                            <main
                                ref={contentRef}
                                tabIndex={-1}
                                className={joinClasses(
                                    styles['order-main'],
                                    isCatalogue ? styles['catalogue-page'] : '',
                                    isDetail ? styles['product-page'] : '',
                                    path === '/app/search' || path === '/app/favorites' ? styles['listing-page'] : '',
                                )}
                            >
                                {children}
                            </main>
                            {!isCheckout && !isDetail && path !== '/app/cart' && <BottomNavigation/>}
                        </>
                    )}
                </div>
            </div>

            <Toast/>
            <OrderDialogs/>
        </div>
    );
}
