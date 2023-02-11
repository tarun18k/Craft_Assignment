import React from 'react'
import { Provider } from 'react-redux';

import { store } from '../store/store';

import Events from './events/Events'
import SelectedEvents from './events/SelectedEvents'
import styles from './MainComponent.module.scss';

export default function MainComponent() {
    return (
        <Provider store={ store }>
            <div className={ styles.mainGrid }>
                <Events />
                <SelectedEvents />
            </div>
        </Provider>
    )
}
