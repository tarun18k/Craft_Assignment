import React from 'react'
import { deSelectEvents, getSelectedEvents, IEvent, selectEvents } from '../../../services/slice/events.slice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import SelectedEvents from '../SelectedEvents';
interface IProps {
    event: IEvent,
    selectedEvent?: boolean,
    selectionEnabled?: boolean,
}
const EventCards: React.FC<IProps> = (prop: IProps) => {

    const selectedEventsList = useAppSelector(getSelectedEvents);

    const dispatch = useAppDispatch();

    const eventValue: IEvent = prop?.event;

    const isSelected: boolean = prop?.selectedEvent || false;

    const selectionEnabled: boolean = prop?.selectionEnabled || false;

    const startDate = new Date(eventValue?.start_time);

    const endDate = new Date(eventValue?.end_time);

    const dateFormatter = (date: Date) => {
        var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

        var dayIndex = date.getDay();
        var day = days[dayIndex];

        var month = date.toLocaleString('default', { month: 'short' });
        var year = date.getFullYear();
        var dayOfMonth = date.getDate();

        return day + ' ' + dayOfMonth + ' ' + month + ' ' + year;
    }

    const compareDate = (startDate: Date, endDate: Date) => {
        return new Date(startDate.toDateString()) == new Date(endDate.toDateString());
    }

    const formatAMPM = (date: Date) => {
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
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
                    <time dateTime={ eventValue.start_time }>
                        <span>{ startDate.getDate() }</span><span>{ startDate.toLocaleString('default', { month: 'short' }) }</span>
                    </time>
                </section>
                <section className="card-cont">
                    <small>{ eventValue.event_category }</small>
                    <h3>{ eventValue.event_name }</h3>
                    <div className="even-date">
                        <i className="fa fa-calendar"></i>
                        <time>
                            {
                                compareDate(startDate, endDate) ?
                                    <> <span>{ dateFormatter(startDate) }</span>
                                        <span>{ formatAMPM(startDate) + ' to ' + formatAMPM(endDate) }</span> </> :
                                    <><span>{ dateFormatter(startDate) }</span>
                                        <span>{ formatAMPM(startDate) + ' to ' + formatAMPM(endDate) }</span></>
                            }

                        </time>
                    </div>
                    {
                        !isSelected ? <button onClick={ () => { selectEventHandler(eventValue) } } disabled={ selectionEnabled }>Select</button> : <button onClick={ () => {
                            deSelectHandler(eventValue);
                        } }>DeSelect</button>
                    }

                </section>
            </article>
        </div>
    )
}

export default EventCards; 