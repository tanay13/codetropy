import { Stats } from "fs";
import path from "path";

import axios from "axios";

import Codetropy from "./services/core";
import { IReturnObject } from "./services/core/interface";

const ignoreFiles = [
  "node_modules",
  ".git",
  "package.json",
  "package-lock.json",
];

const codetropy = new Codetropy({
  ignoreFiles,
  workDir: `${path.join("__dirname", "../../")}`,
  verbose: false,
});

codetropy.fileWatcher.on("change", async (path: string, stats: Stats) => {
  const dataToSend: IReturnObject = {
    fileName: path,
    value: stats.size,
  };

  axios
    .post("http://localhost:8080/data", dataToSend)
    .then(function (response) {
      console.log("Data Sent");
    })
    .catch(function (error) {
      console.log(error);
    });
});
