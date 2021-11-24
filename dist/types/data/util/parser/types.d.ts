import { Record } from '../../record/types/types';
/**
 * A function to run that takes a record and returns
 *  something else.
 */
export interface RecordTransformer<T = any> {
    (record: Record): T;
}
