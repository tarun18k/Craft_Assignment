import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import useValidateSelection from '../../hooks/useSelectionValidation';
import { getErrorState, getEvents, IEvent } from '../../services/slice/events.slice';
import { useAppSelector } from '../../store/hooks';
import EventsListView from './common/EventsListView';

import SearchIcon from './common/Icons/SearchIcon';
import styles from './index.module.scss';



export default function Events() {

    const events = useAppSelector(getEvents);

    const errorState = useAppSelector(getErrorState);

    const [displayedEvents, setDisplayedEvents] = useState<IEvent[]>([]);

    const [searchValue, setSearchValue] = useState('');

    const { selectEvent } = useValidateSelection();

    const debounce = (func: Function, delay: number): Function => {
        let timer: any;
        return function (this: any) {
            let args = arguments;
            let self = this;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(self, args);
            }, delay);
        };
    }
    const debouncedFilter = useCallback(debounce((val: string, events: IEvent[]) => {
        filterEvents(val, events);
    }, 500), [])

    useEffect(() => {
        setDisplayedEvents(events);
        if (searchValue !== "") {
            filterEvents(searchValue, events);
        }
    }, [events])

    const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        debouncedFilter(event.target.value, events)
    }

    const filterEvents = (searchValue: string, events: IEvent[]): void => {
        if (!searchValue || searchValue === "") {
            setDisplayedEvents(events);
            return;
        }
        setDisplayedEvents(() => {
            return events.filter((event) => {
                return event.event_name.toLowerCase().includes(searchValue.toLowerCase());
            })
        })
    }

    return (
        <div className={ styles.eventsContainer }>
            <div className={ styles.eventsHeader }><h2>All Events</h2>
                <div className="search-wrapper">
                    <input className="search-box" type="text" placeholder="Search by Title" onChange={ filterHandler } />
                    <span><SearchIcon /></span>
                </div>
            </div>
            <EventsListView eventsList={ displayedEvents } clickHandler={ selectEvent } layoutStyle={ 'col-2' } button={ { buttonLabel: 'Select', buttonType: 'primary' } } />
        </div>
    )
}
