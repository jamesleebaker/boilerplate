import View from './View';
import _ from 'underscore';
import Logger from 'js-logger';
import $ from 'jquery';

let instance = null;

const viewLogger = Logger.get('Views');

class ModuleView extends View {
  constructor(config) {
    super(config);
  }

  render(data) {
    super.render(data, html => {
      $(this.config.container).html(html);
    });
  }
}

export default ModuleView;
