import { serve } from './deps.ts'

const route = new URLPattern({ pathname: '/:activity' });

const useIteratorToStream = true;
const delay = 1_000;

let stopStreaming = false;

function* getNumbers(initialNumber = 0) {

  while (!stopStreaming) {

    yield ++initialNumber;

  }

}

function wait(delay: number): Promise<number> {

  return new Promise(resolve => setTimeout(resolve, delay));

}

function iteratorToStream(iterator: Iterator<unknown>): ReadableStream {

  return new ReadableStream({

    async pull(controller) {

      const { value, done } = await iterator.next();

      if (done) {

        controller.close();

      } else {

        if (delay > 0) {

          await wait(delay);

        }

        const message = `It is ${value}\n`;
        controller.enqueue(new TextEncoder().encode(message));

      }

    }

  });

}

function handler(req: Request): Response {

  const match = route.exec(req.url);

  let body;

  if (match) {

    const activity = match.pathname.groups.activity;

    if ('stop' === String(activity).toLowerCase()) {

      stopStreaming = true;

    } else if ('start' === String(activity).toLowerCase()) {

      stopStreaming = false;

    }

    return new Response(`Received request - id: ${activity}`);

  } else {

    let timer: number | undefined = undefined;

    if (useIteratorToStream) {

      body = iteratorToStream(getNumbers(0));

    } else {

      body = new ReadableStream({

        start(controller) {
          timer = setInterval(() => {
            const message = `It is ${new Date().toISOString()}\n`;
            controller.enqueue(new TextEncoder().encode(message));
          }, 1000);
        },

        cancel() {
          if (timer !== undefined) {
            clearInterval(timer);
          }
        }

      });

    }

    return new Response(body, {
      headers: {
        'content-type': 'text/plain',
        'x-content-type-options': 'nosniff'
      },
    });

  }

}

serve(handler);
