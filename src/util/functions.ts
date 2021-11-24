import {parse} from 'date-fns';

export const roundToPrecision = (num: number, precision = 100) => Math.round(precision * (num)) / precision;
export const passiveNoop      = <T = any>(n: T) => n;

export const toNumber = (n: any) => +n;
export const toDate   = (n: string) => parse(n, 'd-MMM-yy', new Date);

