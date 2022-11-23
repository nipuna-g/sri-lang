
import { readFileSync } from 'fs'
import { createInterface } from 'readline/promises'

export class SriLang {
  constructor(args: string[]) {
    if (args.length > 1) {
      console.error("Usage: sri-lang [script]")
      process.exit(64)
    } else if (args.length == 1) {
      SriLang.runFile(args[0])
    } else {
      SriLang.runPrompt()
    }
  }

  private static runFile(path: string) {
    const data = readFileSync(path, 'utf8');
    this.run(data.toString())
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
    console.log(line)
  }
}

