const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const { REDIS_CONF } = require("./config/db.js");
const index = require("./routes/index");
const userViewRouter = require("./routes/view/user.js");
const errorViewRouter = require("./routes/view/error");

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
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs"
  })
);

// session配置
app.keys = ["JAck_cooL@1995"];
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
app.use(index.routes(), index.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
