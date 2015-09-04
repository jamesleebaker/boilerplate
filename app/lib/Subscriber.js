import Publisher from './Publisher';
import Logger from 'js-logger';

const pubSubLogger = Logger.get('PubSub');

class Subscriber {
  constructor() {}
  subscribe(obj, eventName, ...callbacks) {
    if(!('registerEvent' in obj)) {
      throw new TypeError('You are trying to subscribe to an object that is not a publisher');
    }

    pubSubLogger.info(`Event name "${eventName}" was subscribed to`);
    obj.registerEvent.apply(obj, callbacks);
  }

  listenTo(obj, eventName, callback) {
      this.subscribe(obj, eventName, callback);
  }

  unsubscribe(obj, eventName, ...callbacks) {
    if(!('unregisterEvent' in obj)) {
      throw new TypeError('You are trying to unsubscribe from an object that is not a publisher');
    }

    obj.unregisterEvent.apply(obj, callbacks);
    pubSubLogger.info(`Event name "${eventName}" was unsubscribed from`);
  }
}

export default Subscriber;
