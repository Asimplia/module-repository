
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

	toArray(objectFactory: (entity: Entity) => any) {
		var array = [];
		this.entities.forEach((entity: Entity) => {
			array.push(objectFactory(entity));
		});
		return array;
	}
}