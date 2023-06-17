import objToCron from "logic/objToCron/objToCron";
import { CalendarFrom } from "types/interface";
import styles from './CronCalendarSlot.module.css';
import { IoMdTrash, IoMdCreate } from "react-icons/io";

type Props = {
    data: CalendarFrom,
    deleteCal: () => void,
    editCal: () => void
}

const CronCalendarSlot: React.FC<Props> = ({ data, deleteCal, editCal }) => {
    const inCron = (): string => {
        const result = objToCron(data);
        return result;
    }

    return (
        <div className={`${styles.calSlot} fadeIn-animation`}>
            <p className={styles.calSlot__text}>
                {inCron()}
            </p>
            <div>
                <IoMdTrash className={`${styles.calSlot__btn} ${styles.calSlot__btn_red}`} onClick={deleteCal} title="delete" />
                <IoMdCreate className={`${styles.calSlot__btn} ${styles.calSlot__btn_white}`} onClick={editCal} title="edit" />
            </div>
        </div>
    )
}

export default CronCalendarSlot;