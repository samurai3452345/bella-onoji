export const asset = file => `${process.env.PUBLIC_URL}/assets/${file}`;
export const categories = ['Foods', 'Drinks', 'Snacks', 'Sauce'];
export const foods = [{
    id: 'veggie-tomato',
    name: 'Veggie tomato mix',
    category: 'Foods',
    price: 90000,
    image: 'catalog-image3.png',
    tags: 'vegetables tomato fresh salad',
    description: 'Roasted vegetables, juicy tomatoes and fresh greens. A colourful plate, prepared with a little heat and a lot of love.'
}, {
    id: 'spicy-fish',
    name: 'Spicy fish sauce',
    category: 'Foods',
    price: 130099,
    image: 'catalog-image4.png',
    tags: 'fish spicy sauce',
    description: 'Tender fish with a bright citrus dressing, crisp vegetables and our signature spicy sauce.'
}, {
    id: 'egg-cucumber',
    name: 'Egg and cucumber',
    category: 'Foods',
    price: 90000,
    image: 'search-image4.png',
    tags: 'egg rice cucumber vegetables',
    description: 'A comforting rice bowl with eggs, cucumber and a generous helping of fresh vegetables.'
}, {
    id: 'fried-chicken',
    name: 'Fried chicken mix',
    category: 'Foods',
    price: 140000,
    image: 'search-image5.png',
    tags: 'chicken spicy rice',
    description: 'Golden chicken with a satisfying side of seasoned vegetables. A favourite for a reason.'
}, {
    id: 'moi-moi',
    name: 'Moi-moi and ekpa',
    category: 'Foods',
    price: 110000,
    image: 'search-image6.png',
    tags: 'beans rice egg moi',
    description: 'A hearty, home-style combination of moi-moi, rice and delicious sides.'
}, {
    id: 'garden-bowl',
    name: 'Garden veggie bowl',
    category: 'Foods',
    price: 80000,
    image: 'catalog-image3.png',
    tags: 'salad tomato vegetables',
    description: 'Fresh seasonal vegetables in a light dressing. Simple ingredients, full of flavour.'
}, {
    id: 'citrus-drink',
    name: 'Fresh citrus drink',
    category: 'Drinks',
    price: 15000,
    illustration: 'drink',
    tags: 'orange juice cold fresh',
    description: 'A refreshing citrus drink served chilled. The perfect partner to your favourite meal.'
}, {
    id: 'berry-drink',
    name: 'Berry cooler',
    category: 'Drinks',
    price: 25000,
    illustration: 'berry',
    tags: 'berries juice cold',
    description: 'A cool, fruity berry blend for a little refreshment with your order.'
}, {
    id: 'crispy-bites',
    name: 'Crispy plantain bites',
    category: 'Snacks',
    price: 30000,
    illustration: 'snack',
    tags: 'plantain crispy snack',
    description: 'Golden plantain bites, lightly seasoned and ready to share. Or keep all to yourself.'
}, {
    id: 'pepper-sauce',
    name: 'Signature pepper sauce',
    category: 'Sauce',
    price: 10000,
    illustration: 'sauce',
    tags: 'pepper hot spicy',
    description: 'A small pot of big flavour. Add a little extra warmth to any meal.'
}];

export function money(value) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: value % 100 ? 2 : 0
    }).format(value / 100);
}

export function filterFoods(category, query = '') {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return foods.filter(food => (!category || food.category === category) && words.every(word => `${food.name} ${food.tags}`.toLowerCase().includes(word)));
}

export function normalizeCart(value) {
    if (!Array.isArray(value)) return [];
    const byId = new Map();
    for (const item of value) {
        if (item && foods.some(food => food.id === item.foodId) && Number.isSafeInteger(item.quantity) && item.quantity > 0) {
            byId.set(item.foodId, {
                foodId: item.foodId,
                quantity: Math.min(99, item.quantity)
            });
        }
    }
    return [...byId.values()];
}

export function changeQuantity(cart, foodId, delta) {
    if (!foods.some(food => food.id === foodId) || !Number.isSafeInteger(delta)) return cart;
    const quantity = (cart.find(item => item.foodId === foodId)?.quantity || 0) + delta;
    return normalizeCart([...cart.filter(item => item.foodId !== foodId), {
        foodId,
        quantity
    }]);
}

export function subtotal(cart) {
    return normalizeCart(cart).reduce((sum, item) => sum + foods.find(food => food.id === item.foodId).price * item.quantity, 0);
}

export function readStorage(key, fallback, validate = value => value) {
    try {
        const value = JSON.parse(localStorage.getItem(`bella:${key}`));
        return value === null ? fallback : validate(value);
    } catch {
        return fallback;
    }
}
