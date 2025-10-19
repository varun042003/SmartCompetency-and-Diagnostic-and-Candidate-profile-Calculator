import serverless from "serverless-http";
import { createServer } from "../server/index";

// Create the express app and export a serverless handler for Vercel functions
const app = createServer();

export default serverless(app);
