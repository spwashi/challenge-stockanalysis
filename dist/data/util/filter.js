"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAggregateFilter = void 0;
function createAggregateFilter(filters) {
    return function (d) { return filters.reduce(function (isTruthy, filter) { return isTruthy ? filter(d) : false; }, true); };
}
exports.createAggregateFilter = createAggregateFilter;
