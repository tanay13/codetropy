import { Stats } from "fs";
import path from "path";

const ignoreFiles = [
  "node_modules",
  ".git",
  "package.json",
  "package-lock.json",
];

import Codetropy from "./services/core";

const codetropy = new Codetropy({
  ignoreFiles,
  workDir: `${path.join("__dirname", "../")}`,
  verbose: false,
  dbConfig: {
    host: "127.0.0.1",
    port: 6379,
  },
});

codetropy.fileWatcher.on("change", (path: string, stats: Stats) => {
  codetropy.setStat(path, stats);
});
