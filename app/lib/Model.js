import Publisher from './Publisher';
import objectObserve from 'object.observe';
import eventBus from './EventBus';
import Logger from 'js-logger';
import _ from 'underscore';

const modelLogger = Logger.get('Model');

class Model extends Publisher {
  constructor(namespace, state) {
    super();
    this.namespace = namespace || 'model';
    this.setState(state);
    Object.observe(this, this.broadcastChanges.bind(this));
  }

  setState(properties) {
    if(!_.isObject(properties)) {
      modelLogger.error('Properties must be in object format');
      return;
    }

    _.defaults(this, properties);
  }

  broadcastChanges(changes) {
    modelLogger.info(`The following model changes on ${this.namespace} have occured:`);
    modelLogger.info(changes);
    
    eventBus.publish(this.namespace, changes);
  }
}

export default Model;
