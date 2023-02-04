#!/usr/bin/env node

const commander = require('commander');
const fs = require('fs');

commander
  .option('-n, --name <interfaceName>', 'Name of the interface to generate')
  .option('-p, --properties <properties>', 'Properties of the interface, separated by semicolons')
  .parse(process.argv);

const properties = commander.properties.split(';').map(property => property.split(':'));
const interfaceName = commander.name;

const interfaceDefinition = `
export interface ${interfaceName} {
${properties.map(property => `  ${property[0]}: ${property[1]};`).join('\n')}
}
`;

const typeDefinition = `
export type ${interfaceName}Properties = {
${properties.map(property => `  ${property[0]}: ${property[1]};`).join('\n')}
};
`;

fs.writeFileSync(`${interfaceName}.ts`, interfaceDefinition + typeDefinition);
console.log(`Generated interface and type definitions for "${interfaceName}"`);
