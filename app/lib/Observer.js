import Subscriber from './Subscriber';
import Logger from 'js-logger';
import _ from 'underscore';

const observerLogger = Logger.get('Observer');

class Observer extends Subscriber {
  constructor(view, model) {
    super();
    this.view = view;
    this.model = model;

    if(_.isEmpty(this.view) || _.isEmpty(this.model)) {
      throw new ReferenceError('A view and model are both required for observation');
    }
  }
}

export default Observer;
