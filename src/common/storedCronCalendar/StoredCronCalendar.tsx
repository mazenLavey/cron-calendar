import { CronContext } from "context/CronContext";
import { useContext } from "react";
import CronCalendarSlot from "./components/CronCalendarSlot";
import styles from './StoredCronCalendar.module.css';

const StoredCronCalendar: React.FC = () => {
    const { calendarData, deleteCal, addToCurrentCalendar, addNewCal } = useContext(CronContext)

    const renderElements = calendarData.map(el =>
        <CronCalendarSlot
            key={el.calId}
            data={el}
            deleteCal={() => deleteCal(el.calId)} editCal={() =>
                addToCurrentCalendar(el.calId)}
        />
    );

    return (
        <div className={styles.listCals}>
            <div className={styles.listCals__btns}>
                <button className="btn btn-outlined" onClick={addNewCal}>+ add</button>
            </div>
            {renderElements}
        </div>
    )
}

export default StoredCronCalendar;