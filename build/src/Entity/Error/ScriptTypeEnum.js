var ScriptTypeEnum;
(function (ScriptTypeEnum) {
    ScriptTypeEnum[ScriptTypeEnum["INT"] = 0] = "INT";
    ScriptTypeEnum[ScriptTypeEnum["FLOAT"] = 1] = "FLOAT";
    ScriptTypeEnum[ScriptTypeEnum["STRING"] = 2] = "STRING";
    ScriptTypeEnum[ScriptTypeEnum["DATE"] = 3] = "DATE";
    ScriptTypeEnum[ScriptTypeEnum["BOOLEAN"] = 4] = "BOOLEAN";
})(ScriptTypeEnum || (ScriptTypeEnum = {}));
module.exports = ScriptTypeEnum;
