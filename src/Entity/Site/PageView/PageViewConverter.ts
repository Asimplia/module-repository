
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import PageView = require('./PageView');
import IPageViewObject = require('./IPageViewObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = PageViewConverter;
class PageViewConverter extends Converter<PageView, IPageViewObject> {

	static $service = 'Entity.Site.PageView.PageViewConverter';
	constructor() {
		super(PageView);
	}
}
