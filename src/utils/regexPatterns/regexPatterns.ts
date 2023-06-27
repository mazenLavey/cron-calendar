


export const monthlySeparatorNums = /^(?:[1-9]|1[0-2])(?:,(?:[1-9]|1[0-2]))*$/gm;
export const monthlySeparatorLetters = /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(,(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))*$/gm;
export const monthlyRangeNums = /^(?:[0-5]?[0-9]-[0-5]?[0-9])$/gm;
export const monthlyRangeLetters = /^(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/gm;


export const weeklySeparatorNums = /^(?:[0-6](?:,[0-6])*)?$/gm;
export const weeklySeparatorLetters = /^(mon|tue|wed|thu|fri|sat|sun)(,(mon|tue|wed|thu|fri|sat|sun))*$/gm;
export const weeklyRangeNums = /^(?:[0-6]-[0-6])$/gm;
export const weeklyRangeLetters = /^(?:mon|tue|wed|thu|fri|sat)-(?:mon|tue|wed|thu|fri|sat)$/gm;

export const minuteRegex = /^(?:[0-5]?\d(?:,[0-5]?\d)*)$/g;
export const hourRegex = /^(?:[0-9]|0\d|1\d|2[0-3])(?:,(?:[0-9]|0\d|1\d|2[0-3]))*$/g;

export const weeklyTask = /^(?:[0-5]?[0-9]) (?:[01]?[0-9]|2[0-3]) (\*|\?) \* .+$/g;
export const monthTask = /^(?:[0-5]?[0-9]) (?:[01]?[0-9]|2[0-3]) (\*|\?) .+ \*$/g;
export const dailyEachMinuteTask = /^(\*\/\d+) \* (\*|\?) \* \*$/g;
export const dailyAtTimeTask = /^(?:0?[1-9]|[1-5][0-9]) (?:0?[0-9]|1[0-9]|2[0-3]|(?:[0-9]+,[0-9]+)?) (\*|\?) \* \*$/g;