import Publisher from './Publisher';
import Subscriber from './Subscriber';
import Logger from 'js-logger';
import mixin from './utils/mixin';
import when from 'when';
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
    this.bindings = [];

    if(validateConfig(this.config)) {
      this.container = document.querySelector(this.config.container);
    }
  }

  addBinding(selector, eventName, handler) {
    this.bindings.push({
      event: eventName,
      selector: selector,
      handler
    });

    $(this.container).on(eventName, selector, handler);
  }

  getBinding(selector, eventName) {
    return _.findWhere(this.bindings, {
      event: eventName,
      selector: selector
    });
  }

  removeBinding(selector, eventName, handler) {
    let binding = this.getBinding(selector, eventName);

    this.bindings.splice(this.bindings.indexOf(binding), 1);
    $(this.container).off(eventName, selector, handler);
  }

  query(selector) {
    return document.querySelector(selector);
  }

  queryAll(selector) {
    return document.querySelectorAll(selector);
  }

  getValueFromEvent(event) {
    return this.getElementValue(event.target);
  }

  getElementValue(element) {
    const $element = $(element);

    return $element.is('input, select, textarea') ? $element.val() : $element.text();
  }

  destroy() {
    _.each(this.bindings, binding => {
      $(this.container).off(binding.eventName, binding.selector, binding.handler);
    });

    this.bindings = [];
    this.remove();
  }

  remove(transition) {
    const removeNode = function() {
      return this.container.parentNode.removeChild(this.container);
    };

    if(_.isFunction(transition)) {
      transition().then(() => removeNode);
      return;
    }

    removeNode();
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
