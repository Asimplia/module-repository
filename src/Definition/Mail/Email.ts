
export = Email;
var Email = {
	dateCreated: Date,
	from: {
		name: String,
		email: String
	},
	to: {
		name: String,
		email: String
	},
	replyTo: {
		name: String,
		email: String
	},
	subject: String,
	dateWhen: Date,
	dateSent: Date,
	body: String,
	preview: String,
	source: String,
	domain: String,
	priority: Number,
	log: [{
		dateRecorded: Date,
		type: String,
		message: String
	}]
};
