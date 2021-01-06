interface IRateLimitOptions {
	driver: "redis" | "memory";
	db: Map<any, any>;
	duration: number;
	errorMessage: string;
	id: () => string | false,
	headers: {
		remaining: string,
		reset: string,
		total: string
	},
	max: number,
	disableHeader: boolean
}

export default IRateLimitOptions;