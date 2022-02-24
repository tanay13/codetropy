import { Stats } from "fs";

export interface IConfig {
  ignoreFiles: Array<string>;
  workDir: string;
  verbose: boolean;
}
