

interface Each {
	paused;
	readable;
	started;
	done;
	total;
	on(eventName: string, onCallback: Function);
	on(eventName: "item", onItem: (item: any, next: (error?: Error) => void) => void);
	on(eventName: "error", onError: (error: Error[]) => void);
	on(eventName: "error", onError: (error: Error) => void);
	on(eventName: "both", onBoth: (error?: Error[]) => void);
	on(eventName: "end", onEnd: () => void);
	parallel(mode: number);
	parallel(mode: boolean);
	shift(items: any[]);
	write(items: any[]);
	unshift(items: any[]);
	end();
	times();
	repeat();
	sync();
	files(glob: any);
	files(base: any, glob: any);
}

interface EachStatic {
	(array: any[]): Each;
}

declare var each: EachStatic;

declare module "each" {
	export = each;
}