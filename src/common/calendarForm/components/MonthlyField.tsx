import React from "react";
import { CalendarFrom } from "types/interface";
import styles from './Field.module.css';
import { nanoid } from "nanoid";

type Props = {
    values: CalendarFrom,
    handleChange: (event: React.ChangeEvent<any>) => void,
    handleBlur: (event: React.ChangeEvent<any>) => void
}

const months: string[] = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthlyField: React.FC<Props> = ({ values, handleChange, handleBlur }) => {

    const checkboxGroupElements = Array(12).fill('').map((el, index) => {
        const value: number = index + 1;
        const id: string = nanoid();
        return (
            <div className={`${styles.field__chooseBox} ${values.selectedMonth.includes(`${value}`) && styles.field__chooseBox_active}`} key={id}>
                <input type="checkbox" name="selectedMonth" id={id} checked={values.selectedMonth.includes(`${value}`)} value={value} onChange={handleChange} />
                <label htmlFor={id}>{months[value]}</label>
            </div>
        );
    });

    return (
        <div className={styles.field}>
            <div className={styles.field__checkbox}>
                < input
                    type="checkbox"
                    name="monthly"
                    id="monthly"
                    checked={values.monthly}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <label htmlFor="monthly">select month(s)</label>
            </div>

            {!values.monthly ? null :
                <>
                    <select
                        className={styles.field__selectBox}
                        name="monthlyOperationType"
                        id="monthlyOperationType"
                        value={values.monthlyOperationType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!values.monthly}
                    >
                        <option value="selectedMonths">choose month(s)</option>
                        <option value="rangeOfMonths">range of months</option>
                    </select>
                    {values.monthlyOperationType === 'rangeOfMonths' ?
                        <input
                            className={styles.field__inputBox}
                            type="text"
                            name='rangeOfMonths'
                            id='rangeOfMonths'
                            value={values.rangeOfMonths}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        :
                        <div className={styles.field__checkboxGroup}>
                            {checkboxGroupElements}
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default MonthlyField;