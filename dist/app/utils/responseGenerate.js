"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseGenerate = void 0;
const responseGenerate = (success, message, data = null, error = null) => {
    let response;
    if (data !== null && error === null) {
        response = {
            success,
            message,
            data,
        };
        return response;
    }
    else if (error !== null && data === null) {
        response = {
            success,
            message,
            error,
        };
    }
    return response;
};
exports.responseGenerate = responseGenerate;
