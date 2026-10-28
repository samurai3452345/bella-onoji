import React from 'react';
import {money} from '../../data/catalog';
import HelpContent from '../../components/HelpContent/HelpContent';
import Button from '../../components/Button/Button';
import typographyStyles from '../../styles/typography.module.css';
import helpContentStyles from '../../components/HelpContent/HelpContent.module.css';
import {joinClasses} from '../../utils/classNames';

export default function HelpPage() {
    return (
        <HelpContent>
            <p className={joinClasses(typographyStyles['demo-label'], helpContentStyles['demo-label'])}>
                HERE TO HELP
            </p>
            <h1 className={joinClasses(typographyStyles['page-title'], helpContentStyles['page-title'])}>
                A few good answers.
            </h1>
            {[
                [
                    'How do I order?',
                    'Choose a meal, add it to your cart and continue to checkout. Select delivery and review the total before confirming your demo order.',
                ],
                [
                    'Is payment collected?',
                    'No. This project is a frontend demonstration. No payment or real delivery is processed.',
                ],
                [
                    'Where are my details saved?',
                    'Your cart, favourites, profile and demo order history are saved in this browser. Passwords and payment details are never saved.',
                ],
                [
                    'How much is delivery?',
                    `The demo uses ${money(150000)} for Mainland or ${money(250000)} for Island. Pick-up is free. You can change your region with your address.`,
                ],
            ].map(([q, a]) => (
                <details key={q}>
                    <summary>{q}</summary>
                    <p>{a}</p>
                </details>
            ))}
            <Button href="#/app" className={helpContentStyles['primary-button']} variant="primary" as="a">
                Explore the menu
            </Button>
        </HelpContent>
    );
}
