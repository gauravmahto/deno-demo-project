import { HandlerContext } from '$fresh/server.ts';

import utils from '../../utils/index.ts';

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const randomNumber = Math.floor(Math.random() * 10);
  const body = String(randomNumber);
  return new Response(body);
};
