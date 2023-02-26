import { TokenType } from './tokenType';

export class Token {
  type: TokenType;
  lexeme: string;
  literal: Record<string, string>;
  line: number;

  Token(
    type: TokenType,
    lexeme: string,
    literal: Record<string, string>,
    line: number
  ) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString() {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}
