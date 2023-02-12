import React from 'react'
import useValidateSelection from '../../hooks/useSelectionValidation';
import { getSelectedEvents, IEvent } from '../../services/slice/events.slice';
import { useAppSelector } from '../../store/hooks';
import EventCard from './common/EventCard';
import styles from './index.module.scss';

export default function SelectedEvents() {
    const selectedEvents = useAppSelector(getSelectedEvents);
    const { deSelectEvent } = useValidateSelection();
    return (
        <div className={ styles.selectedEventsContainer }>
            <h2>Selected Events</h2>
            <div className={ styles.selectedEventsWrapper }>
                { selectedEvents.length ? selectedEvents.map((event: IEvent) => {
                    return <EventCard event={ event } key={ event.id } deSelectHandler={ deSelectEvent } />
                }) : <div className={ styles.noDataFound }>You have no selected Events. Please select something from the Events List!</div>
                }
            </div>
        </div>
    )
}
