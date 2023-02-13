import React from 'react'
import useValidateSelection from '../../hooks/useSelectionValidation';
import { getSelectedEvents, IEvent } from '../../services/slice/events.slice';
import { useAppSelector } from '../../store/hooks';
import EventsListView from './common/EventsListView';
import styles from './index.module.scss';

export default function SelectedEvents() {
    const selectedEvents = useAppSelector(getSelectedEvents);
    const { deSelectEvent } = useValidateSelection();
    const noDataFoundMessage = 'You have no selected Events. Please select something from the Events List!';
    return (
        <div className={ styles.selectedEventsContainer }>
            <h2>Selected Events</h2>
            <EventsListView eventsList={ selectedEvents } clickHandler={ deSelectEvent } layoutStyle={ 'col-1' } noDataFoundMessage={ noDataFoundMessage } button={ { buttonLabel: 'Delete', buttonType: 'secondary' } } />
        </div>
    )
}
