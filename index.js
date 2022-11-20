require("./mongo");

const port = process.env.PORT;
const path = require("path");
const express = require("express");
const app = express();
const Sale = require("./models/sales");
const User = require("./models/users");
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const userRouter = require('./controllers/usersController')
const loginRouter = require('./controllers/login');
const salesRouter = require("./controllers/salesController");

let sales = [];

const staticPath = path.join('../client');
app.use(express.static(staticPath));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

Sentry.init({
  dsn: "https://95c4f8e75de94d78b24e6b590cf192c1@o4504163838459904.ingest.sentry.io/4504163841802240",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(staticPath,'index.html'));
});

app.use('/users', userRouter)
app.use('/sales', salesRouter)
app.use('/login', loginRouter)

app.use(Sentry.Handlers.errorHandler());

app.listen(port, function () {
  console.log("Server running at: " + "http://localhost:" + port);
});
