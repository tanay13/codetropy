#!/usr/bin/env node

const command = process.argv[2];
const pwd = process.cwd();
import work from './index';

switch (command) {
  case 'start':
    work(pwd);
    break;
  default:
    console.log('Wrong command');
}
