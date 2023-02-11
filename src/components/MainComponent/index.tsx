import React from 'react'
import styles from './index.module.scss';

import Loader from '../events/common/Loader';
import Events from '../events/Events'
import SelectedEvents from '../events/SelectedEvents'
import { useAppSelector } from '../../store/hooks';
import { getLoadingState } from '../../services/slice/events.slice';

export default function MainComponent() {
    const isLoading = useAppSelector(getLoadingState);

    return (
        <div className={ styles.mainGrid }>
            { isLoading && <Loader /> }
            <Events />
            <SelectedEvents />
        </div>
    )
}
