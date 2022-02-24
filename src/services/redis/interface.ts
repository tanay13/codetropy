export interface IRedisObject {
  host: string;
  port: number;
  password: string;
}


export interface IRedisClient  {
    
    client:redis.RedisClientType<{
    graph: {
        CONFIG_GET: typeof import("/home/tanay/Desktop/explore/codetropy/node_modules/@node-redis/graph/dist/commands/CONFIG_GET");
        configGet: typeof import("/home/tanay/Desktop/explore/codetropy/node_modules/@node-redis/graph/dist/commands/CONFIG_GET");
        ... 15 more ...;
        slowLog: typeof import("/home/tanay/Desktop/explore/codetropy/node_modules/@node-redis/graph/dist/commands/SLOWLOG");
    };
    ... 6 more ...;
    topK: {
        ...;
    };
}, redis.RedisScripts>}