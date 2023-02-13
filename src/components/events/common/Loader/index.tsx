import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';

const Loader = () => {
    const [numbers, setNumbers] = useState<number[]>([]);

    useEffect(() => {
        const data: number[] = [];
        for (let i = 1; i <= 6; i++) {
            data.push(i);
        }
        setNumbers(data);
    }, [])

    return (
        <div className={ styles.loaderContainer }>
            <div className={ `${styles.loaderHeader} ${styles.loader}` }></div>
            <div className={ styles.loaderWrapper }>
                { numbers.map((val: number) => {
                    return <div key={ val } className={ styles.loader }></div>
                }) }
            </div>
        </div>
    )
}

export default Loader;
