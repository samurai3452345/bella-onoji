import React from 'react';
import {filterFoods} from '../../data/catalog';
import SearchField from '../../components/SearchField/SearchField';
import FoodGrid from '../../components/FoodGrid/FoodGrid';
import EmptyState from '../../components/EmptyState/EmptyState';
import {useOrder} from '../../state/OrderContext';
import styles from './Search.module.css';

export default function SearchPage() {
    const {query, setQuery, search, navigate} = useOrder();
    const result = filterFoods(null, query);
    return (
        <>
            <div className={styles['search-page-input']}>
                <SearchField
                    value={query}
                    onChange={setQuery}
                    onSubmit={search}
                    className={styles['food-search']}
                />
            </div>
            {result.length ? (
                <>
                    <h1 className={styles['results-title']}>
                        {query.trim()
                            ? `Found ${result.length} result${result.length === 1 ? '' : 's'}`
                            : 'Explore the menu'}
                    </h1>
                    <FoodGrid foods={result}/>
                </>
            ) : (
                <EmptyState
                    icon="search"
                    title="Item not found"
                    description="Try searching for your meal with a different keyword."
                    action="Explore all meals"
                    onAction={() => {
                        setQuery('');
                        navigate('/app/search');
                    }}
                />
            )}
        </>
    );
}
