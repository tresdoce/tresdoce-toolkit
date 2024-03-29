const config = require('@tresdoce-toolkit/config/jest.config');

module.exports = {
  ...config,
  rootDir: __dirname,
  coveragePathIgnorePatterns: [...config.coveragePathIgnorePatterns, 'scripts/*'],
};
