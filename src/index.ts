import path from 'path';

import axios from 'axios';

import Codetropy from './services/core';
import { IReturnObject } from './services/core/interface';
import { findTeam, saveTeam } from './services/actions';

export default async function work(pwd: string, teamName: string) {
  try {
    const ifTeam = await findTeam(teamName);

    if (ifTeam) return;

    const saveT = await saveTeam(teamName);

    const ignoreFiles = [
      `${path.join(pwd, '/node_modules')}`,
      `${path.join(pwd, '/.git')}`,
      `${path.join(pwd, '/package.json')}`,
      `${path.join(pwd, '/package-lock.json')}`,
    ];

    console.log('Codetropy is running....');

    const codetropy = new Codetropy({
      ignoreFiles,
      workDir: `${path.join(pwd, '/')}`,
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
  } catch (e) {
    console.error(e);
  }
}
