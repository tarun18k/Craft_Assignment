import React from 'react'
import { IEvent } from '../../../../services/slice/events.slice'

interface IProps {
    event: IEvent,
    selectHandler?: (event: IEvent) => void,
    deSelectHandler?: (event: IEvent) => void,
}
const EventCard: React.FC<IProps> = (props: IProps) => {
    const { event, selectHandler, deSelectHandler }: IProps = props;

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
                        selectHandler && <button onClick={ () => { selectHandler(event) } }>Select</button> }
                    { deSelectHandler && <button onClick={ () => { deSelectHandler(event) } }>DeSelect</button> }


                </section>
            </article>
        </div>
    )
}

export default EventCard; 