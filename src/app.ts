//var createError = require('http-errors');
import createError from 'http-errors';

//var express = require('express');
import express,{Request,Response,NextFunction} from 'express';
//var path = require('path');
import path from 'path';

//add this 
import { fileURLToPath } from 'url';
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';

//var logger = require('morgan');
import morgan from 'morgan';
const logger=morgan('dev');



//var indexRouter = require('./routes/index');
import indexRouter from './routes/index.js';
//var usersRouter = require('./routes/users.js');
import usersRouter from './routes/users.js';

//var app = express();
const app:express.Application=express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
export default app;
