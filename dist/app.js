import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiRouter } from "./routes/index.js";
import { jsonError } from "./common/http/json.js";
import { HttpError } from "./common/errors/http-error.js";
export function createApp() {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json({ limit: "1mb" }));
    app.get("/health", (_req, res) => res.json({ ok: true }));
    app.use("/api", apiRouter);
    app.use((_req, _res, next) => next(new HttpError(404, "Not found")));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err, _req, res, _next) => {
        return jsonError(res, err);
    });
    return app;
}
