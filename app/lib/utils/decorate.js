import _ from 'underscore';

export default function(...decorators) {
  const instance = decorators[0];

  if(_.isUndefined(instance) || !_.isObject(instance)) {
    throw new TypeError('An object is needed to decorate to');
  }

  return _.extend.apply(instance, decorators);
}
