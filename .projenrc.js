const { cdk8s } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  name: 'cdk8s-jenkins',
  packageName: 'cdk8s-jenkins',
  description: 'Jenkins construct for CDK8s',
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  cdk8sVersion: '2.3.16',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/cdk8s-team/cdk8s-jenkins',
  peerDeps: [
    'cdk8s',
    'constructs',
  ],
  release: false,
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
});
project.synth();