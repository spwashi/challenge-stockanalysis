import fs from 'fs';
import {AnalyzedRecord, Record} from '../../record/types/types';
import {parseISO} from 'date-fns';

/**
 * Opens a data file and returns its contents
 *
 * @param filePath
 */
export const readData = async (filePath: string): Promise<string> => fs.promises.readFile(filePath, 'utf-8');

/**
 * Read data from a JSON file
 *
 * @param filePath
 */
export const parseCachedData = async (filePath: string): Promise<AnalyzedRecord[]> => {
    const rawCollection: (AnalyzedRecord & { date: string })[] = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
    return rawCollection.map((record) => ({...record, date: parseISO(record.date)} as AnalyzedRecord));
};

/**
 * Write data to a JSON file after having parsed it
 * @param filePath
 * @param obj
 */
export const writeCachedData = async (filePath: string, obj: Record[]) => { await fs.promises.writeFile(filePath, JSON.stringify(obj), 'utf-8'); };