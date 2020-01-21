const Koa = require("koa");
const path = require("path");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const { REDIS_CONF } = require("./config/db");
const blogViewRouter = require("./routes/view/blog");
const userViewRouter = require("./routes/view/user");
const userApiRouter = require("./routes/api/user");
const utilsApiRouter = require("./routes/api/utils");

const errorViewRouter = require("./routes/view/error");

const { SESSION_SECRET_KEY } = require("./config/secretKeys");

// error handler
let onerrorConf = {};
if (process.env.NODE_ENV === "production") {
  // 生产环境redirect error page，开发环境抛出error
  onerrorConf = {
    redirect: "/error"
  };
}

onerror(app, onerrorConf);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + "/public"));
app.use(koaStatic(path.join(__dirname, "..", "uploadFiles"))); // 上传文件目录

app.use(
  views(__dirname + "/views", {
    extension: "ejs"
  })
);

// session配置
app.keys = [SESSION_SECRET_KEY];
app.use(
  session({
    key: "forum.sid", // cookie name
    prefix: "forum:sess:", // redis key的前缀
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // ms
    },
    ttl: 24 * 60 * 60 * 1000, // ms
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
