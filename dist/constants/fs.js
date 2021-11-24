"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_CACHE_PATH = exports.DATA_PATH = void 0;
var path = __importStar(require("path"));
exports.DATA_PATH = (_a = process.env.DATA_PATH) !== null && _a !== void 0 ? _a : '';
path.resolve(__dirname, '../../_data/data.dat');
exports.DATA_CACHE_PATH = (_b = process.env.DATA_CACHE_PATH) !== null && _b !== void 0 ? _b : path.join(__dirname, '../../_data/data.json');
console.log({ DATA_PATH: exports.DATA_PATH, DATA_CACHE_PATH: exports.DATA_CACHE_PATH });
