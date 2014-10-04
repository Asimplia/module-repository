
export = StatusDefinition;
var StatusDefinition = {
	dateCreated: Date,
	dateValidTo: Date,
	state: String, // used, declined, remider
	dateNextRemind: Date,
	priorityValue: Number, // define number of coins 1-5
	priorityType: String // define color of coins - green/red
};
