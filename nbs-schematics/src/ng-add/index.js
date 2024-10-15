"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nbsSchematics = nbsSchematics;
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function nbsSchematics(_options) {
    return (tree, _context) => {
        tree.create(_options.name || 'hello', 'world');
        return tree;
    };
}
//# sourceMappingURL=index.js.map