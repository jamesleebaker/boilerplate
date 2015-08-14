import page from 'page';
import _ from 'underscore';
import Logger from 'js-logger';

const routerLogger = Logger.get('Router');
let instance = null;

function formatMessage(route, action) {
  return `${route} has been ${action}`;
}

class Router {
  constructor(options) {
    if(!instance){
      instance = this;
      this.paths = [];
    }

    if(!_.isEmpty(window.document) && _.isObject(options)) {
      page(options);
    }

    return instance;
  }

  addRoute(path, handler) {
    if(_.isString(path)) {
      this.paths.push(path);
      routerLogger.info(formatMessage(path, 'added'));
      return page.apply(page, arguments);
    }
  }

  redirect(fromPath, toPath) {
    routerLogger.info(formatMessage(fromPath, `redirected to ${toPath}`));
    return page.redirect.apply(page, arguments);
  }

  show(path) {
    routerLogger.info(formatMessage(path, 'shown'));
    return page.show.apply(page, arguments);
  }

  stop() {
    routerLogger.info(formatMessage('"popstate" and "click" handlers', 'stopped'));
    return page.stop.apply(page, arguments);
  }

  base(path) {
    routerLogger.info(formatMessage(`base path of ${path}`, 'changed'));
    return page.base.apply(page, arguments);
  }

  exit(path) {
    routerLogger.info(formatMessage(path, 'exited'));
    return page.exit.apply(page, arguments);
  }
  addRoutes(routes) {
    if(_.isObject(routes)) {
      _.each(routes, (value, key) => {
        this.addRoute(key, value);
      });
    }
  }
}

export default Router;
