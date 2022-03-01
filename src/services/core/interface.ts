export interface IConfig {
  ignoreFiles: Array<string>;
  workDir: string;
  verbose: boolean;
}

export interface IReturnObject {
  fileName: string;
  value: number;
}
