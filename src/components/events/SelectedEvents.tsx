import React from 'react'
import { getSelectedEvents, IEvent, selectEvents } from '../../services/slice/events.slice';
import { useAppSelector } from '../../store/hooks';
import EventCards from './common/EventCards'
import styles from './Events.module.scss'

export default function SelectedEvents() {
    const selectedEvents = useAppSelector(getSelectedEvents);

    return (
        <div className={ styles.eventsBox }>
            <h2 className={ styles.heading }>Selected Events</h2>
            <h2>{ selectedEvents.length }</h2>
            <div className={ styles.eventList }>
                { selectedEvents.length && selectedEvents.map((event: IEvent) => {
                    return <EventCards event={ event } key={ event.id } selectedEvent={ true } />
                })
                }
            </div>
        </div>
    )
}
