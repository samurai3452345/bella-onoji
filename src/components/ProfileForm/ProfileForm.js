import React, {useState} from 'react';
import FormField from '../FormField/FormField';
import Button from '../Button/Button';
import styles from './ProfileForm.module.css';
import typographyStyles from '../../styles/typography.module.css';
import formFieldStyles from '../FormField/FormField.module.css';
import {joinClasses} from '../../utils/classNames';

export default function ProfileForm({value, onSave, addressOnly = false}) {
    const [draft, setDraft] = useState(value);
    return (
        <form
            className={styles['profile-form']}
            onSubmit={(event) => {
                event.preventDefault();
                onSave({
                    ...draft,
                    name: draft.name.trim(),
                    address: draft.address.trim(),
                });
            }}
        >
            <FormField
                label="Full name"
                name="name"
                autoComplete="name"
                value={draft.name}
                onChange={(e) =>
                    setDraft({
                        ...draft,
                        name: e.target.value,
                    })
                }
                required
                pattern=".*\S.*"
                maxLength={80}
            />
            {!addressOnly && (
                <FormField
                    label="Email address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={draft.email}
                    onChange={(e) =>
                        setDraft({
                            ...draft,
                            email: e.target.value,
                        })
                    }
                    required
                    maxLength={120}
                />
            )}
            <FormField
                label="Phone number"
                name="phone"
                autoComplete="tel"
                type="tel"
                value={draft.phone}
                onChange={(e) =>
                    setDraft({
                        ...draft,
                        phone: e.target.value,
                    })
                }
                required
                minLength={7}
                maxLength={24}
            />
            <FormField
                label="Delivery address"
                name="address"
                autoComplete="street-address"
                value={draft.address}
                onChange={(e) =>
                    setDraft({
                        ...draft,
                        address: e.target.value,
                    })
                }
                required
                pattern=".*\S.*"
                maxLength={200}
            />
            <label className={formFieldStyles['form-field']}>
                <span>Delivery region</span>
                <select
                    aria-label="Delivery region"
                    value={draft.region}
                    onChange={(e) =>
                        setDraft({
                            ...draft,
                            region: e.target.value,
                        })
                    }
                >
                    <option>Mainland</option>
                    <option>Island</option>
                </select>
            </label>
            <Button type="submit" className={styles['primary-button']} variant="primary">
                Save details
            </Button>
            <p className={joinClasses(styles['fine-print'], typographyStyles['fine-print'])}>
                Demo details are saved only in this browser.
            </p>
        </form>
    );
}
