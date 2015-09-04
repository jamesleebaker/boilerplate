import Publisher from './Publisher';
import eventBus from './EventBus';
import Logger from 'js-logger';
import _ from 'underscore';

const modelLogger = Logger.get('Model');

class Model extends Publisher {
  constructor(namespace, state) {
    super();
    this.state = {};
    this.namespace = namespace || 'model';
  }

  unset(key) {
    if(!_.isEmpty(key)) {
      this.state[key] = undefined;
      this.publish(`${this.namespace}:unset:${key}`, this.state);
    }
  }

  change(key, value) {
    if(_.isEmpty(key)) {
      return;
    }

    this.state[key] = value;
    this.publish(`${this.namespace}:change:${key}`, value, this.state);
  }

  get(...keys) {
    let numOfResults;
    const results = _.pick(this.state, (value, key, obj) => {
      if(keys.indexOf(key) >= 0) {
        this.publish(`${this.namespace}:get:${key}`, value, this.state);
        return true;
      }
    });

    numOfResults = Object.keys(results).length;

    if(numOfResults > 1) {
      return results;
    }

    return results[keys[0]];
  }

  set(key, value) {
    if(_.isEmpty(key)) {
      return;
    }

    if(!_.isEmpty(this.state[key])) {
      this.state[key] = value;
      this.publish(`${this.namespace}:set:${key}`, value, this.state);
      return;
    }

    this.change(key, value);
  }

  setState(properties) {
    if(!_.isObject(properties)) {
      throw new TypeError('Properties must be in object format');
    }

    this.state = properties;
    this.publish(`${this.namespace}:setState`, this.state);
  }

  getState() {
    this.publish(`${this.namespace}:getState`, this.state);
    return this.state;
  }

  broadcastChanges(changes) {
    modelLogger.info(`The following model changes on ${this.namespace} have occured:`);
    modelLogger.info(changes);

    this.publish(`${this.namespace}:change`, changes);
  }
}

export default Model;
