
import SectionEnum = require('./SectionEnum');
import LocalizedString = require('../Locale/LocalizedString');

export = SectionFactory;
class SectionFactory {

	static createSectionEnum(section: string) {
		switch (section) {
			case SectionEnum[SectionEnum.CUSTOMER]:
				return SectionEnum.CUSTOMER;
			case SectionEnum[SectionEnum.MC1]:
				return SectionEnum.MC1;
			case SectionEnum[SectionEnum.MC2]:
				return SectionEnum.MC2;
			case SectionEnum[SectionEnum.MC3]:
				return SectionEnum.MC3;
			case SectionEnum[SectionEnum.MC4]:
				return SectionEnum.MC4;
			case SectionEnum[SectionEnum.MC5]:
				return SectionEnum.MC5;
			case SectionEnum[SectionEnum.MC6]:
				return SectionEnum.MC6;
			case SectionEnum[SectionEnum.MC7]:
				return SectionEnum.MC7;
			case SectionEnum[SectionEnum.MC8]:
				return SectionEnum.MC8;
			case SectionEnum[SectionEnum.MC9]:
				return SectionEnum.MC9;
			case SectionEnum[SectionEnum.MC10]:
				return SectionEnum.MC10;
			case SectionEnum[SectionEnum.MC11]:
				return SectionEnum.MC11;
			case SectionEnum[SectionEnum.MC12]:
				return SectionEnum.MC12;
			case SectionEnum[SectionEnum.MC13]:
				return SectionEnum.MC13;
			case SectionEnum[SectionEnum.MC14]:
				return SectionEnum.MC14;
			case SectionEnum[SectionEnum.MC15]:
				return SectionEnum.MC16;
			case SectionEnum[SectionEnum.MC17]:
				return SectionEnum.MC17;
			case SectionEnum[SectionEnum.MC18]:
				return SectionEnum.MC18;
			case SectionEnum[SectionEnum.MC19]:
				return SectionEnum.MC19;
			case SectionEnum[SectionEnum.MC20]:
				return SectionEnum.MC20;
			case SectionEnum[SectionEnum.PRODUCT]:
				return SectionEnum.PRODUCT;
			case SectionEnum[SectionEnum.MP1]:
				return SectionEnum.MP1;
			case SectionEnum[SectionEnum.MP2]:
				return SectionEnum.MP2;
			case SectionEnum[SectionEnum.MP3]:
				return SectionEnum.MP3;
			case SectionEnum[SectionEnum.MP4]:
				return SectionEnum.MP4;
			case SectionEnum[SectionEnum.MP5]:
				return SectionEnum.MP5;
			case SectionEnum[SectionEnum.MP6]:
				return SectionEnum.MP6;
			case SectionEnum[SectionEnum.MP7]:
				return SectionEnum.MP7;
			case SectionEnum[SectionEnum.MP8]:
				return SectionEnum.MP8;
			case SectionEnum[SectionEnum.MP9]:
				return SectionEnum.MP9;
			case SectionEnum[SectionEnum.MP10]:
				return SectionEnum.MP10;
			case SectionEnum[SectionEnum.MP11]:
				return SectionEnum.MP11;
			case SectionEnum[SectionEnum.MP12]:
				return SectionEnum.MP12;
			case SectionEnum[SectionEnum.MP13]:
				return SectionEnum.MP13;
			case SectionEnum[SectionEnum.MP14]:
				return SectionEnum.MP14;
			case SectionEnum[SectionEnum.MP15]:
				return SectionEnum.MP15;
			case SectionEnum[SectionEnum.MP16]:
				return SectionEnum.MP16;
			case SectionEnum[SectionEnum.MP17]:
				return SectionEnum.MP17;
			case SectionEnum[SectionEnum.MP18]:
				return SectionEnum.MP18;
			case SectionEnum[SectionEnum.MP19]:
				return SectionEnum.MP19;
			case SectionEnum[SectionEnum.MP20]:
				return SectionEnum.MP20;
			case SectionEnum[SectionEnum.MGP1]:
				return SectionEnum.MGP1;
			case SectionEnum[SectionEnum.MGP2]:
				return SectionEnum.MGP2;
			case SectionEnum[SectionEnum.MGP3]:
				return SectionEnum.MGP3;
			case SectionEnum[SectionEnum.MGP4]:
				return SectionEnum.MGP4;
			case SectionEnum[SectionEnum.MGP5]:
				return SectionEnum.MGP5;
			case SectionEnum[SectionEnum.MGP6]:
				return SectionEnum.MGP6;
			case SectionEnum[SectionEnum.MGP7]:
				return SectionEnum.MGP7;
			case SectionEnum[SectionEnum.MGP8]:
				return SectionEnum.MGP8;
			case SectionEnum[SectionEnum.MGP9]:
				return SectionEnum.MGP9;
			case SectionEnum[SectionEnum.MGP10]:
				return SectionEnum.MGP10;
			case SectionEnum[SectionEnum.CHANNEL]:
				return SectionEnum.CHANNEL;
			case SectionEnum[SectionEnum.MM1]:
				return SectionEnum.MM1;
			case SectionEnum[SectionEnum.MM2]:
				return SectionEnum.MM2;
			case SectionEnum[SectionEnum.MM3]:
				return SectionEnum.MM3;
			case SectionEnum[SectionEnum.MM4]:
				return SectionEnum.MM4;
			case SectionEnum[SectionEnum.MM5]:
				return SectionEnum.MM5;
			case SectionEnum[SectionEnum.MM6]:
				return SectionEnum.MM6;
			case SectionEnum[SectionEnum.MM7]:
				return SectionEnum.MM7;
			case SectionEnum[SectionEnum.MM8]:
				return SectionEnum.MM8;
			case SectionEnum[SectionEnum.MM9]:
				return SectionEnum.MM9;
			case SectionEnum[SectionEnum.MM10]:
				return SectionEnum.MM10;
			case SectionEnum[SectionEnum.MM11]:
				return SectionEnum.MM11;
			case SectionEnum[SectionEnum.MM12]:
				return SectionEnum.MM12;
			case SectionEnum[SectionEnum.MM13]:
				return SectionEnum.MM13;
			case SectionEnum[SectionEnum.MM14]:
				return SectionEnum.MM14;
			case SectionEnum[SectionEnum.MM15]:
				return SectionEnum.MM15;
			case SectionEnum[SectionEnum.MM16]:
				return SectionEnum.MM16;
			case SectionEnum[SectionEnum.MM17]:
				return SectionEnum.MM17;
			case SectionEnum[SectionEnum.MM18]:
				return SectionEnum.MM18;
			case SectionEnum[SectionEnum.MM19]:
				return SectionEnum.MM19;
			case SectionEnum[SectionEnum.MM20]:
				return SectionEnum.MM20;
		}
		return SectionEnum.UNKNOWN;
	}

	static isProduct(section: SectionEnum) {
		switch (section) {
			case SectionEnum.PRODUCT:
			case SectionEnum.MP1:
			case SectionEnum.MP2:
			case SectionEnum.MP3:
			case SectionEnum.MP4:
			case SectionEnum.MP5:
			case SectionEnum.MP6:
			case SectionEnum.MP7:
			case SectionEnum.MP8:
			case SectionEnum.MP9:
			case SectionEnum.MP10:
			case SectionEnum.MP11:
			case SectionEnum.MP12:
			case SectionEnum.MP13:
			case SectionEnum.MP14:
			case SectionEnum.MP15:
			case SectionEnum.MP16:
			case SectionEnum.MP17:
			case SectionEnum.MP18:
			case SectionEnum.MP19:
			case SectionEnum.MP20:
			case SectionEnum.MGP1:
			case SectionEnum.MGP2:
			case SectionEnum.MGP3:
			case SectionEnum.MGP4:
			case SectionEnum.MGP5:
			case SectionEnum.MGP6:
			case SectionEnum.MGP7:
			case SectionEnum.MGP8:
			case SectionEnum.MGP9:
			case SectionEnum.MGP10:
				return true;
		}
		return false;
	}

	static isCustomer(section: SectionEnum) {
		switch (section) {
			case SectionEnum.CUSTOMER:
			case SectionEnum.MC1:
			case SectionEnum.MC2:
			case SectionEnum.MC3:
			case SectionEnum.MC4:
			case SectionEnum.MC5:
			case SectionEnum.MC6:
			case SectionEnum.MC7:
			case SectionEnum.MC8:
			case SectionEnum.MC9:
			case SectionEnum.MC10:
			case SectionEnum.MC11:
			case SectionEnum.MC12:
			case SectionEnum.MC13:
			case SectionEnum.MC14:
			case SectionEnum.MC15:
			case SectionEnum.MC16:
			case SectionEnum.MC17:
			case SectionEnum.MC18:
			case SectionEnum.MC19:
			case SectionEnum.MC20:
				return true;
		}
		return false;
	}

	static isChannel(section: SectionEnum) {
		switch (section) {
			case SectionEnum.CHANNEL:
			case SectionEnum.MM1:
			case SectionEnum.MM2:
			case SectionEnum.MM3:
			case SectionEnum.MM4:
			case SectionEnum.MM5:
			case SectionEnum.MM6:
			case SectionEnum.MM7:
			case SectionEnum.MM8:
			case SectionEnum.MM9:
			case SectionEnum.MM10:
			case SectionEnum.MM11:
			case SectionEnum.MM12:
			case SectionEnum.MM13:
			case SectionEnum.MM14:
			case SectionEnum.MM15:
			case SectionEnum.MM16:
			case SectionEnum.MM17:
			case SectionEnum.MM18:
			case SectionEnum.MM19:
			case SectionEnum.MM20:
				return true;
		}
		return false;
	}

	static getLabel(section: SectionEnum): LocalizedString {
		switch (true) {
			case SectionFactory.isProduct(section):
				return new LocalizedString({cs: 'Produkt', en: 'Product'});
			case SectionFactory.isCustomer(section):
				return new LocalizedString({cs: 'Zákazník', en: 'Customer'});
			case SectionFactory.isChannel(section):
				return new LocalizedString({cs: 'Kanál', en: 'Channel'});
			default:
				return null;
		}
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
		return null;
	}
}
