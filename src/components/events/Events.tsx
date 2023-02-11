import React, { useEffect } from 'react'
import { getEvents, getEventsList, IEvent } from '../../services/slice/events.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import EventCards from './common/EventCards'
import styles from './Events.module.scss';

export default function Events() {

    const dispatch = useAppDispatch();

    const events = useAppSelector(getEvents);

    useEffect(() => {
        dispatch(getEventsList());
    }, [])

    return (
        <div className={ styles.eventsBox }>
            <h2 className={ styles.heading }>All Events</h2>
            <h2>{ events.length }</h2>
            <div className={ styles.eventList }>
                { events.length && events.map((event: IEvent) => {
                    return <EventCards event={ event } key={ event.id } />
                })
                }
            </div>
        </div>
    )
}
