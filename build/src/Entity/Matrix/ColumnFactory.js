var ColumnEnum = require('./ColumnEnum');

var ColumnFactory = (function () {
    function ColumnFactory() {
    }
    ColumnFactory.createColumnEnum = function (column) {
        switch (column) {
            case ColumnEnum[1 /* SCORE_ABSOLUTE */]:
                return 1 /* SCORE_ABSOLUTE */;
            case ColumnEnum[2 /* SCORE_RELATIVE */]:
                return 2 /* SCORE_RELATIVE */;
            case ColumnEnum[3 /* SCORE_WEIGHT */]:
                return 3 /* SCORE_WEIGHT */;
            case ColumnEnum[4 /* CHANGE_ABSOLUTE */]:
                return 4 /* CHANGE_ABSOLUTE */;
            case ColumnEnum[5 /* CHANGE_RELATIVE */]:
                return 5 /* CHANGE_RELATIVE */;
            case ColumnEnum[6 /* CHANGE_WEIGHT */]:
                return 6 /* CHANGE_WEIGHT */;
            case ColumnEnum[7 /* PREDICTION */]:
                return 7 /* PREDICTION */;
            case ColumnEnum[8 /* INPUT_VALUE_X */]:
                return 8 /* INPUT_VALUE_X */;
            case ColumnEnum[9 /* INPUT_VALUE_Y */]:
                return 9 /* INPUT_VALUE_Y */;
            case ColumnEnum[10 /* CHANGE_VALUE_X */]:
                return 10 /* CHANGE_VALUE_X */;
            case ColumnEnum[11 /* CHANGE_VALUE_Y */]:
                return 11 /* CHANGE_VALUE_Y */;
            case ColumnEnum[12 /* TANGENS */]:
                return 12 /* TANGENS */;
            case ColumnEnum[13 /* CHANGE_TANGENS */]:
                return 13 /* CHANGE_TANGENS */;
        }
        return 0 /* UNKNOWN */;
    };

    ColumnFactory.getMatrixColumnValue = function (matrix, column) {
        var columnValue = null;
        switch (column) {
            case 4 /* CHANGE_ABSOLUTE */:
                columnValue = matrix.ChangeAbsolute;
                break;
            case 5 /* CHANGE_RELATIVE */:
                columnValue = matrix.ChangeRelative;
                break;
            case 6 /* CHANGE_WEIGHT */:
                columnValue = matrix.ChangeWeight;
                break;
            case 1 /* SCORE_ABSOLUTE */:
                columnValue = matrix.ScoreAbsolute;
                break;
            case 2 /* SCORE_RELATIVE */:
                columnValue = matrix.ScoreRelative;
                break;
            case 3 /* SCORE_WEIGHT */:
                columnValue = matrix.ScoreWeight;
                break;
            case 7 /* PREDICTION */:
                columnValue = matrix.Prediction;
                break;
            case 8 /* INPUT_VALUE_X */:
                columnValue = matrix.InputValueX;
                break;
            case 9 /* INPUT_VALUE_Y */:
                columnValue = matrix.InputValueY;
                break;
            case 10 /* CHANGE_VALUE_X */:
                columnValue = matrix.ChangeValueX;
                break;
            case 11 /* CHANGE_VALUE_Y */:
                columnValue = matrix.ChangeValueY;
                break;
            case 12 /* TANGENS */:
                columnValue = matrix.Tangens;
                break;
            case 13 /* CHANGE_TANGENS */:
                columnValue = matrix.ChangeTangens;
                break;
        }
        return columnValue;
    };
    return ColumnFactory;
})();
module.exports = ColumnFactory;
