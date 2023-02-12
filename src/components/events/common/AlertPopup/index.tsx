import React from 'react';
import { getAlertState, toggleAlert } from '../../../../services/slice/alert.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import styles from './index.module.scss';



const AlertPopup = () => {
    const dispatch = useAppDispatch();
    const alertState = useAppSelector(getAlertState);


    return (
        <>{
            alertState.show ? <div className={ styles.modalContainer }>
                <div className={ styles.modalBody }>
                    <div className={ styles.modalContent }>{ alertState.message }</div>
                    <div className={ styles.modalFooter }>
                        <button className='primary-btn' onClick={ () => dispatch(toggleAlert({ show: false, message: '' })) }>OK</button>
                    </div>
                </div>
            </div> : ""
        }</>
    )
}

export default AlertPopup
