import React, {useState} from 'react';
import {asset, money} from '../../data/catalog';
import Header from '../../components/Header/Header';
import StoreLinks from '../../components/StoreLinks/StoreLinks';
import FeatureStep from '../../components/FeatureStep/FeatureStep';
import Icon from '../../components/Icon/Icon';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import styles from './Landing.module.css';
import typographyStyles from '../../styles/typography.module.css';
import headerStyles from '../../components/Header/Header.module.css';
import modalStyles from '../../components/Modal/Modal.module.css';
import {joinClasses} from '../../utils/classNames';

const steps = [
    {
        label: 'Create an account',
        title: 'Create/login to an existing account to get started',
        description: 'An account is created with your email and a desired password.',
        image: 'mobile-rectangle.png',
    },
    {
        label: 'Explore varieties',
        mobileLabel: 'Explore while shopping',
        title: 'Shop for your favourite meals as e dey hot.',
        description: 'Shop for your favourite meals or drinks and enjoy while doing it.',
        image: 'mobile-rectangle1.png',
        className: 'explore',
    },
    {
        label: 'Checkout',
        title: 'When you’re done, check out and get it delivered.',
        description: 'When you’re done, check out and get it delivered with ease.',
        image: 'mobile-rectangle2.png',
        className: 'checkout',
    },
];
const faqs = [
    [
        'What can I do in the web demo?',
        'Explore the menu, search for a meal, save favourites and place a demonstration order. Your basket and demo orders stay in this browser.',
    ],
    [
        'Can I place a real order?',
        'This is a frontend demonstration of the Bella Onojie design. No real orders are sent, no payment is collected and no delivery is arranged.',
    ],
    [
        'How are delivery fees calculated?',
        `The demo uses ${money(150000)} for Mainland and ${money(250000)} for Island. Pick-up is free. Your exact demonstration total is shown before confirmation.`,
    ],
    [
        'Do I need to download an app?',
        'You can try the complete ordering experience right here in your browser. Official App Store and Play Store links have not been supplied for this project.',
    ],
];
export default function LandingPage() {
    const [store, setStore] = useState(null);
    const [social, setSocial] = useState(null);
    return (
        <div
            className={styles['landing']}
            style={{
                '--hero-image': `url("${asset('desktop-rectangle48.png')}")`,
                '--download-image': `url("${asset('desktop-rectangle47.png')}")`,
            }}
        >
            <a className={headerStyles['skip-link']} href="#main">
                Skip to content
            </a>
            <Header/>
            <main id="main">
                <section className={styles['landing-hero']} aria-labelledby="hero-title">
                    <div className={styles['hero-content']}>
                        <p className={styles['eyebrow']}>Food app</p>
                        <h1 id="hero-title">
                            Why stay hungry when
                            <br className={styles['desktop-break']}/> you can order from Bella Onojie
                        </h1>
                        <p className={styles['hero-description']}>Download the Bella Onojie food app now on</p>
                        <StoreLinks onStore={setStore}/>
                    </div>
                </section>
                <div className={styles['phone-showcase']} aria-label="Preview of the Bella Onojie app">
                    <div className={styles['phone-back']}>
                        <img
                            src={asset('desktop-rectangle.png')}
                            alt="Bella Onojie food catalogue on a phone"
                        />
                    </div>
                    <div className={styles['phone-front']}>
                        <img
                            src={asset('desktop-rectangle1.png')}
                            alt="Food for Everyone welcome screen on a phone"
                        />
                    </div>
                </div>
                <section id="product" aria-labelledby="how-title">
                    <div className={styles['how-heading']}>
                        <h2 id="how-title">How the app works</h2>
                    </div>
                    {steps.map((step) => (
                        <FeatureStep step={step} key={step.label}/>
                    ))}
                </section>
                <section className={styles['download-section']} id="download">
                    <h2>Download the app now.</h2>
                    <p>Available on your favourite store. Start your delicious experience now.</p>
                    <StoreLinks compact onStore={setStore}/>
                    <a href="#/app" className={styles['browser-demo-link']}>
                        Or try it in your browser <Icon name="arrow" size={18}/>
                    </a>
                </section>
                <section className={styles['faq-section']} id="faq">
                    <div>
                        <p className={joinClasses(styles['feature-label'], typographyStyles['feature-label'])}>
                            A little more to know
                        </p>
                        <h2>
                            Good food.
                            <br/>
                            Simple answers.
                        </h2>
                        <a href="#/app" className={typographyStyles['text-link']}>
                            Explore the web demo <Icon name="arrow" size={20}/>
                        </a>
                    </div>
                    <div className={styles['faq-list']}>
                        {faqs.map(([question, answer]) => (
                            <details key={question}>
                                <summary>
                                    {question}
                                    <span aria-hidden="true">+</span>
                                </summary>
                                <p>{answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
            </main>
            <Footer onSocial={setSocial}/>
            {store && (
                <Modal title={`Try Bella in your browser`} onClose={() => setStore(null)}>
                    <p className={modalStyles['modal-description']}>
                        The official {store} link hasn’t been supplied. You can explore the food menu and try a
                        demonstration order right here.
                    </p>
                    <Button
                        href="#/app"
                        className={modalStyles['primary-button']}
                        onClick={() => setStore(null)}
                        variant="primary"
                        as="a"
                    >
                        Explore the menu <Icon name="arrow" size={20}/>
                    </Button>
                    <Button
                        className={modalStyles['subtle-button']}
                        onClick={() => setStore(null)}
                        variant="subtle"
                    >
                        Keep exploring the website
                    </Button>
                </Modal>
            )}
            {social && (
                <Modal title={social} onClose={() => setSocial(null)}>
                    <p className={modalStyles['modal-description']}>
                        The official Bella Onojie {social} profile hasn’t been supplied for this demo. You can
                        still explore the menu right here.
                    </p>
                    <Button
                        href="#/app"
                        className={modalStyles['primary-button']}
                        onClick={() => setSocial(null)}
                        variant="primary"
                        as="a"
                    >
                        Explore the menu
                    </Button>
                </Modal>
            )}
        </div>
    );
}
