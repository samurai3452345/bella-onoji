import React from 'react';
import {categories, filterFoods} from '../../data/catalog';
import SearchField from '../../components/SearchField/SearchField';
import FoodCard from '../../components/FoodCard/FoodCard';
import {useOrder} from '../../state/OrderContext';
import styles from './Catalogue.module.css';

export default function CataloguePage() {
    const {query, setQuery, search, category, setCategory, navigate} = useOrder();
    return (
        <>
            <h1 className={styles['catalogue-title']}>
                Delicious
                <br/>
                food for you
            </h1>
            <SearchField
                value={query}
                onChange={setQuery}
                onSubmit={search}
                className={styles['food-search']}
            />
            <div className={styles['category-tabs']} role="tablist" aria-label="Food categories">
                {categories.map((item) => (
                    <button
                        key={item}
                        role="tab"
                        aria-selected={category === item}
                        className={category === item ? styles['active'] : ''}
                        onClick={() => setCategory(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className={styles['catalogue-section-heading']}>
        <span>
          {category === 'Foods'
              ? 'Made with love, served fresh'
              : `Something ${category === 'Drinks' ? 'refreshing' : 'extra'} for you`}
        </span>
                <button
                    onClick={() => {
                        setQuery('');
                        navigate('/app/search');
                    }}
                >
                    see more
                </button>
            </div>
            <div className={styles['food-carousel']} role="tabpanel" aria-label={category}>
                {filterFoods(category).map((food) => (
                    <FoodCard key={food.id} food={food}/>
                ))}
            </div>
            <p className={styles['catalogue-hint']}>Good food is always a good idea.</p>
        </>
    );
}
