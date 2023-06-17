import React, { useState, useEffect } from "react";
import { AtTime, CalendarFrom } from "types/interface";
import styles from './Field.module.css';
import { nanoid } from "nanoid";

type Props = {
    values: CalendarFrom,
    handleChange: (field: string, value: any) => void,
    handleBlur: (event: React.ChangeEvent<any>) => void
}

const TimeField: React.FC<Props> = ({ values, handleChange, handleBlur }) => {
    const [timeArray, setTimeArray] = useState<AtTime[]>([]);

    useEffect(() => {
        setTimeArray(values.atTime);
    }, [values])

    const handleTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, id } = e.target;
        const updateTimeArray = timeArray?.map(el => {
            if (el.id === id) {
                return {
                    ...el,
                    value: value
                }
            } else {
                return el
            }
        })

        handleChange('atTime', updateTimeArray);
        setTimeArray(updateTimeArray);
    };

    const renderTimeElements = timeArray?.map(el => {
        return (
            <div className={styles.field__checkbox} key={el.id}>
                < input
                    className={styles.field__inputBox}
                    type="time"
                    name="atTime"
                    id={el.id}
                    value={el.value}
                    onChange={handleTime}
                    onBlur={handleBlur}
                />
            </div>
        )
    });

    const updateTimeFeild = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault()
        const operationType = e.currentTarget.dataset.operation;

        if (operationType === "add") {
            const newTimeFeild: AtTime = {
                id: nanoid(),
                value: '00:01'
            }
            timeArray?.push(newTimeFeild);
            handleChange('atTime', timeArray);

        } else {
            timeArray?.pop();
            handleChange('atTime', timeArray);
        }
    }

    return (
        <div className={styles.field__time}>
            <div className={styles.field__timeControls}>
                <span>At:</span>
                <button className={`btn ${styles.feild__timeBtns} ${styles.feild__timeBtns_add}`} data-operation="add" onClick={updateTimeFeild}>+</button>
                <button className={`btn ${styles.feild__timeBtns} ${styles.feild__timeBtns_remove}`} data-operation="remove" onClick={updateTimeFeild}>-</button>
            </div>
            <div className={styles.field__timeInput}>
                {renderTimeElements}
            </div>

        </div>
    )
}

export default TimeField;