"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = void 0;
var fs_1 = __importDefault(require("fs"));
var readData = function (filePath) { return fs_1.default.promises.readFile(filePath, 'utf-8'); };
exports.readData = readData;
