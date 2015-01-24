
var object = (object: any) => {
	return {
		$factory: () => { return object; }
	};
};

export = services;
var services: { [name: string]: any } = {
	'ConnectionDispatcher': require('../ConnectionDispatcher'),
	'Definition.Application.Settings.ChecklistSourceSettingsModel': object(require('../Definition/Application/Settings/ChecklistSourceSettingsModel')),
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
};
