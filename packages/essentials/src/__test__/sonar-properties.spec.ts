const {
  bin: { sonarProperties },
} = require('../../package.json');
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('sonar-properties', () => {
  beforeAll(async () => {
    await exec(
      `node ${sonarProperties} -t app -o tresdoce --pn tresdoce-toolkit-test -b test/test --bl .DS_Store config tiimiit-types`,
      (err, stdout, stderr) => {
        //console.log(err);
        //console.log(stdout);
        //console.log(stderr);
      },
    );
  });

  it('should be create file sonar-project.properties', async () => {
    expect(fs.existsSync(path.resolve(__dirname, '../../sonar-project.properties'))).toBe(true);
  });
});
