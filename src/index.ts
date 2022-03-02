import path from 'path';

import axios from 'axios';

import Codetropy from './services/core';
import { IReturnObject } from './services/core/interface';

const ignoreFiles = ['../node_modules', '../src', '.git', '../package.json', '../package-lock.json'];

export default function work() {
  const codetropy = new Codetropy({
    ignoreFiles,
    workDir: `${path.join('__dirname', '../')}`,
    verbose: false,
  });

  codetropy.fileWatcher.on('change', async (path: string, stats: any) => {
    const dataToSend: IReturnObject = {
      fileName: path,
      value: stats.size,
    };

    axios
      .post('http://localhost:8080/data', dataToSend)
      .then(function (response) {
        console.log('Data Sent');
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
