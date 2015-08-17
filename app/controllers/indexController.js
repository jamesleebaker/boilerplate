import IndexView from 'views/IndexView';
import Controller from 'lib/Controller';
import PersonModel from 'models/PersonModel';

class IndexController extends Controller {
  constructor() {
    super();
  }

  default() {
    var view = new IndexView({});

    var person = new PersonModel({
      firstName: 'Maria',
      lastName: 'Baker'
    });

    // this.listenTo(view, 'test-event', function(...data) {
    //   console.log(data);
    // });

    view.render(person);

    // setTimeout(() => {
    //   person.firstName = 'James';
    // }, 4000);
  }
}

export default new IndexController();
