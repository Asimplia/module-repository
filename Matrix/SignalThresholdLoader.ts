
import SignalThreshold = require('../Entity/Matrix/SignalThreshold');
import List = require('../Entity/List');

export = SignalThresholdLoader;
class SignalThresholdLoader {

	private thresholds = new List<SignalThreshold>([
		new SignalThreshold('MP2', 'Produktová marže', 3, 5, 5, 11, 1, 2, 3, 4, 'Má vysokou marži a prodává se hodně', 'Má vysokou marži a prodává se málo', 'Má nízkou marži a prodává se hodně', 'Má nízkou marži a prodává se málo')
	]);

	getByMatrixType(type: string): SignalThreshold {
		return this.thresholds.find((threshold: SignalThreshold) => {
			return threshold.Type === type;
		});
	}
}
