import Publisher from './Publisher';
import Logger from 'js-logger';

const pubSubLogger = Logger.get('PubSub');

class Subscriber {
  constructor() {}
  subscribe(obj, eventName, callback) {
    const args = Array.prototype.slice.call(arguments, 1);

    if(!('registerEvent' in obj)) {
      pubSubLogger.error('You are trying to subscribe to an object that is not a publisher');
      return;
    }
    
    pubSubLogger.info(`Event name "${eventName}" was subscribed to`);
    obj.registerEvent.apply(obj, args);
  }

  listenTo(obj, eventName, callback) {
      this.subscribe(obj, eventName, callback);
  }

  unsubscribe(obj, eventName, callback) {
    const args = Array.prototype.slice.call(arguments, 1);

    if(!('unregisterEvent' in obj)) {
      pubSubLogger.error('You are trying to unsubscribe from an object that is not a publisher');
      return;
    }

    obj.unregisterEvent.apply(obj, args);
    pubSubLogger.info(`Event name "${eventName}" was unsubscribed from`);
  }
}

export default Subscriber;
