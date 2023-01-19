import { HandlerContext } from '$fresh/server.ts';

import { get, set } from '../../utils/redis.ts';

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const randomNumber = Math.floor(Math.random() * 10);

  if (randomNumber < 7) {

    const bucket1 = (await get('bucket1')) ?? JSON.stringify([]);

    const numbers: Array<number> = JSON.parse(bucket1);

    numbers.push(randomNumber);

    await set('bucket1', JSON.stringify(numbers));

  } else {

    const bucket2 = (await get('bucket2')) ?? JSON.stringify([]);

    const numbers: Array<number> = JSON.parse(bucket2);

    numbers.push(randomNumber);

    await set('bucket2', JSON.stringify(numbers));

  }

  return new Response(String(randomNumber));

};
