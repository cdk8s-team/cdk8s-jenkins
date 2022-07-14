const { Cdk8sCommon } = require('@cdk8s/projen-common');
const { cdk8s } = require('projen');

const project = new cdk8s.ConstructLibraryCdk8s({
  ...Cdk8sCommon.props,
  name: 'cdk8s-jenkins',
  packageName: 'cdk8s-jenkins',
  description: 'Jenkins construct for CDK8s',
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  cdk8sVersion: '2.3.16',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/cdk8s-team/cdk8s-jenkins',
  devDeps: [
    '@cdk8s/projen-common',
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
  publishToMaven: {
    javaPackage: 'org.cdk8s.jenkins',
    mavenGroupId: 'org.cdk8s',
    mavenArtifactId: 'cdk8s-jenkins',
  },
  publishToPypi: {
    distName: 'cdk8s-jenkins',
    module: 'cdk8s_jenkins',
  },
  publishToNuget: {
    dotNetNamespace: 'Org.Cdk8s.Jenkins',
    packageId: 'Org.Cdk8s.Jenkins',
  },
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: Cdk8sCommon.upgradeScheduleFor('cdk8s-jenkins'),
    },
  },
});

project.addDevDeps('@types/jest@^27.5.1');

new Cdk8sCommon(project);

project.synth();