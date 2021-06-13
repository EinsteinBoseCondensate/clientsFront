export interface CRUDResult {
    wasOk: boolean;
}
export interface CRUDResults<T> extends CRUDResult {
    data: T[];
    count: number;
}