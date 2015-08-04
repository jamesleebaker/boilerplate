import Router from '../../app/router.js';

describe('Router Test', function () {
  var router = new Router();

  it('should create a new router', function () {
    expect(typeof router).toEqual('object');
    expect(router.test()).toEqual(42);
  });
});