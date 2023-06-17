


export const dailySeparatorRegex = /^(?:[1-9]|[12]\d|3[01])(?:,(?:[1-9]|[12]\d|3[01]))*$/g;
export const dailyRangeRegexNum = /^(?:[1-9]|1\d|2\d|3[0-1])-(?:[1-9]|1\d|2\d|3[0-1])$/g;

export const monthlySeparatorRegex = /^(?:[1-9]|1[0-2])(?:,(?:[1-9]|1[0-2]))*$/g;
export const monthlyRangeRegexNum = /^(?:[0-5]?[0-9]-[0-5]?[0-9])$/g;
export const monthlyRangeRegexLetters = /^(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/g;


export const weeklySeparatorRegex = /^(?:[0-6](?:,[0-6])*)?$/g;
export const weeklyRangeRegexNum = /^(?:[0-5]?[0-9]-[0-5]?[0-9])$/g;
export const weeklyRangeRegexLetters = /^(?:mon|tue|wed|thu|fri|sat)-(?:mon|tue|wed|thu|fri|sat)$/g;


export const minuteRegex = /^(?:[0-5]?\d(?:,[0-5]?\d)*)$/g;

export const hourRegex = /^(?:[0-9]|0\d|1\d|2[0-3])(?:,(?:[0-9]|0\d|1\d|2[0-3]))*$/g;