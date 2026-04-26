import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { corsOptions } from "./config/cors";
import router from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

app.use(errorMiddleware);

export default app;