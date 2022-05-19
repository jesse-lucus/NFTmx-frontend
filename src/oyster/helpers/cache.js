import fs from 'fs';
import path from 'path';
import { CACHE_PATH } from './constants';

export function cachePath(
  env,
  cacheName,
  cPath = CACHE_PATH,
  legacy = false,
) {
  const filename = `${env}-${cacheName}`;
  return path.join(cPath, legacy ? filename : `${filename}.json`);
}

export function loadCache(
  cacheName,
  env,
  cPath = CACHE_PATH,
  legacy = false,
) {
  const path = cachePath(env, cacheName, cPath, legacy);

  if (!fs.existsSync(path)) {
    if (!legacy) {
      return loadCache(cacheName, env, cPath, true);
    }
    return undefined;
  }

  return JSON.parse(fs.readFileSync(path).toString());
}

export function saveCache(
  cacheName,
  env,
  cacheContent,
  cPath = CACHE_PATH,
) {
  cacheContent.env = env;
  cacheContent.cacheName = cacheName;
  fs.writeFileSync(
    cachePath(env, cacheName, cPath),
    JSON.stringify(cacheContent),
  );
}
