import React, { ChangeEvent, InputHTMLAttributes, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { clearTimeout } from 'timers';
import useValidateSelection from '../../hooks/useSelectionValidation';
import { getEvents, getEventsList, IEvent } from '../../services/slice/events.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import debounce from '../../utils/debounce';
import EventCards from './common/EventCard';
import styles from './index.module.scss';



export default function Events() {

    const dispatch = useAppDispatch();

    const events = useAppSelector(getEvents);

    const [displayedEvents, setDisplayedEvents] = useState<IEvent[]>([]);

    const { selectEvent } = useValidateSelection();

    const debouncedFilter = useCallback(debounce((val: string) => {
        filterEvents(val);
    }, 500), [])

    useEffect(() => {
        dispatch(getEventsList());
    }, [dispatch]);

    useEffect(() => {
        setDisplayedEvents(events);
    }, [events])
    const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedFilter(event.target.value);
    }
    const filterEvents = (searchValue: string): void => {
        setDisplayedEvents((events: IEvent[]) => {
            return displayedEvents.filter((event) => {
                return event.event_name.toLowerCase().includes(searchValue.toLowerCase());
            })
        })
    }

    return (
        <div>
            <div className="sub-header"><h2>All Events</h2>
                <input onChange={ filterHandler } placeholder='Search...' />
            </div>
            <div className={ styles.allEventsWrapper }>
                { displayedEvents.length && displayedEvents.map((event: IEvent) => {
                    return <EventCards event={ event } selectHandler={ selectEvent } key={ event.id } />
                })
                }
            </div>
        </div>
    )
}
