import chokidar from 'chokidar';
import path from 'path';

const watcher = chokidar.watch(`${path.join('__dirname', '../')}`, {
  persistent: true,
});

// Add event listeners.
watcher
  .on('add', (path) => console.log(`File ${path} has been added`))
  .on('change', (path) => console.log(`File ${path} has been changed`))
  .on('unlink', (path) => console.log(`File ${path} has been removed`));

// More possible events.
watcher
  .on('addDir', (path) => console.log(`Directory ${path} has been added`))
  .on('unlinkDir', (path) => console.log(`Directory ${path} has been removed`))
  .on('error', (error) => console.log(`Watcher error: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes'));
