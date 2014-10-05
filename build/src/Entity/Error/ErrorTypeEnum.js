var ErrorTypeEnum;
(function (ErrorTypeEnum) {
    ErrorTypeEnum[ErrorTypeEnum["DEBUG"] = 0] = "DEBUG";
    ErrorTypeEnum[ErrorTypeEnum["INFO"] = 1] = "INFO";
    ErrorTypeEnum[ErrorTypeEnum["WARNING"] = 2] = "WARNING";
    ErrorTypeEnum[ErrorTypeEnum["ERROR"] = 3] = "ERROR";
    ErrorTypeEnum[ErrorTypeEnum["UNCAUGHT_ERROR"] = 4] = "UNCAUGHT_ERROR";
})(ErrorTypeEnum || (ErrorTypeEnum = {}));
module.exports = ErrorTypeEnum;
