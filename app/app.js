import bootstrap from 'vendor/bootstrap/bootstrap';
import styles from 'styles/app';
import $ from 'jquery';
import objectObserve from 'object.observe';

import routes from 'routes';
import Router from 'lib/Router';
import Logger from 'js-logger';

//import moment from 'moment';
//import numeral from 'numeral';

let router = new Router({
  // router options
});

Logger.useDefaults();
Logger.setLevel(Logger.INFO);
router.addRoutes(routes);

$(window).load(function() {
  router.show(window.location && (window.location.pathname || '/'));
});

window.App = window.App || {
  routes: Object.keys(routes),
  logger: Logger
};
