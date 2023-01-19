import { start } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';

import twindPlugin from '$fresh/plugins/twind.ts';
import twindConfig from './twind.config.ts';

import { initializeConnection } from './utils/redis.ts';

await initializeConnection();
await start(manifest, { plugins: [twindPlugin(twindConfig)] });
