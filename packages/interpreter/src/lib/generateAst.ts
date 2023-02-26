import { Project } from 'ts-morph';

const project = new Project();
const exprFilePath = './packages/interpreter/src/lib/expr.ts';

const sourceFile = project.createSourceFile(exprFilePath, '', {
  overwrite: true,
});

const expressionTypes = {
  Binary: {
    left: 'Expr',
    operator: 'Token',
    right: 'Expr',
  },
  Grouping: {
    expression: 'Expr',
  },
  Literal: {
    value: 'Object',
  },
  Unary: {
    operator: 'Token',
    right: 'Expr',
  },
};

sourceFile.addImportDeclaration({
  moduleSpecifier: './token',
  namedImports: ['Token'],
});

sourceFile.addClass({
  name: 'Expr',
  isAbstract: true,
  methods: [
    {
      name: 'accept<R>',
      returnType: 'R',
      parameters: [
        {
          name: 'visitor',
          type: 'Visitor<R>',
        },
      ],
      isAbstract: true,
    },
  ],
});

sourceFile.addInterface({
  name: 'Visitor<R>',
  methods: Object.keys(expressionTypes).map((exprType) => ({
    name: `visit${exprType}Expr`,
    parameters: [
      {
        name: 'expr',
        type: `${exprType}`,
      },
    ],
    returnType: 'R',
  })),
});

// loop over expressionTypes and create a type for each
Object.entries(expressionTypes).forEach(([exprType, properties]) => {
  sourceFile.addClass({
    name: exprType,
    extends: 'Expr',
    properties: Object.entries(properties).map(([name, type]) => ({
      name,
      type,
    })),
    ctors: [
      {
        parameters: Object.entries(properties).map(([name, type]) => ({
          name,
          type,
        })),
        statements: [
          'super();',
          ...Object.entries(properties).map(
            ([name]) => `this.${name} = ${name};`
          ),
        ],
      },
    ],
    methods: [
      {
        name: 'accept<R>',
        returnType: 'R',
        parameters: [
          {
            name: 'visitor',
            type: 'Visitor<R>',
          },
        ],
        statements: [`return visitor.visit${exprType}Expr(this);`],
      },
    ],
  });
});

sourceFile.formatText();
sourceFile.saveSync();
console.log(sourceFile.getText());
