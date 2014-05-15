
export = Repository;
module Repository {
	export function connect(dsn: string) {
		require('mongoose').connect(dsn);
	}
}
