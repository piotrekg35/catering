import { ToCapitalPipe } from './to-capital.pipe';

describe('ToCapitalPipe', () => {
  it('create an instance', () => {
    const pipe = new ToCapitalPipe();
    expect(pipe).toBeTruthy();
  });
});
