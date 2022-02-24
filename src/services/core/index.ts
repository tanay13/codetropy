import { IConfig } from "./interface";
import chokidar from "chokidar";
import { Stats } from "fs";

export class Codetropy {
  ignoreFiles: Array<string>;
  fileWatcher: chokidar.FSWatcher;
  workDir: string;
  constructor(config: IConfig) {
    this.ignoreFiles = [...config.ignoreFiles];
    this.workDir = config.workDir;
    this.fileWatcher = chokidar.watch(this.workDir, {
      ignored: this.ignoreFiles,
      ignoreInitial: true,
      persistent: true,
    });
  }

  checkValues(filename: string, stats: Stats) {
    // DB call
    console.log(filename + " Updated!!");
    console.log(stats);
  }
}
