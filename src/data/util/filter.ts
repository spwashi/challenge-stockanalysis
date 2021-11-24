export function createAggregateFilter(filters: ((d: any) => boolean)[]) {
    return (d: any) => filters.reduce((isTruthy, filter) => isTruthy ? filter(d) : false, true);
}
