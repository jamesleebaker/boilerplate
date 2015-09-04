import Logger from 'js-logger';
import _ from 'underscore';

const pubSubLogger = Logger.get('PubSub');
const tokenizeEventName = function(event) {
  const tokens = String(event).split(':');

  return {
    role: tokens[0],
    entity: tokens[1],
    event: tokens[2]
  };
};

class Publisher {
  constructor() {
    this.events = {};
  }

  registerEvent(eventName, callback) {
    const callbacks = Array.prototype.slice.call(arguments, 1);

    if(_.isEmpty(eventName)) {
      throw new TypeError('You must provide an event name when registering an event');
    }

    this.events[eventName] = callbacks;

    pubSubLogger.info(`Event name "${eventName}" was registered`);
  }

  unregisterEvent(eventName, callback) {
    const callbacks = Array.prototype.slice.call(arguments, 1);
    const events = this.events[eventName];
    let index;

    callbacks.forEach((callback) => {
      index = events.indexOf(callback);

      if(index > -1) {
        events.splice(index, 1);
      }
    });
  }

  publish(eventName) {
    const args = Array.prototype.slice.call(arguments, 1);
    const events = this.events[eventName];
    const event = tokenizeEventName(eventName);
    
    if(_.isEmpty(eventName) || _.isEmpty(events)) {
      return;
    }

    events.forEach(event => {
      event.apply(this, args);
    });

    pubSubLogger.info(`The event name "${eventName}" was published`);
  }
}

export default Publisher;
