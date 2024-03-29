export const NpmConfig = {
  header:
    '<div align="center"><h1>📝 Changelog</h1><p>All changes of this project will be documented in this file.</p></div>\n\n---\n',
  path: './',
  releaseCommitMessageFormat: 'ci(release): bumped version to {{currentTag}}',
  types: [
    { type: 'feat', section: '✨ Features', hidden: false },
    { type: 'fix', section: '\uD83D\uDC1B Bug Fixes', hidden: false },
    { type: 'chore', section: '👨‍💻 Chores', hidden: false },
    { type: 'docs', section: '\uD83D\uDCDD Docs', hidden: false },
    { type: 'refactor', section: '♻️Refactors', hidden: false },
    { type: 'test', section: '🧪 Tests', hidden: true },
    { type: 'build', section: '🛠 Build', hidden: true },
    { type: 'perf', hidden: true },
    { type: 'style', hidden: true },
    { type: 'ci', hidden: true },
    { type: 'revert', hidden: true },
  ],
  issuePrefixes: ['#'],
};
