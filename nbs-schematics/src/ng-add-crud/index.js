"use strict";
// import { Rule, SchematicContext, Tree, chain, SchematicsException } from '@angular-devkit/schematics';
// import { buildComponent } from '@angular/cdk/schematics';
// import { Schema } from '@schematics/angular/component/schema';
// import { dirname, relative, join, normalize } from 'path';
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCrudSchematics = addCrudSchematics;
const schematics_1 = require("@angular/cdk/schematics");
function addCrudSchematics(options) {
    options.prefix = '';
    return (0, schematics_1.buildComponent)(Object.assign({}, options));
}
//# sourceMappingURL=index.js.map