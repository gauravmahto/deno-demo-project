// Just for type-info.
import { ScriptsConfiguration } from "https://deno.land/x/velociraptor@1.2.0/mod.ts";

export default <ScriptsConfiguration>{

  scripts: {

    start: "deno run --allow-net server.ts",
    test: "deno test --allow-net server_test.ts"

  }

}
