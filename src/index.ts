import { createServer } from 'node:http';
import createDebug from 'debug';
import { listenManager } from './server/listen-manager.js';
import { errorManager } from './server/error-manager.js';
import { createApp } from './app.js';
// import { connectMySQL } from './server/connect.db.js';
import { loadEnvFile } from 'node:process';

loadEnvFile();

const debug = createDebug('App:server');
debug('Iniciando servidor...');
const PORT = process.env.SERVER_PORT || 3000;

try {
  const server = createServer(createApp());
  server.listen(PORT);
  server.on('listening', () => listenManager(server));
  server.on('error', errorManager);
} catch (error) {
  console.error('Error connecting to DB:', error);
  process.exit(1);
}
