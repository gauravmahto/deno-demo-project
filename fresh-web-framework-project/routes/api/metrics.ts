import { HandlerContext } from '$fresh/server.ts';

import { get, set } from '../../utils/redis.ts';

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {

  const bucket1: Array<number> = JSON.parse((await get('bucket1')) ?? JSON.stringify([]));
  const bucket2: Array<number> = JSON.parse((await get('bucket2')) ?? JSON.stringify([]));

  return new Response(`
  Bucket 1 Length - ${bucket1.length}
  Bucket 2 Length - ${bucket2.length}
  Bucket 1 % - ${bucket1.length / (bucket1.length + bucket2.length)}
  Bucket 2 % - ${bucket2.length / (bucket1.length + bucket2.length)}`);

};
