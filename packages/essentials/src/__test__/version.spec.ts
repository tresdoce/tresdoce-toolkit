import { versionrc } from '../index';

describe('versionrc', () => {
  it('should be return default config to versioning app', async () => {
    expect(versionrc).toBeDefined();
    expect(versionrc).toHaveProperty('header');
    expect(versionrc).toHaveProperty('path');
    expect(versionrc).toHaveProperty('releaseCommitMessageFormat');
    expect(versionrc).toHaveProperty('issuePrefixes');
    expect(versionrc).toHaveProperty('types');
  });
});
