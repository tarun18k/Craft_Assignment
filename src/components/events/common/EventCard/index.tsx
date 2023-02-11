import React from 'react'
import { deSelectEvents, getSelectedEvents, IEvent, selectEvents } from '../../../../services/slice/events.slice'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface IProps {
    event: IEvent,
    isSelected?: boolean,
    selectionEnabled?: boolean,
}
const EventCard: React.FC<IProps> = (props: IProps) => {
    const { event, isSelected, selectionEnabled }: IProps = props;

    const dispatch = useAppDispatch();

    const selectedEventsList = useAppSelector(getSelectedEvents);

    const startDate = new Date(event?.start_time);
    const endDate = new Date(event?.end_time);

    const dateFormatter = (date: Date, showTime?: boolean) => {
        const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return `${DAYS[date.getDay()]} ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()} ${showTime ? formatTime(date) : ""}`;
    }

    const compareDate = (startDate: Date, endDate: Date) => {
        return new Date(startDate.toDateString()) === new Date(endDate.toDateString());
    }

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        let format = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + format;
        return strTime;
    }

    const isOverlappingEvents = (eventList: IEvent[], selectedEvent: IEvent): boolean => {
        let selectedStartDate = new Date(selectedEvent.start_time).toISOString();
        return eventList.some((event: IEvent) => {
            let currentDate = new Date(event.start_time).toISOString();
            let prevDateEvent = currentDate > selectedStartDate ? selectedEvent : event;
            let futureDateEvent = currentDate > selectedStartDate ? event : selectedEvent;
            return prevDateEvent.end_time >= futureDateEvent.start_time;
        })

    }

    const selectEventHandler = (event: IEvent): void => {
        if (selectedEventsList.length === 3) {
            console.log('Cannot Select More than 3 events.')
        }
        else if (isOverlappingEvents(selectedEventsList, event)) {
            console.log('Overlapping Events');
        }
        else {
            dispatch(selectEvents(event));
        }
    }

    const deSelectHandler = (event: IEvent): void => {
        dispatch(deSelectEvents(event));
    }

    return (
        <div className="card">
            <article className="card fl-left">
                <section className="date">
                    <time dateTime={ event.start_time }>
                        <span>{ startDate.getDate() }</span><span>{ startDate.toLocaleString('default', { month: 'short' }) }</span>
                    </time>
                </section>
                <section className="card-cont">
                    <small>{ event.event_category }</small>
                    <h3>{ event.event_name }</h3>
                    <div className="even-date">
                        <i className="fa fa-calendar"></i>
                        <time>
                            {
                                compareDate(startDate, endDate) ?
                                    <> <span>{ dateFormatter(startDate) }</span>
                                        <span>{ formatTime(startDate) } to { formatTime(endDate) }</span> </> :
                                    <><span>{ dateFormatter(startDate, true) }</span>
                                        <span>To + { dateFormatter(endDate, true) }</span></>
                            }

                        </time>
                    </div>
                    {
                        !isSelected ? <button onClick={ () => { selectEventHandler(event) } } disabled={ selectionEnabled }>Select</button> : <button onClick={ () => {
                            deSelectHandler(event);
                        } }>DeSelect</button>
                    }

                </section>
            </article>
        </div>
    )
}

export default EventCard; 