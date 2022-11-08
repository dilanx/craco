import fs from 'fs';
import { log } from './logger';

export const projectRoot = fs.realpathSync(process.cwd());

log('Project root path resolved to: ', projectRoot);
