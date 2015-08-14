import Publisher from './Publisher';
import Subscriber from './Subscriber';
import Logger from 'js-logger';
import mixin from './utils/mixin';
import $ from 'jquery';
import _ from 'underscore';

const viewsLogger = Logger.get('Views');
const validateConfig = function(config) {
  let errors = 0;

  if(_.isEmpty(config.container)) {
    errors++;
    viewLogger.error('A container element is required for a view');
  }

  if(_.isEmpty(config.template)) {
    errors++;
    viewsLogger.error('A template is required to render a view');
  }

  return errors === 0;
};

class View extends mixin(Publisher, Subscriber) {
  constructor(config = {}) {
    super();
    this.config = config;
    validateConfig(this.config);
  }

  render(context, callback) {
    let template = this.config.template;

    if(_.isEmpty(template)) {
      viewsLogger.error('A template is required to render a view');
      return;
    }

    if(_.isFunction(callback)) {
      callback(template(context || {}));
      return;
    }

    return template(context || {});
  }
}

export default View;
