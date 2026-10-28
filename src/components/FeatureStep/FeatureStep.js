import React from 'react';
import {asset} from '../../data/catalog';
import styles from './FeatureStep.module.css';
import typographyStyles from '../../styles/typography.module.css';
import {joinClasses} from '../../utils/classNames';

export default function FeatureStep({step}) {
    return (
        <article
            className={joinClasses(styles['feature-step'], styles[step.className])}
            key={step.label}
        >
            <div className={styles['feature-phone']}>
                <img src={asset(step.image)} alt={`${step.label} app screen`} loading="lazy"/>
            </div>
            <div className={styles['feature-copy']}>
                <p className={typographyStyles['feature-label']}>
                    {step.mobileLabel ? (
                        <>
                            <span className={styles['desktop-label']}>{step.label}</span>
                            <span className={styles['mobile-label']}>{step.mobileLabel}</span>
                        </>
                    ) : (
                        step.label
                    )}
                </p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
            </div>
        </article>
    );
}
