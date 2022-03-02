import { IConfig } from './interface';
import chokidar from 'chokidar';

class Codetropy {
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
}

export default Codetropy;
