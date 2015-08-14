import PageView from 'lib/PageView';
import pageTemplate from 'templates/views/index';
import $ from 'jquery';

const container = '#main-wrapper';

class IndexView extends PageView {
  constructor(config) {
    config.template = pageTemplate;
    config.container = container;
    super(config);

    // setTimeout(() => {
    //   this.publish('test-event', 'Works!');
    // }, 4000);
  }
}

export default IndexView;
