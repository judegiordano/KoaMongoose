import NodeCache from "node-cache";
import config from "../helpers/config";

export default new NodeCache(config.CACHE_SETTINGS);
