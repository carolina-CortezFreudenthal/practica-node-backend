const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
swaggerJsdoc = require('swagger-jsdoc');

const indexRouter = require('./routes/index');
const anunciosRouter = require('./routes/api/anuncios');
const tagsRouter = require('./routes/api/tags');

require('./lib/connect-mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NODEPOP',
      version: '0.1.0',
      description:
        'Proyecto Backend Keep Coding',
    },
  },
  apis: ['./routes/api/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/', indexRouter);
app.use(express.static('public'));

app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs),
);

app.use(
    '/api/anuncios',
    anunciosRouter,
);

app.use(
    '/api/tags',
    tagsRouter,
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({'status': 'Not Found'});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
