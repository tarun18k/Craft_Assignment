import React, { useEffect } from 'react'
import { getEvents, getEventsList, IEvent } from '../../services/slice/events.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import EventCards from './common/EventCard'

export default function Events() {

    const dispatch = useAppDispatch();

    const events = useAppSelector(getEvents);

    useEffect(() => {
        dispatch(getEventsList());
    }, [dispatch])

    return (
        <div>
            <h2>All Events</h2>
            <h2>{ events.length }</h2>
            <div>
                { events.length && events.map((event: IEvent) => {
                    return <EventCards event={ event } key={ event.id } />
                })
                }
            </div>
        </div>
    )
}
