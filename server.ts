import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const BOOK_ROUTE = new URLPattern({ pathname: "/entry/:id" });

function handler(req: Request): Response {

  const match = BOOK_ROUTE.exec(req.url);

  if (match) {

    const id = match.pathname.groups.id;

    return new Response(`Entry id ${id}`);

  }

  return new Response('Not found (try /entry/1)', {
    status: 404,
  });

}

serve(handler);
