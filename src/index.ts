import { Stats } from "fs";
import path from "path";

import http from "http";

import Codetropy from "./services/core";

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
  dbConfig: {
    host: "127.0.0.1",
    port: 6379,
  },
});

http
  .createServer((req, res) => {
    if (req.url === "/") {
      const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      };
      res.writeHead(200, headers);
      codetropy.fileWatcher.on("change", async (path: string, stats: Stats) => {
        const dataToSend = await codetropy.setStat(path, stats);
        const data = `data: ${dataToSend}\n\n`;
        res.write(data);
      });
    }
  })
  .listen(8080, () => {
    console.log("Server connected");
  });
