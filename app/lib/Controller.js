import mixin from './utils/mixin';
import Publisher from './Publisher';
import Subscriber from './Subscriber';

class Controller extends mixin(Publisher, Subscriber) {
  constructor(...args) {
    super(...args);
  }
}

export default Controller;
