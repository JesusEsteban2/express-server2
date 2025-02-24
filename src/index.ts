import { createServer } from 'node:http';
import createDebug from 'debug';
import { listenManager } from './server/listen-manager.js';
import { errorManager } from './server/error-manager.js';
import { createApp } from './app.js';
<<<<<<< HEAD
=======
// import { connectMySQL } from './server/connect.db.js';
import { loadEnvFile } from 'node:process';
>>>>>>> refs/remotes/origin/main

const debug = createDebug('demo:server');
debug('Iniciando servidor...');
const PORT = process.env.PORT || 3000;

try {
  const server = createServer(createApp());
  server.listen(PORT);
  server.on('listening', () => listenManager(server));
  server.on('error', errorManager);
<<<<<<< HEAD
} catch (err) {
  console.error('Error connecting to DB:', err);
=======
} catch (error) {
  console.error('Error connecting to DB:', error);
>>>>>>> refs/remotes/origin/main
  process.exit(1);
}
