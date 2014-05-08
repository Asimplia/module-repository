
import IEntity = require('./IEntity');

export = List;
class List<Entity extends IEntity> {
	private entities: Entity[] = [];

	pushArray(items: any[], entityFactory: (o: any) => Entity) {
		items.forEach((item) => {
			this.entities.push(entityFactory(item));
		});
		return this;
	}

	push(item: Entity): List<Entity> {
		this.entities.push(item);
		return this;
	}

	toArray() {
		return this.entities;
	}
}