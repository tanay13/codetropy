#!/usr/bin/env node

const command = process.argv[2];
import work from './index';

switch (command) {
  case 'start':
    work();
    break;
  default:
    console.log('Wrong command');
}
