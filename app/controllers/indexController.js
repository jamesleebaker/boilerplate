import IndexView from 'views/IndexView';
import Controller from 'lib/Controller';

class IndexController extends Controller {
  constructor() {
    super();
  }

  default() {
    var view = new IndexView({});

    // this.listenTo(view, 'test-event', function(...data) {
    //   console.log(data);
    // });


    view.render({ name : 'James'});
  }
}

export default new IndexController();
