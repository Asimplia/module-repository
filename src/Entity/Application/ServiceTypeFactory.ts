
import ServiceTypeEnum = require('./ServiceTypeEnum');

export = ServiceTypeFactory;
class ServiceTypeFactory {

	static createServiceTypeEnum(serviceType: string) {
		switch (serviceType) {
			case ServiceTypeEnum[ServiceTypeEnum.GOOGLE_ANALYTICS]:
				return ServiceTypeEnum.GOOGLE_ANALYTICS;
			case ServiceTypeEnum[ServiceTypeEnum.MAILCHIMP]:
				return ServiceTypeEnum.MAILCHIMP;
		}
		return null;
	}
}
