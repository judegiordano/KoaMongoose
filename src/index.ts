import cluster from "cluster";
import app from "./services/server";
import connect from "./helpers/db";
import config from "./helpers/config";
import logger from "./services/logger";

const start = async (): Promise<void> => {
	try {
		await connect();
	} catch (e) {
		logger.info(e);
		throw Error(e);
	}
	app.listen(config.PORT, () => {
		logger.info(`worker started under ${config.NODE_ENV} environment`);
		logger.info(`http://localhost:${config.PORT}`);
	});
};

if (cluster.isMaster) {
	for (let i: number = 0; i < config.CORES; i++) {
		cluster.fork();
	}
}
else {
	start();
}