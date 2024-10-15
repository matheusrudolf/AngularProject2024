// import { Rule, SchematicContext, Tree, chain, SchematicsException } from '@angular-devkit/schematics';
// import { buildComponent } from '@angular/cdk/schematics';
// import { Schema } from '@schematics/angular/component/schema';
// import { dirname, relative, join, normalize } from 'path';

// // You don't have to export the function as default. You can also have more than one rule factory per file.
// export function addCrudSchematics(options: Schema): Rule {
//   options.prefix = '';
//   return (tree: Tree, _context: SchematicContext) => {
//     // Use buildComponent to generate the component
//     const componentRule = buildComponent({ ...options });

//     // Chain the rule with a custom rule to adjust the templateUrl
//     return chain([
//       componentRule,
//       adjustTemplatePath(options),
//     ])(tree, _context);
//   };
// }

// // Custom rule to adjust the template path
// function adjustTemplatePath(options: Schema): Rule {
//   return (tree: Tree, _context: SchematicContext) => {
//     const { path: componentPath, name } = options;
//     const componentFilePath = normalize(join(componentPath as string, `${name}.component.ts`));

//     // Determine the shared template path based on the component name
//     let sharedTemplatePath = 'app/shared/templates/crud-forms-template.html'; // default path

//     if (name.includes('-view')) {
//       sharedTemplatePath = 'app/shared/templates/crud-view-template.html';
//     } // Add more conditions if needed for other types

//     // Calculate the relative path from the component to the shared template
//     const relativeTemplatePath = relative(dirname(componentFilePath), sharedTemplatePath).replace(/\\/g, '/');

//     // Read the content of the component file
//     const buffer = tree.read(componentFilePath);
//     if (!buffer) {
//       throw new SchematicsException(`Could not read component at ${componentFilePath}`);
//     }
//     let content = buffer.toString('utf-8');

//     // Replace the templateUrl with the calculated relative path
//     content = content.replace(/templateUrl:\s*['"].*['"]/, `templateUrl: '${relativeTemplatePath}'`);

//     // Overwrite the component file with the updated content
//     tree.overwrite(componentFilePath, content);

//     return tree;
//   };
// }

import { Rule } from '@angular-devkit/schematics';
import { buildComponent } from '@angular/cdk/schematics';
import { Schema } from '@schematics/angular/component/schema';

export function addCrudSchematics(options: Schema): Rule {
  options.prefix = '';
  return buildComponent({ ...options });
}
