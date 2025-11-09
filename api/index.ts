import serverless from "serverless-http";
import serverless from "serverless-http";

// Try to dynamically import the server module from several possible locations
async function loadCreateServer(): Promise<{ createServer: () => any }> {
  const candidates = [
    // Common ESM outputs
    "../server/index.js",
    "../server/index.cjs",
    "./server/index.js",
    "./server/index.cjs",
    // Built outputs that some builders use
    "../dist/server/node-build.mjs",
    "../dist/server/index.js",
    "../dist/server/index.mjs",
  ];

  for (const p of candidates) {
    try {
      // dynamic import
      // eslint-disable-next-line no-await-in-loop
      const mod = await import(p as string);
      if (mod && (mod.createServer || mod.default?.createServer)) {
        return { createServer: mod.createServer || mod.default.createServer } as any;
      }
    } catch (err) {
      // skip
    }
  }
  throw new Error("Could not locate server module (createServer)");
}

let _handler: any = null;

export default async function handler(req: any, res: any) {
  try {
    if (!_handler) {
      const mod = await loadCreateServer();
      const app = mod.createServer();
      _handler = serverless(app);
    }
    return _handler(req, res);
  } catch (err) {
    console.error("Failed to initialize serverless handler:", err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ message: "Server initialization error" }));
  }
}
