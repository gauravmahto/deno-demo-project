import { connect, Redis, RedisValue, SetOpts } from 'redis/mod.ts';

import redisConf from '../redis-conf.json' assert {type: 'json'};

let redis: Redis;

export const initializeConnection = async () => {

  try {

    redis = await connect(redisConf);

  } catch (error) {

    console.error('Redis Client Error', error);

  }

};

export const set = async (key: string, value: RedisValue, options?: SetOpts) => {

  if (typeof redis !== 'undefined') {

    return await redis.set(key, value, options);

  }

};

export const get = async (key: string) => {

  if (typeof redis !== 'undefined') {

    return await redis.get(key);

  }

};
