import { createClient } from 'npm:redis@^4.5';

import redisConf from '../redis-conf.json' assert {type: 'json'};

// make a connection to the local instance of redis
const client = createClient(redisConf);

export const initializeConnection = async () => {

  try {

    await client.connect();

  } catch (error) {

    console.error('Redis Client Error', error);

  }

};

export const isConnectionReady = () => client.isReady;
