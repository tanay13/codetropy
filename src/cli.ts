#!/usr/bin/env node

const command = process.argv[2];

import { askQuestion } from './services/inquire';

switch (command) {
  case 'start':
    askQuestion();
    break;
  default:
    console.log('Wrong command');
}
