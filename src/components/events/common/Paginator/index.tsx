import React, { useState } from 'react'
import { DOTS, usePagination } from '../../../../hooks/usePaginator';

import styles from './index.module.scss';

interface IProps {
    pageChangeHandler: (pagenumber: number) => void,
    totalCount: number,
    siblingCount: number,
    pageSize: number,
    currentPage: number,
}

const Paginator: React.FC<IProps> = (props: IProps) => {
    const { pageChangeHandler, totalCount, siblingCount, pageSize, currentPage } = props;

    const paginationRange: (string | number)[] = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    }) || [];
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    let lastPage = paginationRange[paginationRange.length - 1];
    const onNext = () => {
        pageChangeHandler(currentPage + 1);
    };

    const onPrevious = () => {
        pageChangeHandler(currentPage - 1);
    };
    return (
        <ul
            className={ `${styles.paginationContainer} ${styles.paginationBar}` }
        >
            <li key={ 0 }
                className={ `${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ''}` }

                onClick={ onPrevious }
            >
                <div className={ `${styles.arrow} ${styles.left}` } />
            </li>
            { paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <li key={ index } className={ `${styles.paginationItem} ${styles.dots}` }>&#8230;</li>;
                }

                return (
                    <li key={ index }
                        className={ `${styles.paginationItem} ${pageNumber === currentPage ? styles.selected : ''}` }
                        onClick={ () => pageChangeHandler(Number(pageNumber)) }
                    >
                        { pageNumber }
                    </li>
                );
            }) }
            <li key={ paginationRange.length + 1 }
                className={ `${styles.paginationItem} ${currentPage === lastPage ? styles.disabled : ''}` }
                onClick={ onNext }
            >
                <div className={ `${styles.arrow} ${styles.right}` } />
            </li>
        </ul>
    )
}
export default Paginator;