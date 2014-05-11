
import IEntity = require('../IEntity');

export = Graph;
class Graph implements IEntity {
	constructor(
		private type: string,
		private data: string
	) { }

	static fromObject(object: any): Graph {
		return new Graph(object.type, object.data);
	}

	static toObject(entity: Graph) {
		return {
			type: entity.type,
			data: entity.data
		};
	}

	toObject() {
		return Graph.toObject(this);
	}
}
