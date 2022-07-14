# cdk8s-jenkins
`cdk8s-jenkins` is a library that lets you easily define a manifest for deploying a Jenkins instance to your Kubernetes cluster.

## Prerequisites
This library uses a Custom Resource Definition provided by jenkins, and thus requires both the CRD and the operator to be installed on the cluster. 
You can set this up by,
1. Apply the Custom Resource Definition(CRD) for jenkins on your Kubernetes cluster.
```
kubectl apply -f https://raw.githubusercontent.com/jenkinsci/kubernetes-operator/master/config/crd/bases/jenkins.io_jenkins.yaml
```
2. Install the Jenkins Operator on your Kubernetes cluster. 
```
kubectl apply -f https://raw.githubusercontent.com/jenkinsci/kubernetes-operator/master/deploy/all-in-one-v1alpha2.yaml
```

> For more information regarding applying jenkins crd and installing jenkins operator, please refer [jenkins official documentaion](https://jenkinsci.github.io/kubernetes-operator/docs/getting-started/latest/installing-the-operator/).

## Usage
The library provides a high level `Jenkins` construct to provision a Jenkins instance. 
You can just instantiate the Jenkins instance and that would add a Jenkins resource to the kubernetes manifest. 

The library provide a set of defaults, so provisioning a basic Jenkins instance requires no configuration:

```ts
import { Jenkins } from 'cdk8s-jenkins';

// inside your chart:
const jenkins = new Jenkins(this, 'my-jenkins');
```

The library also enables configuring the following parmeters for the Jenkins instance:
### metadata
```ts
const jenkins = new Jenkins(this, 'my-jenkins', {
  metadata: {
    namespace: 'jenkins-namespace',
    labels: { customApp: 'my-jenkins' },
  },
});
```
### disableCsrfProtection
This allows you to toggle CSRF Protection for Jenkins.
```ts
const jenkins = new Jenkins(this, 'my-jenkins', {
  disableCsrfProtection: true,
});
```
### basePlugins
These are the plugins required by the jenkins operator.
```ts
const jenkins = new Jenkins(this, 'my-jenkins', {
  basePlugins: [{
    name: 'configuration-as-code',
    version: '1.55',
    }],
});

```

You can also utilize `addBasePlugins` function to add base plugins to jenkins configuration after initialization.
```ts
const jenkins = new Jenkins(this, 'my-jenkins');
jenkins.addBasePlugins([{
  name: 'workflow-api',
  version: '2.76',
}]);
```

### plugins
These are the plugins that you can add to your jenkins instance.
```ts
const jenkins = new Jenkins(this, 'my-jenkins', {
  plugins: [{
    name: 'simple-theme-plugin',
    version: '0.7',
    }],
});
```
You can also utilize `addPlugins` function to add plugins to jenkins configuration after initialization.
```ts
const jenkins = new Jenkins(this, 'my-jenkins');
jenkins.addPlugins([{
  name: 'simple-theme-plugin',
  version: '0.7',
}]);
```

### seedJobs
You can define list of jenkins seed job configurations here. For more info you can take look at [jenkins documentation](https://jenkinsci.github.io/kubernetes-operator/docs/getting-started/latest/configuring-seed-jobs-and-pipelines/).

```ts
const jenkins = new Jenkins(this, 'my-jenkins', {
  seedJobs: [{
    id: 'jenkins-operator',
    targets: 'cicd/jobs/*.jenkins',
    description: 'Jenkins Operator repository',
    repositoryBranch: 'master',
    repositoryUrl: 'https://github.com/jenkinsci/kubernetes-operator.git',
    }],
});
```
You can also utilize `addSeedJobs` function to add seed jobs to jenkins configuration after initialization.
```ts
const jenkins = new Jenkins(this, 'my-jenkins');
jenkins.addSeedJobs([{
  id: 'jenkins-operator',
  targets: 'cicd/jobs/*.jenkins',
  description: 'Jenkins Operator repository',
  repositoryBranch: 'master',
  repositoryUrl: 'https://github.com/jenkinsci/kubernetes-operator.git',
}]);
```

## Using escape hatches

You can utilize escape hatches to make changes to the configurations that are not yet exposed by the library. 

For instance, if you would like to update the version of a base plugin:

```ts
const jenkins = new Jenkins(this, 'my-jenkins');
const jenkinsApiObject = ApiObject.of(jenkins);
jenkinsApiObject.addJsonPatch(JsonPatch.replace('/spec/master/basePlugins/1', {
  name: 'workflow-job',
  version: '3.00',
}));
```

For more information regarding escape hatches, take a look at [cdk8s documentation](https://cdk8s.io/docs/latest/concepts/escape-hatches/).

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more
information.

## License

This project is licensed under the Apache-2.0 License.
