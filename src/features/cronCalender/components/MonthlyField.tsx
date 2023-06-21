import React from "react";
import { CalCronTask } from "types/interface";
import styles from './Field.module.css';
import { nanoid } from "nanoid";

type Props = {
    values: CalCronTask,
    handleChange: (event: React.ChangeEvent<any>) => void,
}

const months: string[] = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthlyField: React.FC<Props> = ({ values, handleChange }) => {

    const checkboxGroupElements = Array(12).fill('').map((el, index) => {
        const value: number = index + 1;
        const id: string = nanoid();
        return (
            <div className={`${styles.field__chooseBox} ${values.monthly.months.includes(`${value}`) && styles.field__chooseBox_active}`} key={id}>
                <input type="checkbox" name="monthly.months" id={id} checked={values.monthly.months.includes(`${value}`)} value={value} onChange={handleChange} />
                <label htmlFor={id}>{months[value]}</label>
            </div>
        );
    });

    return (
        <div className={styles.field}>
            <div className={styles.field__radioBox}>
                < input
                    type="radio"
                    name="taskType"
                    id="monthly"
                    value={'monthly'}
                    checked={values.taskType === 'monthly'}
                    onChange={handleChange}
                />
                <label htmlFor="monthly">Monthly</label>
            </div>
            <div className={`${styles.field__contentColumn} ${values.taskType !== 'monthly' ? 'field__disabled' : ''}`}>
                <p>Every day of</p>
                <div className={styles.field__checkboxGroup}>
                    {checkboxGroupElements}
                </div>
                <div>
                    <span>At</span>
                    <input
                        className={styles.field__inputTime}
                        type="time"
                        name="monthly.time"
                        id="monthlyTime"
                        value={values.monthly.time}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default MonthlyField;