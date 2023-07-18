import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // create a generator
  plop.setGenerator('create-component', {
    description: 'Scaffold a new frosted-ui component',
    // gather information from the user
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the pascalCase name of the component?',
      },
    ],
    // perform actions based on the prompts
    actions: [
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/index.ts',
        templateFile: 'templates/export.hbs',
      },
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'templates/story.hbs',
      },
      {
        type: 'append',
        path: './index.ts',
        template: 'export * from "./components/{{pascalCase name}}";',
      },
    ],
  });
}
