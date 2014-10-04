
export = ColumnNotExistsInEntityError;
class ColumnNotExistsInEntityError implements Error {

	public name: string;
	
	constructor(public message: string) {
		this.name = 'ColumnNotExistsInEntityError';
	}
}
