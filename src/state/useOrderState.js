import {useEffect, useRef, useState} from 'react';
import useStored from '../hooks/useStored';
import {initialProfile, isProfile, isOrders} from './orderModel';
import {normalizeCart, foods, subtotal, changeQuantity} from '../data/catalog';

export default function useOrderState(route, navigate) {
    const path = route.split('?')[0];
    const [cart, setCart, cartSaved] = useStored('cart', [], normalizeCart);
    const [favorites, setFavorites, favoritesSaved] = useStored('favorites', [], (value) =>
        Array.isArray(value) ? value.filter((id) => foods.some((food) => food.id === id)) : [],
    );
    const [profile, setProfile, profileSaved] = useStored('profile', initialProfile, isProfile);
    const [orders, setOrders, ordersSaved] = useStored('orders', [], isOrders);
    const [paymentPreference, setPaymentPreference, paymentSaved] = useStored(
        'payment',
        'card',
        (value) => (['card', 'bank', 'paypal'].includes(value) ? value : 'card'),
    );
    const [checkout, setCheckout] = useState({
        delivery: 'door',
        payment: paymentPreference,
    });
    const [category, setCategory] = useState('Foods');
    const [query, setQuery] = useState(() => new URLSearchParams(route.split('?')[1]).get('q') || '');
    const [drawer, setDrawer] = useState(false);
    const [modal, setModal] = useState(null);
    const [toast, setToast] = useState('');
    const [activeSwipe, setActiveSwipe] = useState(null);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const choosePayment = (payment) => {
        setPaymentPreference(payment);
        setCheckout((current) => ({
            ...current,
            payment,
        }));
    };
    const [session, setSession] = useState(false);
    const toastTimer = useRef(null),
        pointer = useRef(null),
        contentRef = useRef(null),
        placingOrder = useRef(false);
    const notify = (message) => {
        setToast(message);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(''), 3500);
    };
    useEffect(() => () => clearTimeout(toastTimer.current), []);
    useEffect(() => {
        setDrawer(false);
        setModal(null);
        setGalleryIndex(0);
        placingOrder.current = false;
        if (path !== '/app/search')
            contentRef.current?.focus({
                preventScroll: true,
            });
    }, [path]);
    useEffect(() => {
        if (path === '/app/search') setQuery(new URLSearchParams(route.split('?')[1]).get('q') || '');
    }, [route, path]);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const sum = subtotal(cart);
    const fee = checkout.delivery === 'pickup' ? 0 : profile.region === 'Island' ? 250000 : 150000;
    const total = sum + fee;
    const toggleFavorite = (id) =>
        setFavorites((current) =>
            current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
        );
    const addToCart = (id) => {
        setCart((current) => changeQuantity(current, id, 1));
        notify('Added to your cart');
    };
    const updateQuantity = (id, delta) => setCart((current) => changeQuantity(current, id, delta));
    const removeItem = (id) => {
        setCart((current) => current.filter((item) => item.foodId !== id));
        notify('Item removed from cart');
    };
    const search = (event) => {
        event.preventDefault();
        navigate(`/app/search?q=${encodeURIComponent(query.trim())}`);
    };
    const saveProfile = (draft) => {
        setProfile(draft);
        setModal(null);
        notify('Your demo details have been saved');
    };
    const placeOrder = () => {
        if (!cart.length || placingOrder.current) return;
        placingOrder.current = true;
        const order = {
            id: `BEL-${Date.now().toString(36).toUpperCase()}`,
            date: new Date().toISOString(),
            items: cart.map((item) => {
                const food = foods.find((food) => food.id === item.foodId);
                return {
                    foodId: food.id,
                    name: food.name,
                    image: food.image || null,
                    illustration: food.illustration || null,
                    price: food.price,
                    quantity: item.quantity,
                };
            }),
            subtotal: sum,
            fee,
            total,
            delivery: checkout.delivery,
            region: profile.region,
            address: profile.address,
            payment: checkout.payment,
            status: 'Demo confirmed',
        };
        setOrders((current) => [order, ...current]);
        setCart([]);
        setModal(null);
        navigate(`/app/orders/${order.id}?success=1`);
    };
    const titles = {
        '/app/cart': 'Cart',
        '/app/search': 'Search',
        '/app/profile': 'My profile',
        '/app/profile/payment': 'My profile',
        '/app/checkout/delivery': 'Checkout',
        '/app/checkout/payment': 'Checkout',
        '/app/orders': 'Orders',
        '/app/history': 'History',
        '/app/offers': 'My offers',
        '/app/favorites': 'Favourites',
        '/app/reviews': 'Pending reviews',
        '/app/help': 'Help',
        '/app/faq': 'Frequently asked questions',
        '/app/security': 'Security',
        '/app/privacy': 'Privacy policy',
        '/app/offline': 'Connection',
    };
    const isCatalogue = path === '/app',
        isDetail = path.startsWith('/app/foods/'),
        isCheckout = path.startsWith('/app/checkout/');
    const selectedFood = isDetail ? foods.find((food) => food.id === path.split('/').pop()) : null;
    const order = path.startsWith('/app/orders/')
        ? orders.find((order) => order.id === path.split('/').pop())
        : null;
    const goBack = () =>
        navigate(
            isDetail
                ? '/app'
                : path === '/app/checkout/payment'
                    ? '/app/checkout/delivery'
                    : path === '/app/checkout/delivery'
                        ? '/app/cart'
                        : path === '/app/profile/payment'
                            ? '/app/profile'
                            : '/app',
        );
    const onContinue = (details) => {
        setSession(true);
        setProfile((current) => ({
            ...current,
            ...(details.name
                ? {
                    name: details.name,
                }
                : {}),
            email: details.email,
        }));
    };
    return {
        path,
        cart,
        setCart,
        cartSaved,
        favorites,
        setFavorites,
        favoritesSaved,
        profile,
        setProfile,
        profileSaved,
        orders,
        setOrders,
        ordersSaved,
        setPaymentPreference,
        paymentSaved,
        checkout,
        setCheckout,
        category,
        setCategory,
        query,
        setQuery,
        drawer,
        setDrawer,
        modal,
        setModal,
        toast,
        activeSwipe,
        setActiveSwipe,
        galleryIndex,
        setGalleryIndex,
        choosePayment,
        session,
        setSession,
        pointer,
        contentRef,
        notify,
        count,
        sum,
        fee,
        total,
        toggleFavorite,
        addToCart,
        updateQuantity,
        removeItem,
        search,
        saveProfile,
        placeOrder,
        titles,
        isCatalogue,
        isDetail,
        isCheckout,
        selectedFood,
        order,
        goBack,
        route,
        navigate,
        onContinue,
    };
}
