import React from "react";
import { IEvent } from "../../../../services/slice/events.slice";
import CalendarIcon from "../Icons/CalendarIcon";
import styles from "./index.module.scss";

interface IProps {
    event: IEvent;
    selectHandler?: (event: IEvent) => void;
    deSelectHandler?: (event: IEvent) => void;
}

const EventCard: React.FC<IProps> = (props: IProps) => {
    const { event, selectHandler, deSelectHandler }: IProps = props;
    const startDate = new Date(event?.start_time);
    const endDate = new Date(event?.end_time);

    const dateFormatter = (date: Date, showTime?: boolean) => {
        const DAYS = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
        ];

        return `${DAYS[date.getDay()]} ${date.getDate()} ${date.toLocaleString(
            "default",
            { month: "short" }
        )} ${date.getFullYear()} ${showTime ? formatTime(date) : ""}`;
    };

    const compareDate = (startDate: Date, endDate: Date) => {
        let startDateTemp = new Date(startDate);
        let endDateTemp = new Date(endDate);
        startDateTemp.setHours(0, 0, 0, 0);
        endDateTemp.setHours(0, 0, 0, 0);

        return startDateTemp.getTime() === endDateTemp.getTime();
    };

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        let format = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let strTime = hours + ":" + minutes + " " + format;
        return strTime;
    };

    return (
        <div className={ styles.card }>
            <section className={ styles.cardDateWrapper }>
                <time dateTime={ event.start_time }>
                    <div className={ styles.cardDate }>{ startDate.getDate() }</div>
                    <div>{ startDate.toLocaleString("default", { month: "short" }) }</div>
                </time>
            </section>

            <section className={ styles.cardContent }>
                <div className={ styles.cardContentWrapper }>
                    <small>{ event.event_category }</small>
                    <div className={ styles.cardTitle }>{ event.event_name }</div>
                    <div>
                        {/* <CalendarIcon /> */ }
                        <time>
                            { compareDate(startDate, endDate) ? (
                                <>
                                    <div>{ dateFormatter(startDate) }</div>
                                    <div>
                                        { formatTime(startDate) } { " to " } { formatTime(endDate) }
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>{ dateFormatter(startDate, true) }</div>
                                    <div>{ "To " } { dateFormatter(endDate, true) }</div>
                                </>
                            ) }
                        </time>
                    </div>
                </div>

                <div className={ styles.buttonWrapper }>
                    { selectHandler && (
                        <button className="primary-btn" onClick={ () => { selectHandler(event) } }>Select</button>
                    ) }
                    { deSelectHandler && (
                        <button className="secondary-btn" onClick={ () => { deSelectHandler(event) } }>Delete</button>
                    ) }
                </div>
            </section>
        </div>
    );
};
export default EventCard;
