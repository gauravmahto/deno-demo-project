const listener: Deno.Listener = Deno.listen({ port: 8000 });

console.log("http://localhost:8000/");

async function handle(conn: Deno.Conn): Promise<void> {

  const requests: Deno.HttpConn = Deno.serveHttp(conn);

  for await (const { respondWith } of requests) {

    respondWith(new Response("Hello world"));

  }

}

for await (const conn of listener) {

  console.log('Listen: ', listener.addr, listener.rid)

  handle(conn);

}
