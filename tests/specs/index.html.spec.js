describe('index.html', () => {
  it('should expose the templates to __html__', () => {
    document.body.innerHTML = __html__['index.html'];
    expect(document.body.innerHTML).not.toBe(undefined);
  });

  it('should have an element with an ID of "main-wrapper"', () => {
    expect(document.getElementById('main-wrapper')).not.toBe(null);
  });
});