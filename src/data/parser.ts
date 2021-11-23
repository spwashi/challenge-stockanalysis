/**
 * Given the contents of a TSV file,
 *  return an array of objects representing the data
 * @param text
 * @param delimiter
 */
import {Datum} from './types/types';
import {parse} from 'date-fns';

function convertArrayToLowercase(columns: string[]) {
    columns.forEach((v, k) => columns[k] = v.toLowerCase());
}

function extractRowsAndColumns(text: string, delimiter: string): {
    rows: any[],
    columns: (keyof Datum)[]
} {
    const rows    = text.split('\n').map(line => line.split(delimiter));
    const columns = rows.shift();
    if (!columns) throw new Error('cannot parse: no columns provided');
    convertArrayToLowercase(columns);

    return {
        rows,
        columns: columns as (keyof Datum)[],
    };
}


const toNumber = (n: number) => +n;
const toDate   = (n: string) => parse(n, 'd-MMM-yy', new Date);

const typeMapper: { [k: string]: (input: any) => any } =
          {
              date:   toDate,
              open:   toNumber,
              high:   toNumber,
              low:    toNumber,
              close:  toNumber,
              volume: toNumber,
          }

export const parseData =
                 (text: string, {delimiter = '\t'}: { delimiter?: string } = {}): Datum[] => {
                     const {rows, columns} = extractRowsAndColumns(text, delimiter);
                     return (
                         rows
                             .map(rowData => {
                                 const dataset = {} as Datum;
                                 columns
                                     .forEach((colName, index) => {
                                         dataset[colName] = typeMapper[colName](rowData[index])
                                     });
                                 return dataset;
                             })
                     );
                 }