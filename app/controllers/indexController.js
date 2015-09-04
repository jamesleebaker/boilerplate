import IndexView from 'views/IndexView';
import Controller from 'lib/Controller';
import PersonModel from 'models/PersonModel';
import indexViewAdapter from 'view-adapters/indexViewAdapter';

class IndexController extends Controller {
  constructor() {
    super();
  }

  default() {
    let dataFromServer = {
      firstName: 'Maria',
      lastName: 'Baker'
    };

    let view = new IndexView({});
    let model = new PersonModel(dataFromServer);

    this.listenTo(model, 'change', state => {
      view.updateName(indexViewAdapter.updateNameFromPerson(state));
    });

    this.listenTo(view, 'first-name:change', name => {
      
    });

    // Sample GET Request
    // this.get({
    //   url: 'https://baconipsum.com/api',
    //   params: {
    //     type: 'meat-and-filler'
    //   }
    // })
    //   .then((result, request) => {
    //     console.log(result);
    //     console.log(request);
    //   });

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
