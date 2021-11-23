"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData = void 0;
var date_fns_1 = require("date-fns");
function convertArrayToLowercase(columns) {
    columns.forEach(function (v, k) { return columns[k] = v.toLowerCase(); });
}
function extractRowsAndColumns(text, delimiter) {
    var rows = text.split('\n').map(function (line) { return line.split(delimiter); });
    var columns = rows.shift();
    if (!columns)
        throw new Error('cannot parse: no columns provided');
    convertArrayToLowercase(columns);
    return {
        rows: rows,
        columns: columns,
    };
}
var toNumber = function (n) { return +n; };
var toDate = function (n) { return date_fns_1.parse(n, 'd-MMM-yy', new Date); };
var typeMapper = {
    date: toDate,
    open: toNumber,
    high: toNumber,
    low: toNumber,
    close: toNumber,
    volume: toNumber,
};
var parseData = function (text, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.delimiter, delimiter = _c === void 0 ? '\t' : _c;
    var _d = extractRowsAndColumns(text, delimiter), rows = _d.rows, columns = _d.columns;
    return (rows
        .map(function (rowData) {
        var dataset = {};
        columns
            .forEach(function (colName, index) {
            dataset[colName] = typeMapper[colName](rowData[index]);
        });
        return dataset;
    }));
};
exports.parseData = parseData;
