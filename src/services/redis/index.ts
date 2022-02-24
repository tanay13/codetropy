import redis from "redis";
import { IRedisObject } from "./interface";

class RedisSetup {
  config: IRedisObject;
  redisClient!: redis.RedisClient;

  constructor(configs: IRedisObject) {
    this.config = {
      host: configs.host,
      password: configs.password,
      port: configs.port,
    };
  }

  dbinit() {
    this.redisClient = redis.createClient(this.config);

    this.redisClient.on("error", () => {
      console.log("error");
    });
  }
}
