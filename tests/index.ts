/// <reference path="../index.node.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import AsimpliaRepository = require("asimplia-repository");

// loading for force compile TS
var a = AsimpliaRepository.Suggestion.ActionLoader;
var b = AsimpliaRepository.Suggestion.ActionRecorder;
var c = AsimpliaRepository.Suggestion.ResultLoader;
var d = AsimpliaRepository.Suggestion.ResultTypeEnum;
var e = AsimpliaRepository.Entity.IEntity;
var f = AsimpliaRepository.Entity.List;
var g = AsimpliaRepository.Entity.Factor.Factor;
var h = AsimpliaRepository.Entity.Factor.FactorTypeEnum;
var i = AsimpliaRepository.Entity.Factor.ShiftValueEnum;
var k = AsimpliaRepository.Entity.Locale.LocalizedString;
var l = AsimpliaRepository.Entity.Matrix.QuadrantValueEnum;
var l0 = AsimpliaRepository.Entity.Matrix.Matrix;
var l1 = AsimpliaRepository.Entity.Matrix.Signal;
var m = AsimpliaRepository.Entity.Section.SectionEnum;
var n = AsimpliaRepository.Entity.Suggestion.Action;
var o = AsimpliaRepository.Entity.Suggestion.ActionPlaceholderEnum;
var p = AsimpliaRepository.Entity.Suggestion.FactorDefinition;
var q = AsimpliaRepository.Entity.Suggestion.FactorValue;
var r = AsimpliaRepository.Entity.Suggestion.Graph;
var s = AsimpliaRepository.Entity.Suggestion.PriorityTypeEnum;
var t = AsimpliaRepository.Entity.Suggestion.Result;
var u = AsimpliaRepository.Entity.Suggestion.Status;
var j = AsimpliaRepository.Entity.Suggestion.ResultStateEnum;
var w = AsimpliaRepository.Factor.FactorLoader;
var x = AsimpliaRepository.Factor.FactorRecorder;
var y = AsimpliaRepository.Matrix.MatrixLoader;
var z = AsimpliaRepository.Matrix.SignalRecorder;
var a1 = AsimpliaRepository.Matrix.SignalLoader;
var a2 = require('../Definition/Factor/Factor');
