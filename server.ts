import { promisify } from 'https://deno.land/x/promisify/mod.ts';

function getAsyncData(cb: (time: number) => void): void {

  const createTimeout = () => {

    const time = Number(Math.random().toPrecision(2)) * 1000;

    const timer = setTimeout(() => {

      cb(time);

      clearTimeout(timer);

      createTimeout();

    }, time);

  };

  createTimeout();

}

const getDataAsync = promisify(getAsyncData);

// Non-blocker
// console.log(await getDataAsync());

// Blocker
for await (const time of getDataAsync()) {

  console.log(time);

}

const listener: Deno.Listener = Deno.listen({ port: 8000 });

console.log('http://localhost:8000/');

async function handle(conn: Deno.Conn): Promise<void> {

  const requests: Deno.HttpConn = Deno.serveHttp(conn);

  for await (const { respondWith } of requests) {

    respondWith(new Response('Hello world'));

  }

}

for await (const conn of listener) {

  console.log('Listen: ', listener.addr, listener.rid);

  handle(conn);

}
