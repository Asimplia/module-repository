
import AsimpliaRepository = require('../index');

export = SignalRecorder;
class SignalRecorder {

	private connection;

	constructor() {
		this.connection = AsimpliaRepository.mssqlConnection;
	}
}