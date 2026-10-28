import React from 'react';
import {OrderContext} from '../state/OrderContext';
import useOrderState from '../state/useOrderState';
import {useOrder} from '../state/OrderContext';
import OrderLayout from '../components/OrderLayout/OrderLayout';
import CataloguePage from '../pages/Catalogue/CataloguePage';
import SearchPage from '../pages/Search/SearchPage';
import ProductPage from '../pages/Product/ProductPage';
import CartPage from '../pages/Cart/CartPage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import FavouritesPage from '../pages/Favourites/FavouritesPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import PaymentPreferencesPage from '../pages/PaymentPreferences/PaymentPreferencesPage';
import OrdersPage from '../pages/Orders/OrdersPage';
import OrderDetailsPage from '../pages/OrderDetails/OrderDetailsPage';
import StatusPage from '../pages/Status/StatusPage';
import HelpPage from '../pages/Help/HelpPage';
import PrivacyPage from '../pages/Privacy/PrivacyPage';
import AuthPage from '../pages/Auth/AuthPage';
import WelcomePage from '../pages/Welcome/WelcomePage';

function CurrentPage() {
    const {path, isCatalogue, isDetail, selectedFood, isCheckout, order} = useOrder();
    if (path === '/app/welcome') return <WelcomePage/>;
    if (['/app/login', '/app/signup', '/app/reset-password'].includes(path))
        return <AuthPage key={path}/>;
    if (isCatalogue) return <CataloguePage/>;
    if (path === '/app/search') return <SearchPage/>;
    if (isDetail && selectedFood) return <ProductPage/>;
    if (path === '/app/cart') return <CartPage/>;
    if (isCheckout) return <CheckoutPage/>;
    if (path === '/app/favorites') return <FavouritesPage/>;
    if (path === '/app/profile') return <ProfilePage/>;
    if (path === '/app/profile/payment') return <PaymentPreferencesPage/>;
    if (path === '/app/orders' || path === '/app/history') return <OrdersPage/>;
    if (order) return <OrderDetailsPage/>;
    if (path === '/app/offers') return <StatusPage/>;
    if (path === '/app/reviews') return <StatusPage/>;
    if (path === '/app/offline') return <StatusPage/>;
    if (path === '/app/help' || path === '/app/faq') return <HelpPage/>;
    if (path === '/app/privacy' || path === '/app/security') return <PrivacyPage/>;
    return <StatusPage/>;
}

export default function OrderApp({route, navigate}) {
    const state = useOrderState(route, navigate);
    return (
        <OrderContext.Provider value={state}>
            <OrderLayout>
                <CurrentPage/>
            </OrderLayout>
        </OrderContext.Provider>
    );
}
