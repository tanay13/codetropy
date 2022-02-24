import redis from "redis";
import { IRedisObject } from "./interface";

class RedisSetup {
  config: IRedisObject;
  redisClient!: redis.RedisClient;

  constructor(configs: IRedisObject) {
    this.config = configs;
    this.dbinit().then(() => {
      console.log("DB connected");
    });
  }

  dbinit() {
    return new Promise((resolve) => {
      this.redisClient = redis.createClient(this.config);
      this.redisClient.on("error", () => {
        console.log("error");
      });
      resolve(this.redisClient);
    });
  }

  setValue(filename: string, value: number) {
    var val = value.toString();

    return new Promise((resolve) => {
      this.redisClient.set(filename, val, (err, reply) => {
        if (err) {
          console.log(err);
        }
        resolve(reply);
      });
    });
  }
}

export default RedisSetup;
