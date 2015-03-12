
import SectionEnum = require('./SectionEnum');
import LocalizedString = require('../Locale/LocalizedString');
import _ = require('underscore');

export = SectionFactory;
class SectionFactory {

	private static labels = [
		[SectionEnum.PRODUCT, {cs: 'Produkt', en: 'Product'}],
		[SectionEnum.CUSTOMER, {cs: 'Zákazník', en: 'Customer'}],
		[SectionEnum.CATEGORY, {cs: 'Kategorie', en: 'Category'}],
		[SectionEnum.CHANNEL, {cs: 'Kanál', en: 'Channel'}],
		[SectionEnum.E_SHOP, {cs: 'e-shop', en: 'e-shop'}],
		[SectionEnum.CHECKLIST, {cs: 'Checklist', en: 'Checklist'}],
	];

	static createSectionEnum(section: string): SectionEnum {
		var sectionInstance: SectionEnum = <any>SectionEnum[section];
		if (typeof sectionInstance !== 'undefined') {
			return sectionInstance;
		}
		return SectionEnum.UNKNOWN;
	}

	static isProduct(section: SectionEnum) {
		if (section == SectionEnum.PRODUCT || SectionEnum[section].substr(0, 2) == 'MP') {
			return true;
		}
		return false;
	}

	static isCustomer(section: SectionEnum) {
		if (section == SectionEnum.CUSTOMER || SectionEnum[section].substr(0, 2) == 'MC') {
			return true;
		}
		return false;
	}

	static isCategory(section: SectionEnum) {
		if (section == SectionEnum.CATEGORY || SectionEnum[section].substr(0, 3) == 'MGP') {
			return true;
		}
		return false;
	}

	static isChannel(section: SectionEnum) {
		if (section == SectionEnum.CHANNEL || SectionEnum[section].substr(0, 2) == 'MM') {
			return true;
		}
		return false;
	}

	static isEShop(section: SectionEnum) {
		if (section == SectionEnum.E_SHOP || SectionEnum[section].substr(0, 2) == 'MS') {
			return true;
		}
		return false;
	}

	static isChecklist(section: SectionEnum) {
		if (section == SectionEnum.CHECKLIST || SectionEnum[section].substr(0, 3) == 'MLC') {
			return true;
		}
		return false;
	}

	static getLabel(section: SectionEnum): LocalizedString {
		var groupSection = SectionFactory.getGroupSection(section);
		var labelsByGroupSection = _.object(SectionFactory.labels);
		return labelsByGroupSection[groupSection] ? new LocalizedString(labelsByGroupSection[groupSection]) : null;
	}

	static getGroupSection(section: SectionEnum) {
		if (this.isProduct(section)) {
			return SectionEnum.PRODUCT;
		}
		if (this.isCustomer(section)) {
			return SectionEnum.CUSTOMER;
		}
		if (this.isChannel(section)) {
			return SectionEnum.CHANNEL;
		}
		if (this.isCategory(section)) {
			return SectionEnum.CATEGORY;
		}
		if (this.isEShop(section)) {
			return SectionEnum.E_SHOP;
		}
		if (this.isChecklist(section)) {
			return SectionEnum.CHECKLIST;
		}
		return null;
	}
}
