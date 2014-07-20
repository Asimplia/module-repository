import SectionEnum = require('./SectionEnum');

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
			case SectionEnum[SectionEnum.CHANNEL]:
				return SectionEnum.CHANNEL;
			case SectionEnum[SectionEnum.MM1]:
				return SectionEnum.MM1;
			case SectionEnum[SectionEnum.MM2]:
				return SectionEnum.MM2;
			case SectionEnum[SectionEnum.MM3]:
				return SectionEnum.MM3;
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
				return true;
		}
		return false;
	}
}
