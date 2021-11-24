import fs from 'fs';
import {AnalyzedRecord, Record} from '../../record/types';
import {parseISO} from 'date-fns';

/**
 * Opens a data file and returns its contents
 *
 * @param filePath
 */
export const readData = async (filePath: string) => fs.promises.readFile(filePath, 'utf-8');

export const readCachedData  = async (filePath: string) => {
    const rawCollection = JSON.parse(await fs.promises.readFile(filePath, 'utf-8')) as (AnalyzedRecord & { date: string })[];
    return rawCollection.map((record) => ({...record, date: parseISO(record.date)} as AnalyzedRecord));
};
export const writeCachedData = async (filePath: string, obj: Record[]) => { await fs.promises.writeFile(filePath, JSON.stringify(obj), 'utf-8'); };