import React, { useEffect, useState } from 'react'
import { IEvent } from '../../../../services/slice/events.slice';
import EventCards from '../EventCard';
import styles from '../../index.module.scss';
import Paginator from '../Paginator';
interface IProps {
    eventsList: IEvent[];
    clickHandler: (event: IEvent) => void;
    button: {
        buttonLabel: string,
        buttonType: string
    }
    layoutStyle: string;
    errorState?: boolean;
    noDataFoundMessage?: string;
    pageSize?: number;
}
const EventsListView: React.FC<IProps> = (props: IProps) => {

    const events = props.eventsList;
    const pageSize = props.pageSize ? props.pageSize : 6;
    const noDataFoundMessage = props.noDataFoundMessage ? props.noDataFoundMessage : 'Sorry no events found to display!';

    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const [paginatedEvents, setPaginatedEvents] = useState(events);



    useEffect(() => {
        const rem = events.length % pageSize === 0 ? 0 : 1;
        setPageCount(Math.floor(events.length / pageSize) + rem);
        changePageNumber(1);
    }, [events]);

    const changePageNumber = (activePage: number): void => {
        const records = events.filter(
            (event: IEvent, index: number) =>
                index + 1 > activePage * pageSize - pageSize &&
                index + 1 <= activePage * pageSize
        );

        setPaginatedEvents(records);
        setActivePage(activePage);
    };
    return (
        <><div className={ props.layoutStyle === 'col-2' ? styles.col2 : styles.col1 }>
            { paginatedEvents.length ? paginatedEvents.map((event: IEvent) => {
                return <EventCards event={ event } clickHandler={ props.clickHandler } key={ event.id } button={ props.button } />
            }) : !props.errorState ? <div className={ styles.noDataFound }>{ noDataFoundMessage }</div> : <div className={ styles.noDataFound }>Oops,something went wrong.Please try again later.</div>
            }

        </div >
            <Paginator pageChangeHandler={ changePageNumber } currentPage={ activePage } siblingCount={ 1 } pageSize={ pageSize } totalCount={ events.length } /></>
    )
}

export default EventsListView;