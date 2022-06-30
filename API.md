# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Jenkins <a name="Jenkins" id="cdk8s-jenkins.Jenkins"></a>

A jenkins instance.

#### Initializers <a name="Initializers" id="cdk8s-jenkins.Jenkins.Initializer"></a>

```typescript
import { Jenkins } from 'cdk8s-jenkins'

new Jenkins(scope: Construct, id: string, props?: JenkinsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-jenkins.Jenkins.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk8s-jenkins.Jenkins.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-jenkins.Jenkins.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-jenkins.JenkinsProps">JenkinsProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-jenkins.Jenkins.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk8s-jenkins.Jenkins.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk8s-jenkins.Jenkins.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-jenkins.JenkinsProps">JenkinsProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-jenkins.Jenkins.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk8s-jenkins.Jenkins.addBasePlugins">addBasePlugins</a></code> | Add base plugins to jenkins instance. |
| <code><a href="#cdk8s-jenkins.Jenkins.addPlugins">addPlugins</a></code> | Add custom plugins to jenkins instance. |
| <code><a href="#cdk8s-jenkins.Jenkins.addSeedJobs">addSeedJobs</a></code> | Add seed jobs to jenkins instance. |

---

##### `toString` <a name="toString" id="cdk8s-jenkins.Jenkins.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addBasePlugins` <a name="addBasePlugins" id="cdk8s-jenkins.Jenkins.addBasePlugins"></a>

```typescript
public addBasePlugins(basePlugins: Plugin): void
```

Add base plugins to jenkins instance.

###### `basePlugins`<sup>Required</sup> <a name="basePlugins" id="cdk8s-jenkins.Jenkins.addBasePlugins.parameter.basePlugins"></a>

- *Type:* <a href="#cdk8s-jenkins.Plugin">Plugin</a>

List of base plugins.

---

##### `addPlugins` <a name="addPlugins" id="cdk8s-jenkins.Jenkins.addPlugins"></a>

```typescript
public addPlugins(plugins: Plugin): void
```

Add custom plugins to jenkins instance.

###### `plugins`<sup>Required</sup> <a name="plugins" id="cdk8s-jenkins.Jenkins.addPlugins.parameter.plugins"></a>

- *Type:* <a href="#cdk8s-jenkins.Plugin">Plugin</a>

List of custom plugins.

---

##### `addSeedJobs` <a name="addSeedJobs" id="cdk8s-jenkins.Jenkins.addSeedJobs"></a>

```typescript
public addSeedJobs(seedJobs: SeedJob): void
```

Add seed jobs to jenkins instance.

###### `seedJobs`<sup>Required</sup> <a name="seedJobs" id="cdk8s-jenkins.Jenkins.addSeedJobs.parameter.seedJobs"></a>

- *Type:* <a href="#cdk8s-jenkins.SeedJob">SeedJob</a>

List of seed jobs.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-jenkins.Jenkins.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk8s-jenkins.Jenkins.isConstruct"></a>

```typescript
import { Jenkins } from 'cdk8s-jenkins'

Jenkins.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk8s-jenkins.Jenkins.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-jenkins.Jenkins.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk8s-jenkins.Jenkins.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### JenkinsProps <a name="JenkinsProps" id="cdk8s-jenkins.JenkinsProps"></a>

Props for `Jenkins`.

#### Initializer <a name="Initializer" id="cdk8s-jenkins.JenkinsProps.Initializer"></a>

```typescript
import { JenkinsProps } from 'cdk8s-jenkins'

const jenkinsProps: JenkinsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-jenkins.JenkinsProps.property.basePlugins">basePlugins</a></code> | <code><a href="#cdk8s-jenkins.Plugin">Plugin</a>[]</code> | List of plugins required by Jenkins operator. |
| <code><a href="#cdk8s-jenkins.JenkinsProps.property.disableCsrfProtection">disableCsrfProtection</a></code> | <code>boolean</code> | Toggle for CSRF Protection on Jenkins resource. |
| <code><a href="#cdk8s-jenkins.JenkinsProps.property.metadata">metadata</a></code> | <code>cdk8s.ApiObjectMetadata</code> | Metadata associated with Jenkins resource. |
| <code><a href="#cdk8s-jenkins.JenkinsProps.property.plugins">plugins</a></code> | <code><a href="#cdk8s-jenkins.Plugin">Plugin</a>[]</code> | List of custom plugins applied to Jenkins resource. |
| <code><a href="#cdk8s-jenkins.JenkinsProps.property.seedJobs">seedJobs</a></code> | <code><a href="#cdk8s-jenkins.SeedJob">SeedJob</a>[]</code> | List of seed job configuration for Jenkins resource. |

---

##### `basePlugins`<sup>Optional</sup> <a name="basePlugins" id="cdk8s-jenkins.JenkinsProps.property.basePlugins"></a>

```typescript
public readonly basePlugins: Plugin[];
```

- *Type:* <a href="#cdk8s-jenkins.Plugin">Plugin</a>[]
- *Default:* Default base plugins:        { name: 'kubernetes', version: '1.31.3' },       { name: 'workflow-job', version: '1145.v7f2433caa07f' },       { name: 'workflow-aggregator', version: '2.6' },       { name: 'git', version: '4.10.3' },       { name: 'job-dsl', version: '1.78.1' },       { name: 'configuration-as-code', version: '1414.v878271fc496f' },       { name: 'kubernetes-credentials-provider', version: '0.20' }

List of plugins required by Jenkins operator.

---

##### `disableCsrfProtection`<sup>Optional</sup> <a name="disableCsrfProtection" id="cdk8s-jenkins.JenkinsProps.property.disableCsrfProtection"></a>

```typescript
public readonly disableCsrfProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Toggle for CSRF Protection on Jenkins resource.

---

##### `metadata`<sup>Optional</sup> <a name="metadata" id="cdk8s-jenkins.JenkinsProps.property.metadata"></a>

```typescript
public readonly metadata: ApiObjectMetadata;
```

- *Type:* cdk8s.ApiObjectMetadata
- *Default:* : Default metadata values:  {      name: An app-unique name generated by the chart,      annotations: No annotations,      labels: { app: 'jenkins' },      namespace: default,      finalizers: No finalizers,      ownerReferences: Automatically set by Kubernetes  }

Metadata associated with Jenkins resource.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="cdk8s-jenkins.JenkinsProps.property.plugins"></a>

```typescript
public readonly plugins: Plugin[];
```

- *Type:* <a href="#cdk8s-jenkins.Plugin">Plugin</a>[]
- *Default:* []

List of custom plugins applied to Jenkins resource.

---

##### `seedJobs`<sup>Optional</sup> <a name="seedJobs" id="cdk8s-jenkins.JenkinsProps.property.seedJobs"></a>

```typescript
public readonly seedJobs: SeedJob[];
```

- *Type:* <a href="#cdk8s-jenkins.SeedJob">SeedJob</a>[]
- *Default:* = []

List of seed job configuration for Jenkins resource.

For more information about seed jobs, please take a look at { @link https://github.com/jenkinsci/job-dsl-plugin/wiki/Tutorial---Using-the-Jenkins-Job-DSL Jenkins Seed Jobs Documentation }.

---

### Plugin <a name="Plugin" id="cdk8s-jenkins.Plugin"></a>

Jenkins plugin.

#### Initializer <a name="Initializer" id="cdk8s-jenkins.Plugin.Initializer"></a>

```typescript
import { Plugin } from 'cdk8s-jenkins'

const plugin: Plugin = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-jenkins.Plugin.property.name">name</a></code> | <code>string</code> | The name of Jenkins plugin. |
| <code><a href="#cdk8s-jenkins.Plugin.property.version">version</a></code> | <code>string</code> | The version of Jenkins plugin. |
| <code><a href="#cdk8s-jenkins.Plugin.property.downloadUrl">downloadUrl</a></code> | <code>string</code> | The url from where plugin has to be downloaded. |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk8s-jenkins.Plugin.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of Jenkins plugin.

---

##### `version`<sup>Required</sup> <a name="version" id="cdk8s-jenkins.Plugin.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

The version of Jenkins plugin.

---

##### `downloadUrl`<sup>Optional</sup> <a name="downloadUrl" id="cdk8s-jenkins.Plugin.property.downloadUrl"></a>

```typescript
public readonly downloadUrl: string;
```

- *Type:* string

The url from where plugin has to be downloaded.

By default the plugins are downloaded from Jenkins Update Centers. For more information, take a look { @link https://github.com/jenkinsci/kubernetes-operator/blob/master/pkg/configuration/base/resources/scripts_configmap.go#L121-L124 here }.

---

### SeedJob <a name="SeedJob" id="cdk8s-jenkins.SeedJob"></a>

Jenkins seed job.

#### Initializer <a name="Initializer" id="cdk8s-jenkins.SeedJob.Initializer"></a>

```typescript
import { SeedJob } from 'cdk8s-jenkins'

const seedJob: SeedJob = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-jenkins.SeedJob.property.description">description</a></code> | <code>string</code> | The description of the seed job. |
| <code><a href="#cdk8s-jenkins.SeedJob.property.id">id</a></code> | <code>string</code> | The unique name for the seed job. |
| <code><a href="#cdk8s-jenkins.SeedJob.property.repositoryBranch">repositoryBranch</a></code> | <code>string</code> | The repository branch where seed job definitions are present. |
| <code><a href="#cdk8s-jenkins.SeedJob.property.repositoryUrl">repositoryUrl</a></code> | <code>string</code> | The repository access URL. |
| <code><a href="#cdk8s-jenkins.SeedJob.property.targets">targets</a></code> | <code>string</code> | The repository path where seed job definitions are present. |

---

##### `description`<sup>Required</sup> <a name="description" id="cdk8s-jenkins.SeedJob.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description of the seed job.

---

##### `id`<sup>Required</sup> <a name="id" id="cdk8s-jenkins.SeedJob.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The unique name for the seed job.

---

##### `repositoryBranch`<sup>Required</sup> <a name="repositoryBranch" id="cdk8s-jenkins.SeedJob.property.repositoryBranch"></a>

```typescript
public readonly repositoryBranch: string;
```

- *Type:* string

The repository branch where seed job definitions are present.

---

##### `repositoryUrl`<sup>Required</sup> <a name="repositoryUrl" id="cdk8s-jenkins.SeedJob.property.repositoryUrl"></a>

```typescript
public readonly repositoryUrl: string;
```

- *Type:* string

The repository access URL.

Supports SSH and HTTPS.

---

##### `targets`<sup>Required</sup> <a name="targets" id="cdk8s-jenkins.SeedJob.property.targets"></a>

```typescript
public readonly targets: string;
```

- *Type:* string

The repository path where seed job definitions are present.

---



