import {createContext, useContext} from 'react';

export const OrderContext = createContext(null);

export function useOrder() {
    const value = useContext(OrderContext);
    if (!value) throw new Error('Order components must be rendered inside OrderContext');
    return value;
}
