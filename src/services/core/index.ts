import { IConfig } from "./interface";
import chokidar from "chokidar";
import { Stats } from "fs";
import RedisSetup from "../redis";

class Codetropy {
  ignoreFiles: Array<string>;
  fileWatcher: chokidar.FSWatcher;
  workDir: string;
  redisInit: RedisSetup;

  constructor(config: IConfig) {
    this.ignoreFiles = [...config.ignoreFiles];
    this.workDir = config.workDir;
    this.fileWatcher = chokidar.watch(this.workDir, {
      ignored: this.ignoreFiles,
      ignoreInitial: true,
      persistent: true,
    });

    this.redisInit = new RedisSetup(config.dbConfig);
  }

  async setStat(filename: string, stats: Stats) {
    // DB call

    const response = await this.redisInit.setValue(filename, 10);

    console.log(stats);
  }
}

export default Codetropy;
