import routes from 'routes';
import Router from 'lib/Router';
import styles from 'styles/app';
import Logger from 'js-logger';
import $ from 'jquery';
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

module.exports = {
  router: router
};
