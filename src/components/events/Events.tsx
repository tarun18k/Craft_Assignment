import React, { ChangeEvent, InputHTMLAttributes, KeyboardEvent, useEffect, useRef } from 'react'
import { clearTimeout } from 'timers';
import useValidateSelection from '../../hooks/useSelectionValidation';
import { getEvents, getEventsList, IEvent } from '../../services/slice/events.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import EventCards from './common/EventCard'

export default function Events() {

    //const timeRef = useRef(-1);

    const dispatch = useAppDispatch();

    const events = useAppSelector(getEvents);

    const { selectEvent } = useValidateSelection();

    useEffect(() => {
        dispatch(getEventsList());
    }, [dispatch]);

    const filterHandler = () => {
        return function (event: ChangeEvent<HTMLInputElement>) {

            setTimeout(() => {
                filterEvents(event);
            }, 300)
        }
    }
    const filterEvents = (event: ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target.value);
    }

    return (
        <div>
            <div className="sub-header"><h2>All Events</h2>
                <input onChange={ filterHandler() } placeholder='Search...' />
            </div>
            <div>
                { events.length && events.map((event: IEvent) => {
                    return <EventCards event={ event } selectHandler={ selectEvent } key={ event.id } />
                })
                }
            </div>
        </div>
    )
}
