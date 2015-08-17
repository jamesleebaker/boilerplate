import Model from 'lib/Model';

class Person extends Model {
  constructor(properties) {
    super('model:person:change', properties);
  }
}

export default Person;
