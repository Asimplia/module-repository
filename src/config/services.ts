
import Util = require('asimplia-util');

var object = (object: any) => {
	return {
		$factory: () => { return object; }
	};
};

export = services;
var services: { [name: string]: any } = {
	'ConnectionDispatcher': require('../ConnectionDispatcher'),
	'Definition.Application.CategoryModel': object(require('../Definition/Application/CategoryModel')),
	'Definition.Application.ChannelModel': object(require('../Definition/Application/ChannelModel')),
	'Definition.Application.CompanyModel': object(require('../Definition/Application/CompanyModel')),
	'Definition.Application.CustomerModel': object(require('../Definition/Application/CustomerModel')),
	'Definition.Application.EShopModel': object(require('../Definition/Application/EShopModel')),
	'Definition.Application.MatrixLoadModel': object(require('../Definition/Application/MatrixLoadModel')),
	'Definition.Application.MatrixModel': object(require('../Definition/Application/MatrixModel')),
	'Definition.Application.ProductModel': object(require('../Definition/Application/ProductModel')),
	'Definition.Application.UserModel': object(require('../Definition/Application/UserModel')),
	'Definition.Checklist.ChecklistModel': object(require('../Definition/Checklist/ChecklistModel')),
	'Definition.Error.ErrorLogModel': object(require('../Definition/Error/ErrorLogModel')),
	'Definition.Factor.FactorModel': object(require('../Definition/Factor/FactorModel')),
	'Definition.Matrix.SignalThresholdModel': object(require('../Definition/Matrix/SignalThresholdModel')),
	'Definition.Suggestion.ActionModel': object(require('../Definition/Suggestion/ActionModel')),
	'Definition.Suggestion.ResultModel': object(require('../Definition/Suggestion/ResultModel')),
	'Definition.Matrix.MatrixDescriptionModel': object(require('../Definition/Matrix/MatrixDescriptionModel')),
	'Application.Settings.ChecklistSourceSettingsLoader': require('../Application/Settings/ChecklistSourceSettingsLoader'),
	'Application.CategoryLoader': require('../Application/CategoryLoader'),
	'Application.ChannelLoader': require('../Application/ChannelLoader'),
	'Application.CompanyLoader': require('../Application/CompanyLoader'),
	'Application.CustomerLoader': require('../Application/CustomerLoader'),
	'Application.EShopLoader': require('../Application/EShopLoader'),
	'Application.MatrixLoadLoader': require('../Application/MatrixLoadLoader'),
	'Application.MatrixLoader': require('../Application/MatrixLoader'),
	'Application.ProductLoader': require('../Application/ProductLoader'),
	'Application.UserLoader': require('../Application/UserLoader'),
	'Checklist.ChecklistLoader': require('../Checklist/ChecklistLoader'),
	'Factor.FactorLoader': require('../Factor/FactorLoader'),
	'Matrix.SignalThresholdLoader': require('../Matrix/SignalThresholdLoader'),
	'Suggestion.ActionLoader': require('../Suggestion/ActionLoader'),
	'Suggestion.ResultLoader': require('../Suggestion/ResultLoader'),
	'Matrix.MatrixDescriptionLoader': require('../Matrix/MatrixDescriptionLoader'),
	'Application.Settings.ChecklistSourceSettingsRecorder': require('../Application/Settings/ChecklistSourceSettingsRecorder'),
	'Application.CategoryRecorder': require('../Application/CategoryRecorder'),
	'Application.ChannelRecorder': require('../Application/ChannelRecorder'),
	'Application.CompanyRecorder': require('../Application/CompanyRecorder'),
	'Application.CustomerRecorder': require('../Application/CustomerRecorder'),
	'Application.EShopRecorder': require('../Application/EShopRecorder'),
	'Application.MatrixLoadRecorder': require('../Application/MatrixLoadRecorder'),
	'Application.MatrixRecorder': require('../Application/MatrixRecorder'),
	'Application.ProductRecorder': require('../Application/ProductRecorder'),
	'Application.UserRecorder': require('../Application/UserRecorder'),
	'Checklist.ChecklistRecorder': require('../Checklist/ChecklistRecorder'),
	'Error.ErrorLogRecorder': require('../Error/ErrorLogRecorder'),
	'Factor.FactorRecorder': require('../Factor/FactorRecorder'),
	'Matrix.SignalThresholdRecorder': require('../Matrix/SignalThresholdRecorder'),
	'Suggestion.ActionRecorder': require('../Suggestion/ActionRecorder'),
	'Suggestion.ResultRecorder': require('../Suggestion/ResultRecorder'),
	'External.GoogleLoader': require('../External/GoogleLoader'),
	'Placeholder.PlaceholderCategoryLoader': require('../Placeholder/PlaceholderCategoryLoader'),
	'Placeholder.PlaceholderProductLoader': require('../Placeholder/PlaceholderProductLoader'),
	'Section.MatrixTypeLoader': require('../Section/MatrixTypeLoader'),
	'Site.OrderProcessRecordRecorder': require('../Site/OrderProcessRecordRecorder'),
	'Site.VisitRecordRecorder': require('../Site/VisitRecordRecorder'),
	'EShop.CategoryLoader': require('../EShop/CategoryLoader'),
	'EShop.ChannelLoader': require('../EShop/ChannelLoader'),
	'EShop.CompanyLoader': require('../EShop/CompanyLoader'),
	'EShop.CustomerLoader': require('../EShop/CustomerLoader'),
	'EShop.EShopLoader': require('../EShop/EShopLoader'),
	'EShop.EShopRecorder': require('../EShop/EShopRecorder'),
	'EShop.ProductLoader': require('../EShop/ProductLoader'),
	'Load.LoadLogLoader': require('../Load/LoadLogLoader'),
	'Matrix.MatrixLoader': require('../Matrix/MatrixLoader'),
	'Matrix.SignalLoader': require('../Matrix/SignalLoader'),
	'Matrix.SituationLoader': require('../Matrix/SituationLoader'),
	'Matrix.MatrixRecorder': require('../Matrix/MatrixRecorder'),
	'Matrix.SignalRecorder': require('../Matrix/SignalRecorder'),
	'Matrix.SituationRecorder': require('../Matrix/SituationRecorder'),
	'Util:AOP.AspectInterception': {
		$class: Util.AOP.AspectInterception,
		$inject: [
			Util.DI.ServiceAutoload
		],
		$factory: (
			serviceAutoload: Util.DI.ServiceAutoload
		) => {
			return new Util.AOP.AspectInterception('Checklist', {
				'Util:DI.ServiceAutoload': serviceAutoload,
			})
		}
	},
	'Util:AOP.AnnotationAspects': {
		$class: Util.AOP.AnnotationAspects,
		$args: [__dirname + '/..']
	},
	'Util:DI.ServiceAutoload': {
		$class: Util.DI.ServiceAutoload,
		$args: [
			[
				__dirname + '/../Entity',
				__dirname + '/../Feed'
			]
		]
	},
};
