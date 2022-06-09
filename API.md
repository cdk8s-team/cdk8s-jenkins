# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### Jenkins <a name="cdk8s-jenkins.Jenkins"></a>

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
public addBasePlugins(basePluginsUpdates: Plugins[])
```

###### `basePluginsUpdates`<sup>Required</sup> <a name="cdk8s-jenkins.Jenkins.parameter.basePluginsUpdates"></a>

- *Type:* [`cdk8s-jenkins.Plugins`](#cdk8s-jenkins.Plugins)[]

---

##### `addPlugins` <a name="cdk8s-jenkins.Jenkins.addPlugins"></a>

```typescript
public addPlugins(plugins: Plugins[])
```

###### `plugins`<sup>Required</sup> <a name="cdk8s-jenkins.Jenkins.parameter.plugins"></a>

- *Type:* [`cdk8s-jenkins.Plugins`](#cdk8s-jenkins.Plugins)[]

---

##### `addSeedJobs` <a name="cdk8s-jenkins.Jenkins.addSeedJobs"></a>

```typescript
public addSeedJobs(seedJobs: SeedJobs[])
```

###### `seedJobs`<sup>Required</sup> <a name="cdk8s-jenkins.Jenkins.parameter.seedJobs"></a>

- *Type:* [`cdk8s-jenkins.SeedJobs`](#cdk8s-jenkins.SeedJobs)[]

---




## Structs <a name="Structs"></a>

### JenkinsProps <a name="cdk8s-jenkins.JenkinsProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JenkinsProps } from 'cdk8s-jenkins'

const jenkinsProps: JenkinsProps = { ... }
```

##### `basePlugins`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.basePlugins"></a>

```typescript
public readonly basePlugins: Plugins[];
```

- *Type:* [`cdk8s-jenkins.Plugins`](#cdk8s-jenkins.Plugins)[]

---

##### `disableCsrfProtection`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.disableCsrfProtection"></a>

```typescript
public readonly disableCsrfProtection: boolean;
```

- *Type:* `boolean`

---

##### `labels`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

---

##### `namespace`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* `string`

---

##### `plugins`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.plugins"></a>

```typescript
public readonly plugins: Plugins[];
```

- *Type:* [`cdk8s-jenkins.Plugins`](#cdk8s-jenkins.Plugins)[]

---

##### `seedJobs`<sup>Optional</sup> <a name="cdk8s-jenkins.JenkinsProps.property.seedJobs"></a>

```typescript
public readonly seedJobs: SeedJobs[];
```

- *Type:* [`cdk8s-jenkins.SeedJobs`](#cdk8s-jenkins.SeedJobs)[]

---

### Plugins <a name="cdk8s-jenkins.Plugins"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { Plugins } from 'cdk8s-jenkins'

const plugins: Plugins = { ... }
```

##### `name`<sup>Required</sup> <a name="cdk8s-jenkins.Plugins.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* `string`

The name of Jenkins plugin.

---

##### `version`<sup>Required</sup> <a name="cdk8s-jenkins.Plugins.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* `string`

The version of Jenkins plugin.

---

##### `downloadUrl`<sup>Optional</sup> <a name="cdk8s-jenkins.Plugins.property.downloadUrl"></a>

```typescript
public readonly downloadUrl: string;
```

- *Type:* `string`

The url from where plugin has to be downloaded.

---

### SeedJobs <a name="cdk8s-jenkins.SeedJobs"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { SeedJobs } from 'cdk8s-jenkins'

const seedJobs: SeedJobs = { ... }
```

##### `description`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJobs.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

The description of the seed job.

---

##### `id`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJobs.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* `string`

The unique name for the seed job.

---

##### `repositoryBranch`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJobs.property.repositoryBranch"></a>

```typescript
public readonly repositoryBranch: string;
```

- *Type:* `string`

The repository branch where seed job definitions are present.

---

##### `repositoryUrl`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJobs.property.repositoryUrl"></a>

```typescript
public readonly repositoryUrl: string;
```

- *Type:* `string`

The repository access URL.

Supports SSH and HTTPS.

---

##### `targets`<sup>Required</sup> <a name="cdk8s-jenkins.SeedJobs.property.targets"></a>

```typescript
public readonly targets: string;
```

- *Type:* `string`

The repository path where seed job definitions are present.

---



