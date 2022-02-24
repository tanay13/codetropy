import { IRedisObject } from "../redis/interface";

export interface IConfig {
  ignoreFiles: Array<string>;
  workDir: string;
  verbose: boolean;
  dbConfig: IRedisObject;
}
