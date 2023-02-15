const { Cdk8sTeamJsiiProject } = require('@cdk8s/projen-common');
const { javascript } = require('projen');

const project = new Cdk8sTeamJsiiProject({
  name: 'cdk8s-jenkins',
  description: 'Jenkins construct for CDK8s',
  defaultReleaseBranch: 'main',
  golang: false,
  devDeps: [
    '@cdk8s/projen-common',
    '@types/jest@^27.5.1',
  ],
  jestOptions: {
    jestConfig: {
      coveragePathIgnorePatterns: [
        '/node_modules/',
        'src/imports/*',
      ],
    },
  },
  peerDeps: [
    'cdk8s',
    'constructs',
  ],
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 0 * * *']),
    },
  },
});

project.synth();