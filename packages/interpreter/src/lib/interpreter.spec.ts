import { SriLang } from './interpreter';
import { stdin } from 'mock-stdin';

describe('interpreter', () => {
  it('should work', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockStdIn = stdin();

    new SriLang([]);

    mockStdIn.send('hello\n');
    mockStdIn.send('there\n');
    mockStdIn.send(null);

    expect(consoleSpy).toHaveBeenCalledWith('hello');
    expect(consoleSpy).toHaveBeenCalledWith('there');
  });
});
