var ResultStateEnum;
(function (ResultStateEnum) {
    ResultStateEnum[ResultStateEnum["UNKNOWN"] = 0] = "UNKNOWN";
    ResultStateEnum[ResultStateEnum["USED"] = 1] = "USED";
    ResultStateEnum[ResultStateEnum["READY_TO_APPLY"] = 2] = "READY_TO_APPLY";
    ResultStateEnum[ResultStateEnum["REMIND_LATER"] = 3] = "REMIND_LATER";
    ResultStateEnum[ResultStateEnum["CREATED"] = 4] = "CREATED";
    ResultStateEnum[ResultStateEnum["DECLINED"] = 5] = "DECLINED";
})(ResultStateEnum || (ResultStateEnum = {}));
module.exports = ResultStateEnum;
