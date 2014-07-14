var ColumnEnum;
(function (ColumnEnum) {
    ColumnEnum[ColumnEnum["UNKNOWN"] = 0] = "UNKNOWN";
    ColumnEnum[ColumnEnum["SCORE_ABSOLUTE"] = 1] = "SCORE_ABSOLUTE";
    ColumnEnum[ColumnEnum["SCORE_RELATIVE"] = 2] = "SCORE_RELATIVE";
    ColumnEnum[ColumnEnum["SCORE_WEIGHT"] = 3] = "SCORE_WEIGHT";
    ColumnEnum[ColumnEnum["CHANGE_ABSOLUTE"] = 4] = "CHANGE_ABSOLUTE";
    ColumnEnum[ColumnEnum["CHANGE_RELATIVE"] = 5] = "CHANGE_RELATIVE";
    ColumnEnum[ColumnEnum["CHANGE_WEIGHT"] = 6] = "CHANGE_WEIGHT";
    ColumnEnum[ColumnEnum["PREDICTION"] = 7] = "PREDICTION";
    ColumnEnum[ColumnEnum["INPUT_VALUE_X"] = 8] = "INPUT_VALUE_X";
    ColumnEnum[ColumnEnum["INPUT_VALUE_Y"] = 9] = "INPUT_VALUE_Y";
    ColumnEnum[ColumnEnum["CHANGE_VALUE_X"] = 10] = "CHANGE_VALUE_X";
    ColumnEnum[ColumnEnum["CHANGE_VALUE_Y"] = 11] = "CHANGE_VALUE_Y";
    ColumnEnum[ColumnEnum["TANGENS"] = 12] = "TANGENS";
    ColumnEnum[ColumnEnum["CHANGE_TANGENS"] = 13] = "CHANGE_TANGENS";
})(ColumnEnum || (ColumnEnum = {}));
module.exports = ColumnEnum;
