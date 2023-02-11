import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';

const Loader = () => {
    const [numbers, setNumbers] = useState<number[]>([]);

    useEffect(() => {
        const data: number[] = [];
        for (let i = 1; i <= 4; i++) {
            data.push(i);
        }
        setNumbers(data);
    }, [])

    return (
        <div className={ styles.loaderContainer }>
            <div className={ styles.loaderWrapper }>
                { numbers.map((val: number) => {
                    return <div key={ val } className={ styles.loader }></div>
                }) }
            </div>
            <div>
                <div className={ styles.loader }></div>
                <div className={ styles.loader }></div>
            </div>
        </div>
    )
}

export default Loader;
