import IndexView from 'views/IndexView';
import Controller from 'lib/Controller';
import PersonModel from 'models/PersonModel';
import IndexObserver from 'observers/IndexObserver';

class IndexController extends Controller {
  constructor() {
    super();
  }

  default() {
    const dataFromServer = {
      firstName: 'Maria',
      lastName: 'Baker'
    };

    const view = new IndexView({});
    const model = new PersonModel(dataFromServer);
    const observer = new IndexObserver(view, model);

    view.render(model.getState());

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

    // setTimeout(() => {
    //   person.firstName = 'James';
    // }, 4000);
  }
}

export default new IndexController();
