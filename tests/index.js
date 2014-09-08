﻿var AsimpliaRepository = require("asimplia-repository");

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
var l2 = AsimpliaRepository.Entity.Matrix.MatrixProduct;
var l3 = AsimpliaRepository.Entity.Matrix.MatrixCustomer;
var l4 = AsimpliaRepository.Entity.Matrix.MatrixChannel;
var l5 = AsimpliaRepository.Entity.Matrix.Signal;
var l6 = AsimpliaRepository.Entity.Matrix.Situation;
var l7 = AsimpliaRepository.Entity.Matrix.QuadrantValueFactory;
var m = AsimpliaRepository.Entity.Section.SectionEnum;
var m1 = AsimpliaRepository.Entity.Section.SectionFactory;
var n = AsimpliaRepository.Entity.Suggestion.Action;
var o = AsimpliaRepository.Entity.Suggestion.ActionPlaceholderEnum;
var p = AsimpliaRepository.Entity.Suggestion.FactorDefinition;
var q = AsimpliaRepository.Entity.Suggestion.FactorValue;
var r = AsimpliaRepository.Entity.Suggestion.Graph;
var s = AsimpliaRepository.Entity.Suggestion.PriorityTypeEnum;
var t = AsimpliaRepository.Entity.Suggestion.Result;
var t1 = AsimpliaRepository.Entity.Suggestion.Reason;
var t2 = AsimpliaRepository.Entity.Suggestion.ReasonTypeEnum;
var u = AsimpliaRepository.Entity.Suggestion.Status;
var j = AsimpliaRepository.Entity.Suggestion.ResultStateEnum;
var w = AsimpliaRepository.Factor.FactorLoader;
var x = AsimpliaRepository.Factor.FactorRecorder;
var y = AsimpliaRepository.Matrix.MatrixLoader;
var z = AsimpliaRepository.Matrix.SignalRecorder;
var z1 = AsimpliaRepository.Matrix.SituationRecorder;
var z2 = AsimpliaRepository.Matrix.SituationLoader;
var a1 = AsimpliaRepository.Matrix.SignalLoader;
var a2 = require('../Definition/Factor/Factor');
var a3 = require('../Matrix/SignalThresholdModel');
var a4 = AsimpliaRepository.Placeholder.PlaceholderProductLoader;
var a5 = AsimpliaRepository.Application.UserLoader;
var a6 = AsimpliaRepository.Application.UserRecorder;
var a7 = AsimpliaRepository.Entity.Application.User;
var a8 = AsimpliaRepository.Entity.Application.Authenticate;
var a9 = AsimpliaRepository.Entity.Application.AuthTypeEnum;
var a10 = AsimpliaRepository.Entity.Application.AuthHash;
var a11 = AsimpliaRepository.Application.EShopLoader;
var a12 = AsimpliaRepository.Application.CompanyLoader;
var a13 = AsimpliaRepository.Entity.Application.EShop;
var a14 = AsimpliaRepository.Entity.Application.Company;
var a15 = AsimpliaRepository.Entity.Load.LoadLog;
var a16 = AsimpliaRepository.Load.LoadLogLoader;
var a17 = AsimpliaRepository.Entity.EShop.EShop;
var a18 = AsimpliaRepository.EShop.EShopLoader;
