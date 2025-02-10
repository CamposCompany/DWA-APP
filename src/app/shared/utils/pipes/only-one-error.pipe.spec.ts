import { OnlyOneErrorPipe } from './only-one-error.pipe';

describe('OnlyOneErrorPipe', () => {
  it('create an instance', () => {
    let pipe = new OnlyOneErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
