import "dotenv/config";
import http from "http";
import { createApp } from "./app.js";
import { initSocketIo } from "./realtime/socketio.js";

const port = Number(process.env.PORT ?? 4000);
const app = createApp();

const server = http.createServer(app);
initSocketIo(server);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on :${port}`);
});

