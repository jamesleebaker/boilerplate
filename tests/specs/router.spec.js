import Router from '../../app/router.js';

describe('Router Test', () => {
  var router = new Router();

  it('should create a new router', () => {
    expect(typeof router).toEqual('object');
    expect(router.test()).toEqual(42);
  });
});