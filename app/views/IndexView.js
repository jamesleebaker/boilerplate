import PageView from 'lib/PageView';
import pageTemplate from 'templates/views/index';
import $ from 'jquery';
import eventBus from 'lib/EventBus';
import _ from 'underscore';

const container = '#main-wrapper';

class IndexView extends PageView {
  constructor(config) {
    config.template = pageTemplate;
    config.container = container;
    super(config);

    this.addBindings();
    this.observeChanges();
  }

  addBindings() {
    this.addBinding('[name=first-name]', 'keyup', (event) => {
      const value = this.getValueFromEvent(event);
      this.updateName(value);
    });
  }

  observeChanges() {
    eventBus.subscribe('model:person:change', changes => {
      const values = _.first(changes).object;

      this.updateName(`${values.firstName} ${values.lastName}`);
    });
  }

  updateName(value) {
    this.publish('firstName:changed', value);
    this.query('#first-name').textContent = `Hello ${value}!`;
  }
}

export default IndexView;
