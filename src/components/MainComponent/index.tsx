import React, { useEffect } from 'react'
import styles from './index.module.scss';

import Loader from '../events/common/Loader';
import Events from '../events/Events'
import SelectedEvents from '../events/SelectedEvents'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getEventsList, getLoadingState } from '../../services/slice/events.slice';
import AlertPopup from '../events/common/AlertPopup';

export default function MainComponent() {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(getLoadingState);

    useEffect(() => {
        dispatch(getEventsList());
    }, [dispatch]);

    return (
        <>
            <AlertPopup />
            <div className={ styles.mainGrid }>
                { isLoading ? <Loader /> : <>
                    <Events />
                    <SelectedEvents /></> }
            </div>
        </>
    )
}
