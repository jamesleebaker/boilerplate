import Logger from 'js-logger';

const eventsLogger = Logger.get('EventBus');
const hasOwnProperty = topics.hasOwnProperty;
let topics = {};
let instance = null;

function formatMessage(topic, action) {
  const date = new Date();
  return `${date} on EventBus: ${topic} has been ${action}`;
}

class EventBus {
  constructor() {
    if(!instance){
      instance = this;
    }
  },

  subscribe(topic, listener) {
    let index;

    if(!hasOwnProperty.call(topics, topic)) {
      topics[topic] = [];
    }

    index = topics[topic].push(listener) -1;
    eventsLogger.info(formatMessage(topic, 'subscribed to'));
    // Provide handle back for removal of topic
    return {
      remove: function() {
        eventsLogger.info(formatMessage(topic, 'removed'));
        delete topics[topic][index];
      }
    };
  },

  publish: function(topic, info) {
    if(!hasOwnProperty.call(topics, topic)) {
      return;
    }

    eventsLogger.info(formatMessage(topic, 'published'));

    topics[topic].forEach(function(item) {
      item(info != undefined ? info : {});
    });
  }
}

export default new EventBus();
