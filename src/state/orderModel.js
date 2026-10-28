export const paymentOptions = [
    {
        value: 'card',
        label: 'Card',
        icon: 'card',
    },
    {
        value: 'bank',
        label: 'Bank account',
        icon: 'bank',
    },
    {
        value: 'paypal',
        label: 'PayPal',
        icon: 'paypal',
    },
];
export const initialProfile = {
    name: 'Marvis Ighedosa',
    email: 'marvis@example.com',
    phone: '+234 901 103 9271',
    address: 'No 15 Uti Street, Effurun, Delta State',
    region: 'Mainland',
};
export const isProfile = (value) =>
    value && ['name', 'email', 'phone', 'address'].every((key) => typeof value[key] === 'string')
        ? {
            ...initialProfile,
            ...value,
            region: value.region === 'Island' ? 'Island' : 'Mainland',
        }
        : initialProfile;
export const isOrders = (value) =>
    Array.isArray(value)
        ? value.filter(
            (order) =>
                order &&
                typeof order.id === 'string' &&
                Array.isArray(order.items) &&
                order.items.every(
                    (item) =>
                        item &&
                        typeof item.name === 'string' &&
                        Number.isSafeInteger(item.price) &&
                        Number.isSafeInteger(item.quantity),
                ) &&
                Number.isSafeInteger(order.total) &&
                Number.isSafeInteger(order.subtotal) &&
                Number.isSafeInteger(order.fee) &&
                typeof order.date === 'string',
        )
        : [];
