import {Record} from './types/types';
import {selectDate} from './selectors';

export function getMonthFilter(month: number) {
    return (record: Record) => {
        return selectDate(record).getMonth() === month;
    };
}

export function getYearFilter(year: number) {
    return (record: Record) => selectDate(record).getFullYear() === year;
}

