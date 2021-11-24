"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData = void 0;
var functions_1 = require("../../../util/functions");
function extractRowsAndColumns(text, parsingOptions) {
    var mutateArrayToLowercase = function (columns) { return columns.forEach(function (v, k) { return columns[k] = v.toLowerCase(); }); };
    var splitColumns = function (line) { var _a; return line.split((_a = parsingOptions.columnDelimiter) !== null && _a !== void 0 ? _a : '\t'); };
    var splitRows = function (document) { var _a; return document.split((_a = parsingOptions.rowDelimiter) !== null && _a !== void 0 ? _a : '\n'); };
    var rows = splitRows(text).map(splitColumns);
    var columns = rows.shift();
    if (!columns)
        throw new Error('cannot parse: no columns provided');
    mutateArrayToLowercase(columns);
    return {
        rows: rows,
        columns: columns,
    };
}
/**
 * Given an array of columns and an array of data,
 *  create
 * @param columns
 * @param rowData
 */
function hydrateRecord(columns, rowData) {
    var record = {};
    var indexColumn = function (colName, index) {
        switch (colName) {
            case 'date':
                return record[colName] = functions_1.toDate(rowData[index]);
            default:
                return record[colName] = functions_1.toNumber(rowData[index]);
        }
    };
    columns.forEach(indexColumn);
    return record;
}
/**
 * Given a string of tabular data, return an array of Records mutated by the provided transformer
 *
 * {@see Record}
 *
 * @param text A string of tabular data
 * @param transform Function to run on each record
 * @param parsingOptions Options for parsing the data
 */
var parseData = function (text, transform, parsingOptions) {
    if (transform === void 0) { transform = functions_1.passiveNoop; }
    if (parsingOptions === void 0) { parsingOptions = {}; }
    var _a = extractRowsAndColumns(text, parsingOptions), rows = _a.rows, columns = _a.columns;
    return rows.map(function (row) { return transform(hydrateRecord(columns, row)); })
        .filter(Boolean);
};
exports.parseData = parseData;
