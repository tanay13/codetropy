import chokidar from 'chokidar';
import chalk from 'chalk';
import path from 'path';

const ignoreFiles = [
  'node_modules',
  '.git',
  'package.json',
  'package-lock.json',
];

const watcher = chokidar.watch(`${path.join('__dirname', '../')}`, {
  ignored: ignoreFiles,
  ignoreInitial: true,
  persistent: true,
});

// Add event listeners.
watcher
  .on('add', (path) => console.log(chalk.green(`File ${path} has been added`)))
  .on('change', (path) =>
    console.log(chalk.blue(`File ${path} has been changed`))
  )
  .on('unlink', (path) =>
    console.log(chalk.yellow(`File ${path} has been removed`))
  );

// More possible events.
watcher
  .on('addDir', (path) => console.log(`Directory ${path} has been added`))
  .on('unlinkDir', (path) => console.log(`Directory ${path} has been removed`))
  .on('error', (error) => console.log(`Watcher error: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes'));
