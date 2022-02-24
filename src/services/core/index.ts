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

    let prevVal = await this.redisInit.getValue(filename);
    let prevTotal = await this.redisInit.getValue("total");
    let prevValInt;
    let prevTotalInt = 0;

    if (prevVal != null) {
      prevValInt = parseInt(prevVal);
    } else {
      prevValInt = 0;
    }

    if (prevTotal != null) prevTotalInt = parseInt(prevTotal);

    if (prevValInt < stats.size) {
      let increament = stats.size - prevValInt;
      await this.redisInit.setValue("total", prevTotalInt + increament);
    } else {
      let decreament = prevValInt - stats.size;
      await this.redisInit.setValue("total", prevTotalInt - decreament);
    }

    console.log("Values written in key ['Total']");

    const response = await this.redisInit.setValue(filename, stats.size);

    console.log(`Values written in key[${filename}]`);
  }
}

export default Codetropy;
