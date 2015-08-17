import Logger from 'js-logger';
import moment from 'moment';

const eventsLogger = Logger.get('EventBus');
let topics = {};
let instance = null;

function formatMessage(topic, action) {
  const date = moment().format('H:mm:SS');
  return `${date}: The ${topic} topic has been ${action}`;
}

class EventBus {
  constructor() {
    if(!instance){
      instance = this;
    }
  }

  subscribe(topic, listener) {
    let index;

    if(!topics.hasOwnProperty.call(topics, topic)) {
      topics[topic] = [];
    }

    index = topics[topic].push(listener) -1;
    eventsLogger.info(formatMessage(topic, 'subscribed to'));
    // Provide handle back for removal of topic
    return {
      remove() {
        eventsLogger.info(formatMessage(topic, 'removed'));
        delete topics[topic][index];
      }
    };
  }

  publish(topic, info) {
    if(!topics.hasOwnProperty.call(topics, topic)) {
      return;
    }

    eventsLogger.info(formatMessage(topic, 'published'));

    topics[topic].forEach(item => {
      item(info !== undefined ? info : {});
    });
  }
}

export default new EventBus();
