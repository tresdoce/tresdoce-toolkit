/*const {
  bin: { sonarProperties },
} = require('../../package.json');*/
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('sonar-properties', () => {
  beforeAll(async () => {
    const sonarProperties = path.resolve(__dirname, '../scripts/sonar-properties.js');
    await exec(
      `node ${sonarProperties} -t app --org tresdoce -p tresdoce-toolkit-test -b test/test --bl .DS_Store config tresdoce-types`,
      (err, stdout, stderr) => {
        /*console.log(err);
        console.log(stdout);
        console.log(stderr);*/
      },
    );
  });

  it('should be create file sonar-project.properties', async () => {
    setTimeout(() => {
      expect(fs.existsSync(path.resolve(__dirname, '../../sonar-project.properties'))).toBe(true);
    }, 3000);
  });
});
