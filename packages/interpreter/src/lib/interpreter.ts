import { readFileSync } from 'fs';
import { createInterface } from 'readline/promises';

export class SriLang {
  static hadError = false;

  constructor(args: string[]) {
    if (args.length > 1) {
      console.error('Usage: sri-lang [script]');
      process.exit(64);
    } else if (args.length == 1) {
      SriLang.runFile(args[0]);
    } else {
      SriLang.runPrompt();
    }
  }

  private static runFile(path: string) {
    const data = readFileSync(path, 'utf8');
    this.run(data.toString());
    if (this.hadError) process.exit(65);
  }

  private static async runPrompt() {
    const lineReader = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('> ');
    const emitter = lineReader.on('line', (line) => {
      this.run(line);
      this.hadError = false;
      console.log('> ');

      if (line === null) {
        emitter.close();
      }
    });
  }

  private static run(line: string) {
    console.log(line);
  }

  static error(line: number, message: string) {
    this.report(line, '', message);
  }

  private static report(line: number, where: string, message: string) {
    console.error(`[line ${line}] Error${where}: ${message}`);
    this.hadError = true;
  }
}
