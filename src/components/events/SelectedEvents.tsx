import React from 'react'
import useValidateSelection from '../../hooks/useSelectionValidation';
import { getSelectedEvents, IEvent } from '../../services/slice/events.slice';
import { useAppSelector } from '../../store/hooks';
import EventCard from './common/EventCard'

export default function SelectedEvents() {
    const selectedEvents = useAppSelector(getSelectedEvents);
    const { deSelectEvent } = useValidateSelection();
    return (
        <div>
            <h2>Selected Events</h2>
            <h2>{ selectedEvents.length }</h2>
            <div>
                { selectedEvents.length && selectedEvents.map((event: IEvent) => {
                    return <EventCard event={ event } key={ event.id } deSelectHandler={ deSelectEvent } />
                })
                }
            </div>
        </div>
    )
}
