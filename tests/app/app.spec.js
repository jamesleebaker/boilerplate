import BaseObject from 'fiber';

describe('BaseObject Test', function () {

  it('should be a constructor', function () {
    expect(greet('World')).toEqual('Hello, World!');
  });
});