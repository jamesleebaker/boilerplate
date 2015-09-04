import Model from 'lib/Model';

class PersonModel extends Model {
  constructor(properties) {
    super('model:person', properties);
  }
}

export default PersonModel;
