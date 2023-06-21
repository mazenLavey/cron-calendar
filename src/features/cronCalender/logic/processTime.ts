import { nanoid } from "nanoid";
import { hourRegex, minuteRegex } from "utils/regexPatterns/regexPatterns";
import { AtTime } from "types/interface";


const minuteRules = minuteRegex;
const hourRules = hourRegex;

const processTime = (minutes: string, hours: string): AtTime[] => {
    let arrayMinutes: string[];
    let arrayHours: string[];

    if (minutes.match(minuteRules)) {
        arrayMinutes = minutes.split(',');
    } else {
        arrayMinutes = [];
    }

    if (hours.match(hourRules)) {
        arrayHours = hours.split(',');
    } else {
        arrayHours = []
    }
    const timeArray = combineTimeArray(arrayMinutes, arrayHours);

    const time: AtTime[] = timeArray.map(el => {
        return {
            id: nanoid(),
            value: el
        }
    })

    return time;
}

export default processTime;

function combineTimeArray(arrayMinutes: string[], arrayHours: string[]) {
    const combinedArray = [];
    const maxLength = Math.max(arrayMinutes.length, arrayHours.length);

    for (let i = 0; i < maxLength; i++) {
        const hour = arrayHours[i] ? arrayHours[i].padStart(2, '0') : '00';
        const minute = arrayMinutes[i] ? arrayMinutes[i].padStart(2, '0') : '00';
        const time = `${hour}:${minute}`;
        combinedArray.push(time);
    }

    return combinedArray;
}



