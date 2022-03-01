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
  workDir: `${path.join("__dirname", "../")}`,
  verbose: false,
});

codetropy.fileWatcher.on("change", async (path: string, stats: Stats) => {
  // const dataToSend = await codetropy.setStat(path, stats);
  // console.log(dataToSend);

  const dataToSend: IReturnObject = {
    fileName: path,
    value: stats.size,
  };

  axios
    .post("http://localhost:8080/data", dataToSend)
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// http
//   .createServer((req, res) => {
//     if (req.url === "/") {
//       const headers = {
//         "Content-Type": "text/event-stream",
//         Connection: "keep-alive",
//         "Access-Control-Allow-Origin": "*",
//         "Cache-Control": "no-cache",
//       };
//       res.writeHead(200, headers);
//       codetropy.fileWatcher.on("change", async (path: string, stats: Stats) => {
//         const dataToSend = await codetropy.setStat(path, stats);
//         const data = `data: ${dataToSend}\n\n`;
//         res.write(data);
//       });
//     }
//   })
//   .listen(8080, () => {
//     console.log("Server connected");
//   });
