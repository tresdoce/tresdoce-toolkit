#!/usr/bin/env node

// node sonar-properties.js -t app --org tresdoce -p tresdoce-toolkit-test -b test --ex src/main.ts
// yarn sonar:properties -t app --org tresdoce -p nestjs-starter -b feat/essentials --ex src/main.ts

// node sonar-properties.js -t monorepo --org api-program -p tresdoce-toolkit -b develop --bl .DS_Store config tresdoce-types
// yarn sonar:properties -t monorepo --org tresdoce -p tresdoce-toolkit -b develop --bl .DS_Store config tresdoce-types

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const defaultExclusions = [
  '**/*.bin',
  'node_modules/**',
  'test/**',
  '**/__test__/**',
  '**/__mocks__/**',
  '**/dist/**',
  '**/build/**',
];

const argv = yargs(hideBin(process.argv)).options({
  type: {
    alias: 't',
    describe: 'Type of app for sonar properties',
    choices: ['app', 'monorepo'],
    default: 'app',
    required: true,
    type: 'string',
  },
  organization: {
    alias: 'org',
    describe: 'Organization name',
    required: true,
    type: 'string',
  },
  projectName: {
    alias: 'p',
    describe: 'Project name',
    required: true,
    type: 'string',
  },
  branch: {
    alias: 'b',
    describe: 'Branch to run analysis',
    required: false,
    type: 'string',
    default: 'main',
  },
  projectVersion: {
    alias: 'v',
    describe: 'Project version',
    required: false,
    type: 'string',
    default: '1.0.0',
  },
  blacklist: {
    alias: 'bl',
    describe: 'List of ignore to sonar analysis for monorepo (.DS_Store, config, pkg-types)',
    required: false,
    type: 'array',
  },
  exclusions: {
    alias: 'ex',
    describe: 'Exclusions files and folders to coverage',
    required: false,
    type: 'array',
    default: defaultExclusions,
  },
}).argv;

const { type, organization, projectName, projectVersion, branch, blacklist, exclusions } = argv;
const processPath = process.cwd();
const directoryPath =
  type === 'monorepo' ? path.join(processPath, 'packages') : path.join(processPath, './');

// Format organization name
const organizationNameArr = organization.split('/');
const organizationName = organizationNameArr.map((item) => _.kebabCase(item)).join('-');
const sonarProjectKey = `${organizationName}_${projectName}`;
const sonarPropertiesFilename = 'sonar-project.properties';

fs.readdir(directoryPath, (_err, _files) => {
  try {
    let sonarSources = './src';
    let sonarExclusions = _.union(defaultExclusions, exclusions);
    let sonarTestExecutionReportPaths = './test-report.xml';
    let sonarLcovReportPath = './coverage/lcov.info';

    if (type === 'monorepo') {
      sonarExclusions = _.union(sonarExclusions, ['src/index.ts']);
      const listOfPackages = _files.filter((file) => !blacklist.includes(file));
      const packages = listOfPackages.map((pkgName) => `${pkgName}`);

      console.log('• Packages: ', packages.join(', '));
      console.log(`• Total packages: ${packages.length}`);

      sonarSources = listOfPackages.map((pkgName) => `./packages/${pkgName}/src`).join();
      sonarTestExecutionReportPaths = listOfPackages
        .map((pkgName) => `./packages/${pkgName}/test-report.xml`)
        .join();
      sonarLcovReportPath = listOfPackages
        .map((pkgName) => `./packages/${pkgName}/coverage/lcov.info`)
        .join();
    }

    // Sonar properties
    const sonarQubeProperties = `sonar.organization=${organizationName}
sonar.projectName=${projectName}
sonar.projectKey=${sonarProjectKey}
sonar.branch.name=${branch || 'main'}
sonar.projectVersion=${projectVersion || '1.0.0'}
sonar.sourceEncoding=UTF-8
sonar.sources=${sonarSources || '.'}
sonar.exclusions=${sonarExclusions}
sonar.coverage.exclusions=${sonarExclusions}
sonar.testExecutionReportPaths=${sonarTestExecutionReportPaths}
sonar.javascript.lcov.reportPaths=${sonarLcovReportPath}`;

    fs.writeFile(
      path.resolve(processPath, sonarPropertiesFilename),
      sonarQubeProperties,
      (error) => {
        if (error) {
          return console.log(`• Error to create Sonar properties file: ${error}`);
        }
        console.log('• The Sonar properties file was saved!');
        console.log(sonarQubeProperties);
      },
    );
  } catch (error) {
    return console.log(`• Unable to scan directory: ${error}`);
  }
});
