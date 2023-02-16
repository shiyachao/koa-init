import Koa from "koa";
const app = new Koa();
import views from "koa-views";
import json from "koa-json";
import onerror from "koa-onerror";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";
import RequestFilter from "./core/request/requestFilter";
import routes from "./routes";
import ResponseFilter from "./core/response/responseFilter";
import ExceptionFilter from "./core/exception/exceptionFilter";
import mongoose from "mongoose";
import { DataBaseConfig } from "./core/context/sys_context";

//db
const { db_uri, db_user, db_pass, db_name } = DataBaseConfig;
mongoose.set("strictQuery", true);
mongoose.connect(db_uri, {
  user: db_user,
  pass: db_pass,
  dbName: db_name,
  autoIndex: false,
});
// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);
app.use(ExceptionFilter);
app.use(RequestFilter);
app.use(ResponseFilter);
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
routes.forEach((route) => {
  // route.prefix("/api");
  app.use(route.routes(), route.allowedMethods());
});
// app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("无法捕获的异常");
  console.error("server error", err, ctx);
});

module.exports = app;
