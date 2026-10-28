import React, {lazy, Suspense, useEffect, useState} from 'react';
import Landing from './pages/Landing/LandingPage';
import Splash from './components/Splash/Splash';
import './styles/tokens.css';
import './styles/global.css';

const OrderApp = lazy(() => import('./app/OrderApp'));

export function navigate(path) {
    window.location.hash = path;
}

export default function App() {
    const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/');
    useEffect(() => {
        const change = () => setRoute(window.location.hash.slice(1) || '/');
        window.addEventListener('hashchange', change);
        return () => window.removeEventListener('hashchange', change);
    }, []);
    useEffect(() => {
        if (route.startsWith('/')) window.scrollTo(0, 0);
        document.title = route.startsWith('/app') ? 'Bella Onojie · Food for everyone' : 'Bella Onojie · Delicious food for you';
    }, [route]);
    return route === '/app' || route.startsWith('/app/') || route.startsWith('/app?') ?
        <Suspense fallback={<Splash/>}><OrderApp route={route} navigate={navigate}/></Suspense> : <Landing/>;
}
