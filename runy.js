module.exports = {
  host: '142.93.25.1',
  username: 'deploy',
  port: 1008,
  remotePath: '/home/deploy/work-shifts/client',
  git: 'git@github.com:BabenkoOleg/work-shifts-client.git',
  commands: [
    'yarn',
    'yarn build',
  ],
};
