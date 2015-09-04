import _ from 'underscore';
import Observer from 'lib/Observer';

class IndexObserver extends Observer {
  constructor(view, model) {
    super(view, model);

    this.listenTo(model, 'model:person:change', state => {
      view.update(state);
    });

    this.listenTo(view, 'view:first-name:change', name => {
      this.model.set('firstName', name);
    });

    this.listenTo(view, 'view:last-name:change', name => {
      this.model.set('lastName', name);
    });
  }
}

export default IndexObserver;
