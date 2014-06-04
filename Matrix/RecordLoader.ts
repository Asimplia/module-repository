
import AsimpliaRepository = require('../index');

export = RecordLoader;
class RecordLoader {

	private connection;

	constructor() {
		this.connection = AsimpliaRepository.mssqlConnection;
	}

	getByClientId() {

	}
}
