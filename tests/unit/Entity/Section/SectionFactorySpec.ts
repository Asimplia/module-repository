
import Repository = require("../../../../src/index");
import SectionFactory = Repository.Entity.Section.SectionFactory;
import SectionEnum = Repository.Entity.Section.SectionEnum;

describe('Entity.Section.SectionFactory', () => {

	describe("createSectionEnum", () => {
		
		it("should return enum instance by string", () => {
			expect(SectionFactory.createSectionEnum('CUSTOMER')).toBe(SectionEnum.CUSTOMER);
			expect(SectionFactory.createSectionEnum('MC10')).toBe(SectionEnum.MC10);
			expect(SectionFactory.createSectionEnum(SectionEnum[SectionEnum.PRODUCT])).toBe(SectionEnum.PRODUCT);
			expect(SectionFactory.createSectionEnum('UNKNOWN')).toBe(0);
		});
	});

	describe("isProduct", () => {
		
		it("should return only on right section or group section", () => {
			expect(SectionFactory.isProduct(SectionEnum.PRODUCT)).toBeTruthy();
			expect(SectionFactory.isProduct(SectionEnum.MP1)).toBeTruthy();
			expect(SectionFactory.isProduct(SectionEnum.MP10)).toBeTruthy();
			expect(SectionFactory.isProduct(SectionEnum.CUSTOMER)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.MC1)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.CATEGORY)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.MGP1)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.CHANNEL)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.MM1)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.E_SHOP)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.MS1)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.CHECKLIST)).toBeFalsy();
			expect(SectionFactory.isProduct(SectionEnum.MLC1)).toBeFalsy();
		});
	});

	describe("isCustomer", () => {
		
		it("should return only on right section or group section", () => {
			expect(SectionFactory.isCustomer(SectionEnum.PRODUCT)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.MP1)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.MP10)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.CUSTOMER)).toBeTruthy();
			expect(SectionFactory.isCustomer(SectionEnum.MC1)).toBeTruthy();
			expect(SectionFactory.isCustomer(SectionEnum.CATEGORY)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.MGP1)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.CHANNEL)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.MM1)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.E_SHOP)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.MS1)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.CHECKLIST)).toBeFalsy();
			expect(SectionFactory.isCustomer(SectionEnum.MLC1)).toBeFalsy();
		});
	});

	describe("isCategory", () => {
		
		it("should return only on right section or group section", () => {
			expect(SectionFactory.isCategory(SectionEnum.PRODUCT)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.MP1)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.MP10)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.CUSTOMER)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.MC1)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.CATEGORY)).toBeTruthy();
			expect(SectionFactory.isCategory(SectionEnum.MGP1)).toBeTruthy();
			expect(SectionFactory.isCategory(SectionEnum.CHANNEL)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.MM1)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.E_SHOP)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.MS1)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.CHECKLIST)).toBeFalsy();
			expect(SectionFactory.isCategory(SectionEnum.MLC1)).toBeFalsy();
		});
	});

	describe("isChannel", () => {
		
		it("should return only on right section or group section", () => {
			expect(SectionFactory.isChannel(SectionEnum.PRODUCT)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.MP1)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.MP10)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.CUSTOMER)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.MC1)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.CATEGORY)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.MGP1)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.CHANNEL)).toBeTruthy();
			expect(SectionFactory.isChannel(SectionEnum.MM1)).toBeTruthy();
			expect(SectionFactory.isChannel(SectionEnum.E_SHOP)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.MS1)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.CHECKLIST)).toBeFalsy();
			expect(SectionFactory.isChannel(SectionEnum.MLC1)).toBeFalsy();
		});
	});

	describe("isEShop", () => {
		
		it("should return only on right section or group section", () => {
			expect(SectionFactory.isEShop(SectionEnum.PRODUCT)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.MP1)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.MP10)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.CUSTOMER)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.MC1)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.CATEGORY)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.MGP1)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.CHANNEL)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.MM1)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.E_SHOP)).toBeTruthy();
			expect(SectionFactory.isEShop(SectionEnum.MS1)).toBeTruthy();
			expect(SectionFactory.isEShop(SectionEnum.CHECKLIST)).toBeFalsy();
			expect(SectionFactory.isEShop(SectionEnum.MLC1)).toBeFalsy();
		});
	});

	describe("isChecklist", () => {
		
		it("should return only on right section or group section", () => {
			expect(SectionFactory.isChecklist(SectionEnum.PRODUCT)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.MP1)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.MP10)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.CUSTOMER)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.MC1)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.CATEGORY)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.MGP1)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.CHANNEL)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.MM1)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.E_SHOP)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.MS1)).toBeFalsy();
			expect(SectionFactory.isChecklist(SectionEnum.CHECKLIST)).toBeTruthy();
			expect(SectionFactory.isChecklist(SectionEnum.MLC1)).toBeTruthy();
		});
	});

	describe("getLabel", () => {
		
		it("should return localized string of section group", () => {
			expect(SectionFactory.getLabel(SectionEnum.PRODUCT).toObject()).toEqual({cs: 'Produkt', en: 'Product'});
			expect(SectionFactory.getLabel(SectionEnum.MP1).toObject()).toEqual({cs: 'Produkt', en: 'Product'});
			expect(SectionFactory.getLabel(SectionEnum.CUSTOMER).toObject()).toEqual({cs: 'Zákazník', en: 'Customer'});
			expect(SectionFactory.getLabel(SectionEnum.MC1).toObject()).toEqual({cs: 'Zákazník', en: 'Customer'});
			expect(SectionFactory.getLabel(SectionEnum.CATEGORY).toObject()).toEqual({cs: 'Kategorie', en: 'Category'});
			expect(SectionFactory.getLabel(SectionEnum.MGP1).toObject()).toEqual({cs: 'Kategorie', en: 'Category'});
			expect(SectionFactory.getLabel(SectionEnum.CHANNEL).toObject()).toEqual({cs: 'Kanál', en: 'Channel'});
			expect(SectionFactory.getLabel(SectionEnum.MM1).toObject()).toEqual({cs: 'Kanál', en: 'Channel'});
			expect(SectionFactory.getLabel(SectionEnum.E_SHOP).toObject()).toEqual({cs: 'e-shop', en: 'e-shop'});
			expect(SectionFactory.getLabel(SectionEnum.MS1).toObject()).toEqual({cs: 'e-shop', en: 'e-shop'});
			expect(SectionFactory.getLabel(SectionEnum.CHECKLIST).toObject()).toEqual({cs: 'Checklist', en: 'Checklist'});
			expect(SectionFactory.getLabel(SectionEnum.MLC1).toObject()).toEqual({cs: 'Checklist', en: 'Checklist'});
		});
	});

	describe("getGroupSection", () => {
		
		it("should return group of specified Section", () => {
			expect(SectionFactory.getGroupSection(SectionEnum.PRODUCT)).toBe(SectionEnum.PRODUCT);
			expect(SectionFactory.getGroupSection(SectionEnum.MP1)).toBe(SectionEnum.PRODUCT);
			expect(SectionFactory.getGroupSection(SectionEnum.CUSTOMER)).toBe(SectionEnum.CUSTOMER);
			expect(SectionFactory.getGroupSection(SectionEnum.MC1)).toBe(SectionEnum.CUSTOMER);
			expect(SectionFactory.getGroupSection(SectionEnum.CATEGORY)).toBe(SectionEnum.CATEGORY);
			expect(SectionFactory.getGroupSection(SectionEnum.MGP1)).toBe(SectionEnum.CATEGORY);
			expect(SectionFactory.getGroupSection(SectionEnum.CHANNEL)).toBe(SectionEnum.CHANNEL);
			expect(SectionFactory.getGroupSection(SectionEnum.MM1)).toBe(SectionEnum.CHANNEL);
			expect(SectionFactory.getGroupSection(SectionEnum.E_SHOP)).toBe(SectionEnum.E_SHOP);
			expect(SectionFactory.getGroupSection(SectionEnum.MS1)).toBe(SectionEnum.E_SHOP);
			expect(SectionFactory.getGroupSection(SectionEnum.CHECKLIST)).toBe(SectionEnum.CHECKLIST);
			expect(SectionFactory.getGroupSection(SectionEnum.MLC1)).toBe(SectionEnum.CHECKLIST);
		});
	});
});
