
export = IChecklistSourcesObject;
interface IChecklistSourcesObject {
	heurekaXml: {
		createdAt: Date;
		uri: string;
		processingStartedAt: Date;
		processedAt: Date;
		failedAt: Date;
	};
	zboziXml: {
		createdAt: Date;
		uri: string;
		processingStartedAt: Date;
		processedAt: Date;
		failedAt: Date;
	};
}
