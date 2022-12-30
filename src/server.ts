import { promisify, serve } from './deps.ts'

function getData(cb: (time: number) => void): void {

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

async function* getNumbers(initialNumber = 0) {

  yield initialNumber;

}

const delayedResponses = {

  delays: [500, 1300, 3500],

  wait(delay: number): Promise<number> {

    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });

  },

  async *[Symbol.asyncIterator]() {

    for (const delay of this.delays) {

      await this.wait(delay);
      yield `Delayed response for ${delay} milliseconds`;

    }

  }

};

const getDataAsync = promisify(getData);

// Non-blocker
// console.log(await getDataAsync());

(async () => {

  for await (const message of delayedResponses) {

    console.log(message);

  }

})();

const BOOK_ROUTE = new URLPattern({ pathname: '/entry/:id' });

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
