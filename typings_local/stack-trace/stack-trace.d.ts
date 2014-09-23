
interface StackTrace {
	getTypeName(): string;
	getFunctionName(): string;
	getMethodName(): string;
	getFileName(): string;
	getLineNumber(): string;
	getColumnNumber(): string;
	isNative(): string;
}

interface StackTraceStatic {
	get(): StackTrace[];
}

declare var stackTrace: StackTraceStatic;

declare module "stack-trace" {
	export = stackTrace;
}
