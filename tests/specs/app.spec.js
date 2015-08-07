import app from '../../app/app.js';

describe('App Test', () => {
  it('should have a method called test that returns 42', () => {
    expect(app.test()).toEqual(42);
  });
});