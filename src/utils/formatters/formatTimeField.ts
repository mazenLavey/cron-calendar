import { CalendarFrom } from "types/interface";

const formatTimeField = (values: CalendarFrom): any => {
    let text: string = '';
    const time: string[] = values.atTime.map(el => el.value);

    if (time.length === 0) {
        text = `At every minute`;
    } else {
        if (values.daily || values.weekly) {
            text = `At ${time.join(', ')}`;
        } else {
            text = `At ${time.join(', ')} every day`;
        }
    }
    return text
}

export default formatTimeField;