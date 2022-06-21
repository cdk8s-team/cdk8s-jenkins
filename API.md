# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### Jenkins <a name="cdk8s-jenkins.Jenkins"></a>

A jenkins instance.

#### Initializers <a name="cdk8s-jenkins.Jenkins.Initializer"></a>

```typescript
import { Jenkins } from 'cdk8s-jenkins'

new Jenkins(scope: Construct, id: string, props?: JenkinsProps)
```

##### `scope`<sup>Required</sup> <a name="cdk8s-jenkins.Jenkins.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk8s-jenkins.Jenkins.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk8s-jenkins.Jenkins.parameter.props"></a>

- *Type:* [`cdk8s-jenkins.JenkinsProps`](#cdk8s-jenkins.JenkinsProps)

---

#### Methods <a name="Methods"></a>

##### `addBasePlugins` <a name="cdk8s-jenkins.Jenkins.addBasePlugins"></a>

```typescript
public addBasePlugins(basePlugins: Plugin)
```

###### `basePlugins`<sup>Required</sup> <a name="cdk8s-jenkins.Jenkins.parameter.basePlugins"></a>

- *Type:* [`cdk8s-jenkins.Plugin`](#cdk8s-jenkins.Plugin)

List of base plugins.

---

##### `addPlugins` <a name="cdk8s-jenkins.Jenkins.addPlugins"></a>

```typescript
public addPlugins(plugins: Plugin)
```

###### `plugins`<sup>Required</sup> <a name="cdk8s-jenkins.Jenkins.parameter.plugins"></a>

- *Type:* [`cdk8s-jenkins.Plugin`](#cdk8s-jenkins.Plugin)

List of custom plugins.

---

##### `addSeedJobs` <a name="cdk8s-jenkins.Jenkins.addSeedJobs"></a>

```typescript
public addSeedJobs(seedJobs: SeedJob)
```

###### `seedJobs`<sup>Required</sup> <a name="cdk8s-jenkins.Jenkins.parameter.seedJobs"></a>

- *Type:* [`cdk8s-jenkins.SeedJob`](#cdk8s-jenkins.SeedJob)

List of seed jobs.

---




## Structs <a name="Structs"></a>

### JenkinsProps <a name="cdk8s-jenkins.JenkinsProps"></a>

Props for `Jenkins`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JenkinsProps } from 'cdk8s-jenkins'

const jenkinsProps: JenkinsProps = { ... }
```

##### `basePlugins`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.basePlugins"></a>

```typescript
public readonly basePlugins: Plugin[];
```

- *Type:* [`cdk8s-jenkins.Plugin`](#cdk8s-jenkins.Plugin)[]
- *Default:* { name: 'kubernetes', version: '1.31.3' }, { name: 'workflow-job', version: '1145.v7f2433caa07f' }, { name: 'workflow-aggregator', version: '2.6' }, { name: 'git', version: '4.10.3' }, { name: 'job-dsl', version: '1.78.1' }, { name: 'configuration-as-code', version: '1414.v878271fc496f' }, { name: 'kubernetes-credentials-provider', version: '0.20' }

List of plugins required by Jenkins operator.

---

##### `disableCsrfProtection`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.disableCsrfProtection"></a>

```typescript
public readonly disableCsrfProtection: boolean;
```

- *Type:* `boolean`
- *Default:* false

Toggle for CSRF Protection on Jenkins resource.

---

##### `labels`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}
- *Default:* { app: 'jenkins' }

Labels to apply to all Jenkins resources.

---

##### `namespace`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* `string`
- *Default:* 'default'

Namespace to apply to all Jenkins resources.

The Jenkins Operator must be
installed in this namespace for resources to be recognized.

---

##### `plugins`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.plugins"></a>

```typescript
public readonly plugins: Plugin[];
```

- *Type:* [`cdk8s-jenkins.Plugin`](#cdk8s-jenkins.Plugin)[]
- *Default:* []

List of custom plugins applied to Jenkins resource.

---

##### `seedJobs`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.seedJobs"></a>

```typescript
public readonly seedJobs: SeedJob[];
```

- *Type:* [`cdk8s-jenkins.SeedJob`](#cdk8s-jenkins.SeedJob)[]

List of seed job configuration for Jenkins resource.

---

### Plugin <a name="cdk8s-jenkins.Plugin"></a>

Jenkins plugin.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { Plugin } from 'cdk8s-jenkins'

const plugin: Plugin = { ... }
```

##### `name`<sup>Required</sup> <a name="cdk8s-jenkins.Plugin.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* `string`

The name of Jenkins plugin.

---

##### `version`<sup>Required</sup> <a name="cdk8s-jenkins.Plugin.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* `string`

The version of Jenkins plugin.

---

##### `downloadUrl`<sup>Optional</sup> <a name="cdk8s-jenkins.Plugin.property.downloadUrl"></a>

```typescript
public readonly downloadUrl: string;
```

- *Type:* `string`

The url from where plugin has to be downloaded.

---

### SeedJob <a name="cdk8s-jenkins.SeedJob"></a>

Jenkins seed job.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { SeedJob } from 'cdk8s-jenkins'

const seedJob: SeedJob = { ... }
```

##### `description`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJob.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

The description of the seed job.

---

##### `id`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJob.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* `string`

The unique name for the seed job.

---

##### `repositoryBranch`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJob.property.repositoryBranch"></a>

```typescript
public readonly repositoryBranch: string;
```

- *Type:* `string`

The repository branch where seed job definitions are present.

---

##### `repositoryUrl`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJob.property.repositoryUrl"></a>

```typescript
public readonly repositoryUrl: string;
```

- *Type:* `string`

The repository access URL.

Supports SSH and HTTPS.

---

##### `targets`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJob.property.targets"></a>

```typescript
public readonly targets: string;
```

- *Type:* `string`

The repository path where seed job definitions are present.

---



