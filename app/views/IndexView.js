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
  }

  addBindings() {
    this.addBinding('[name=first-name]', 'keyup', (event) => {
      const value = this.getValueFromEvent(event);
      this.publish('view:first-name:change', value);
      this.updateName(value);
    });
  }

  updateName(value) {
    this.query('#name').textContent = `Hello ${value}!`;
  }
}

export default IndexView;
