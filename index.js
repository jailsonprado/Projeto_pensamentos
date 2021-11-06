const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

// Models
const Tought = require('./models/Tought');
const User = require('./models/User');

// Import Routes
const toughtRoutes = require('./routes/tougthsRoutes');
const authRoutes = require('./routes/authRoutes');

// import controller
const ToughtController = require('./controllers/ToughtController');

// Template Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
// Session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
      // em prod usar https
    },
  }),
);

// Flash messages
app.use(flash());

// public path
app.use(express.static('public'));

// set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

// Routes
app.use('/toughts', toughtRoutes);
app.use('/', authRoutes);

app.get('/', ToughtController.showToughts);

conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
