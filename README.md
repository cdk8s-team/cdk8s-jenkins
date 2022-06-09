# This library is currently under development. Stay tuned! 

# cdk8s-jenkins
cdk8s-jenkins is a library which enables the user to add a jenkins instance to their Kubernetes cluster. 

## Prerequisites
To use the construct, the user would need to,
1. Apply the Custom Resource Definition(CRD) for jenkins on their Kubernetes cluster.
```
kubectl apply -f https://raw.githubusercontent.com/jenkinsci/kubernetes-operator/master/config/crd/bases/jenkins.io_jenkins.yaml
```
2. Install the Jenkins Operator on their Kubernetes cluster. 
```
kubectl apply -f https://raw.githubusercontent.com/jenkinsci/kubernetes-operator/master/deploy/all-in-one-v1alpha2.yaml
```
## Usage
The construct provides a high level API abstraction for user to provision Jenkins resource for their cluster. 
The user can just instantiate the Jenkins instance and that would add a Jenkins resource to the kubernetes manifest. 

We provide a set of defaults to the user, so that provisioning a Jenkins instance could be as easy as initializating Jenkins,

```
import { Jenkins } from 'cdk8s-jenkins';

// inside your chart:
const jenkins = new Jenkins(this, 'my-jenkins');
```

The API also enables configuring the following parmeters for the Jenkins instance:
* **namespace**
  * Namespace defines the space within which each name must be unique. 
  * Default Value: 'default'
* **labels**
  * Map of string keys and values that can be used to organize and categorize (scope and select) objects.
  * Default Value: '{ app: 'jenkins' }'
* **disableCsrfProtection**
  * Allows you to toggle CSRF Protection on Jenkins.
  * Default Value: 'false'
* **basePlugins**
  * Contains plugins required by operator.
  * Default Value:
    ```
    - name: kubernetes 
      version: "1.31.3" 
    - name: workflow-job 
      version: "1145.v7f2433caa07f" 
    - name: workflow-aggregator 
      version: "2.6" 
    - name: git 
      version: "4.10.3" 
    - name: job-dsl 
      version: "1.78.1" 
    - name: configuration-as-code 
      version: "1414.v878271fc496f" 
    - name: kubernetes-credentials-provider 
      version: "0.20"
    ```
* **plugins**
  * Contains plugins required by user.
  * Default Value: []
* **seedJobs**
  * Defines list of Jenkins Seed Job configurations More info: https://jenkinsci.github.io/kubernetes-operator/docs/getting-started/latest/configuring-seed-jobs-and-pipelines/.
  * Default Value: []

The following is an example of how the resource can be customized,

```
import { Jenkins } from 'cdk8s-jenkins';

// inside your chart:

const namespace = 'jenkins-test-namespace';

const labels = { customApp: 'my-jenkins' };

const disableCSRFProtection = true;

const basePlugins = [{
  name: 'configuration-as-code',
  version: '1.55',
}];

const plugins = [{
  name: 'simple-theme-plugin',
  version: '0.7',
}];

const seedJobs = [{
  id: 'jenkins-operator',
  targets: 'cicd/jobs/*.jenkins',
  description: 'Jenkins Operator repository',
  repositoryBranch: 'master',
  repositoryUrl: 'https://github.com/jenkinsci/kubernetes-operator.git',
}];


// Jenkins Custom Resource
const jenkins = new Jenkins(this, 'my-jenkins', {
  namespace: namespace,
  labels: labels,
  disableCsrfProtection: disableCSRFProtection,
  basePlugins: basePlugins,
  plugins: plugins,
  seedJobs: seedJobs,
});
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more
information.

## License

This project is licensed under the Apache-2.0 License.

