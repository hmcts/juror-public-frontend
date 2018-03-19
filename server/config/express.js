/**
 * Express configuration
 */

;(function(){
  'use strict';

  var express = require('express')
    , session = require('express-session')
    , nunjucks = require('express-nunjucks')
    , cookieParser = require('cookie-parser')
    , csrf = require('csurf')
    , helmet = require('helmet')
    , referrerPolicy = require('referrer-policy')
    , compression = require('compression')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , errorHandler = require('errorhandler')
    , path = require('path')
    , i18n = require('i18n-express')

    , filters = require('../components/filters')
    , texts = require('../../client/js/i18n/en.json')
    , config = require('./environment')()
    , utils = require('../lib/utils.js')
    , menuBuilder = require(__dirname + '/../menubuilder')
    , sessionExpires
    , sessionConfig = {}

    // Grab environment variables to enable/disable certain services
    , pkg = require(__dirname + '/../../package.json')
    , releaseVersion = pkg.version
    , env = process.env.NODE_ENV || 'development'
    , useAuth = process.env.USE_AUTH || config.useAuth
    , useHttps = process.env.USE_HTTPS || config.useHttps

    // Basic Auth credentials
    , basicAuthUsername = process.env.USERNAME
    , basicAuthPassword = process.env.PASSWORD;


  function configureSecurity(app) {
    app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ['\'self\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\''],
        scriptSrc: ['\'self\'', 'cdnjs.cloudflare.com', 'https://www.google-analytics.com', '\'unsafe-inline\''],
        fontSrc: ['\'self\'', 'data:'],
        imgSrc: ['\'self\'', 'https://www.google-analytics.com'],
        connectSrc: ['\'self\'', 'ws://localhost:*']
      }
    }));
    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noCache());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(referrerPolicy());
  }

  function configureRequests(app) {
    // Serve all static files
    app.use(express.static(app.get('appPath')));

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
  }

  function configureSessions(app) {
    // Configure sessions
    sessionExpires = 10 * (60 * 60);

    sessionConfig = {
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      maxAge: sessionExpires,
      name : 'sessionId',
      cookie: {
        httpOnly: true
      }
    };

    app.use(session(sessionConfig));


    // CSRF Protection
    app.use(csrf());
  }

  function configureTemplating(app) {
    // Configure translations
    app.use(i18n({
      translationsPath: path.join(config.root, 'client', 'js', 'i18n'),
      browserEnable: false,
      defaultLang: 'en',
      paramLangName: 'clang',
      siteLangs: ['en', 'cy']
    }));

    // Setup templating engine
    app.set('view engine', 'njk');
    app.set('views', [path.join(app.get('appPath'), 'templates')]);

    nunjucks(app, {
      autoescape: true,
      watch: true,
      noCache: true,
      filters: filters,
    });
  }


  module.exports = function(app) {
    // Used to show service title
    var serviceTitleExcludedUrls = ['/', '/start'];

    // Ensure provided environment values are lowercase
    env = env.toLowerCase();
    useAuth = useAuth.toLowerCase();
    useHttps = useHttps.toLowerCase();


    // Base Path of the client folder
    app.set('appPath', path.join(config.root, 'client'));


    // Set up parts of express
    configureSecurity(app);
    configureRequests(app);
    configureSessions(app);
    configureTemplating(app);


    // Send data to all views
    app.use(function(req, res, next) {
      res.locals.assetPath = '/';
      res.locals.releaseVersion = 'v' + releaseVersion;
      res.locals.csrftoken = req.csrfToken();
      res.locals.trackingCode = config.trackingCode;

      // eslint-disable-next-line
      res.locals.cookieText = filters.translate('INTERFACE.COOKIE_MESSAGE', texts);

      if (serviceTitleExcludedUrls.indexOf(req.originalUrl) === -1) {
        // res.locals.serviceName = config.serviceName;
        res.locals.serviceName = filters.translate('INTERFACE.SERVICE_TITLE', texts)
      }

      res.locals.IS_PRODUCTION = (config.env === 'production');

      // Construct our menu
      res.locals.headerMenu = menuBuilder(req, app, 'header');

      next();
    });


    // Modify request body to strip out white spaces
    app.use(function(req, res, next) {
      var bodyKey;

      if (!req.body) {
        next();
      }

      for (bodyKey in req.body) {
        if (req.body.hasOwnProperty(bodyKey) && typeof req.body[bodyKey] === 'string' && req.body[bodyKey].length > 0) {
          req.body[bodyKey] = req.body[bodyKey].trim();
        }
      }

      next();
    });


    // Authenticate against the environment-provided credentials, if running
    // the app in production
    if (env === 'production' && useAuth === 'true'){
      app.use(utils.basicAuth(app.logger, basicAuthUsername, basicAuthPassword, require('basic-auth')));
    }


    // error handler
    app.use(function(err, req, res, next) {
      // If error is not csrf, then we don't need to handle it
      if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
      }

      // Ensure any template global variables needed are available.
      res.locals.assetPath = '/';
      res.locals.releaseVersion = 'v' + releaseVersion;
      res.locals.trackingCode = config.trackingCode;

      // eslint-disable-next-line
      res.locals.cookieText = filters.translate('INTERFACE.COOKIE_MESSAGE', texts);

      // handle CSRF token errors here
      return res.render('_errors/403.njk');
    });


    // Configure Error Handling, has to be last
    if ('development' === env || 'test' === env) {
      app.use(errorHandler());
    }

  };

})();
