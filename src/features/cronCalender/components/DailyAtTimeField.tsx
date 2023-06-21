import React, { useEffect, useState } from "react";
import { AtTime, CalCronTask } from "types/interface";
import styles from './Field.module.css';
import { nanoid } from "nanoid";

type Props = {
    values: CalCronTask,
    handleChange: (event: React.ChangeEvent<any>) => void,
    handleTime: (field: string, value: any) => void,
}

const DailyAtTimeField: React.FC<Props> = ({ values, handleChange, handleTime }) => {
    const [timeArray, setTimeArray] = useState<AtTime[]>([]);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

        handleTime('dailyAtTime.time', updateTimeArray);
        setTimeArray(updateTimeArray);
    };

    useEffect(() => {
        setTimeArray(values.dailyAtTime.time);

        if (timeArray.length === 0) {
            addTimeFeild();
        }
    }, [values, timeArray]);

    const addTimeFeild = (): void => {
        if (timeArray.length < 2) {
            const newTimeFeild: AtTime = {
                id: nanoid(),
                value: '00:00'
            }

            timeArray?.push(newTimeFeild);
            handleTime('dailyAtTime.time', timeArray);
        }
    }

    const removeTimeFeild = (): void => {
        if (timeArray.length > 1) {
            timeArray?.pop();
            handleTime('dailyAtTime.time', timeArray);
        }
    }

    const updateTimeFeild = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const operationType = e.currentTarget.dataset.operation;
        if (operationType === "add") {
            addTimeFeild();
        } else {
            removeTimeFeild();
        }
    }

    const timeElements = timeArray.map(el => {
        return (
            <input
                className={styles.field__inputTime}
                key={el.id}
                type="time"
                name="dailyAtTime.time"
                id={el.id}
                value={el.value}
                onChange={handleTimeChange}
            />
        )
    });


    return (
        <div className={`${styles.field} ${styles.field__alignCenter}`}>
            <div className={styles.field__radioBox}>
                < input
                    type="radio"
                    name="taskType"
                    id="dailyAtTime"
                    value={'dailyAtTime'}
                    checked={values.taskType === 'dailyAtTime'}
                    onChange={handleChange}
                />
                <label htmlFor="dailyAtTime">Daily</label>
            </div>
            <div className={`${styles.field__contentRow} ${values.taskType !== 'dailyAtTime' ? 'field__disabled' : ''}`}>
                <div className={styles.field__timeControls}>
                    <span>At:</span>
                    <button className={`btn ${styles.feild__timeBtns} ${styles.feild__timeBtns_add} ${timeArray.length === 2 ? styles.feild__timeBtns_disabled : ''}`} data-operation="add" onClick={updateTimeFeild}>+</button>
                    <button className={`btn ${styles.feild__timeBtns} ${styles.feild__timeBtns_remove} ${timeArray.length === 1 ? styles.feild__timeBtns_disabled : ''}`} data-operation="remove" onClick={updateTimeFeild}>-</button>
                </div>
                {timeElements}
            </div>
        </div>
    )
}

export default DailyAtTimeField;