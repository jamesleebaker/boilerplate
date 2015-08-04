import app from '../../app/app.js';

describe('App Test', function () {

  it('should have a method called test that returns 42', function () {
    expect(app.test()).toEqual(42);
  });
});