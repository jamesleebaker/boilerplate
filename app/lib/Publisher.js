import Logger from 'js-logger';
import _ from 'underscore';

const pubSubLogger = Logger.get('PubSub');

class Publisher {
  constructor() {
    this.events = {};
  }

  registerEvent(eventName, ...callbacks) {
    if(_.isEmpty(eventName)) {
      throw new TypeError('You must provide an event name when registering an event');
    }

    this.events[eventName] = callbacks;

    pubSubLogger.info(`Event name "${eventName}" was registered`);
  }

  unregisterEvent(eventName, ...callbacks) {
    const events = this.events[eventName];
    let index;

    callbacks.forEach((callback) => {
      index = events.indexOf(callback);

      if(index > -1) {
        events.splice(index, 1);
      }
    });
  }

  publish(eventName, ...values) {
    const events = this.events[eventName];

    if(_.isEmpty(eventName) || _.isEmpty(events)) {
      return;
    }

    events.forEach(event => {
      event.apply(this, values);
    });

    pubSubLogger.info(`The event name "${eventName}" was published`);
  }
}

export default Publisher;
