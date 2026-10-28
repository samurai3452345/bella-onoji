import React from 'react';
import EmptyState from '../../components/EmptyState/EmptyState';
import {useOrder} from '../../state/OrderContext';

export default function StatusPage() {
    const {path, navigate, notify} = useOrder();
    if (path === '/app/offers')
        return (
            <EmptyState
                icon="gift"
                title="Ohh snap! No offers yet"
                description="Bella doesn’t have any offers yet. Check back for something delicious."
                action="Explore the menu"
                onAction={() => navigate('/app')}
            />
        );
    else if (path === '/app/reviews')
        return (
            <EmptyState
                icon="star"
                title="All caught up"
                description="There are no reviews waiting for you. Demo orders don’t require a review."
                action="Back to profile"
                onAction={() => navigate('/app/profile')}
            />
        );
    else if (path === '/app/offline')
        return (
            <EmptyState
                icon="wifi"
                title="No internet connection"
                description="Check your connection and try again. The local demo menu can still be explored."
                action="Try again"
                onAction={() => {
                    navigate('/app');
                    notify(
                        navigator.onLine
                            ? 'You’re online. Welcome back!'
                            : 'You’re offline. Showing the local demo menu.',
                    );
                }}
            />
        );
    else
        return (
            <EmptyState
                icon="search"
                title="This page isn’t on the menu"
                description="Let’s get you back to something delicious."
                action="Explore the menu"
                onAction={() => navigate('/app')}
            />
        );
}
