import { ApiObject, JsonPatch } from 'cdk8s';
import { Construct } from 'constructs';
import {
  Jenkins as JenkinsCustomResource,
  JenkinsSpecMasterContainers as JenkinsContainerConfiguration,
  JenkinsSpecMasterContainersResourcesLimits as JenkinsContainerLimits,
} from './imports/jenkins.io';

export interface Plugins {
  /**
   * The url from where plugin has to be downloaded.
   */
  readonly downloadUrl?: string;

  /**
   * The name of Jenkins plugin.
   */
  readonly name: string;

  /**
   * The version of Jenkins plugin.
   */
  readonly version: string;
}

export interface SeedJobs {
  /**
   * The unique name for the seed job.
   */
  readonly id: string;

  /**
   * The description of the seed job.
   */
  readonly description: string;

  /**
   * The repository branch where seed job definitions are present.
   */
  readonly repositoryBranch: string;

  /**
   * The repository access URL. Supports SSH and HTTPS.
   */
  readonly repositoryUrl: string;

  /**
   * The repository path where seed job definitions are present.
   */
  readonly targets: string;
}

export interface JenkinsProps {
  readonly namespace?: string;
  readonly labels?: {[name: string]: string};
  readonly disableCsrfProtection?: boolean;
  readonly basePlugins?: Plugins[];
  readonly plugins?: Plugins[];
  readonly seedJobs?: SeedJobs[];
}

export class Jenkins extends Construct {
  constructor(scope: Construct, id: string, props: JenkinsProps = {}) {
    super(scope, id);

    const namespace = props.namespace ?? 'default';
    const labels = props.labels ?? { app: 'jenkins' };
    const authorizationStrategy = 'createUser';
    const disableCSRFProtection = props.disableCsrfProtection ?? false;
    const basePlugins = getJenkinsBasePlugins(props.basePlugins);
    const plugins = props.plugins ?? [];
    const containers = getContainerConfiguration();
    const seedJobs = props.seedJobs ?? [];

    const jenkinsCustomResource = new JenkinsCustomResource(this, 'JenkinsCustomResource', {
      metadata: {
        namespace: namespace,
        labels: labels,
        name: 'cdk8s-jenkins-construct',
      },
      spec: {
        groovyScripts: {
          configurations: [],
          secret: {
            name: '',
          },
        },
        configurationAsCode: {
          configurations: [],
          secret: {
            name: '',
          },
        },
        jenkinsApiSettings: {
          authorizationStrategy: authorizationStrategy,
        },
        master: {
          disableCsrfProtection: disableCSRFProtection,
          containers: containers,
          basePlugins: basePlugins,
          plugins: plugins,
        },
        seedJobs: seedJobs,
      },
    });

    this.node.defaultChild = jenkinsCustomResource;
  }

  public addBasePlugins(basePluginsUpdates: Plugins[]): void {
    const jenkinsApiObject = ApiObject.of(this);

    basePluginsUpdates.forEach((plugin) => {
      jenkinsApiObject.addJsonPatch(JsonPatch.add('/spec/master/basePlugins/-', plugin));
    });
  }

  public addPlugins(plugins: Plugins[]): void {
    const jenkinsApiObject = ApiObject.of(this);

    plugins.forEach((plugin) => {
      jenkinsApiObject.addJsonPatch(JsonPatch.add('/spec/master/plugins/-', plugin));
    });
  }

  public addSeedJobs(seedJobs: SeedJobs[]): void {
    const jenkinsApiObject = ApiObject.of(this);

    seedJobs.forEach((seedJob) => {
      jenkinsApiObject.addJsonPatch(JsonPatch.add('0/spec/seedJobs/-', seedJob));
    });
  }
}

function getJenkinsBasePlugins(basePluginsUpdates: Plugins[] | undefined): Plugins[] {
  const basePlugins = [
    {
      name: 'kubernetes',
      version: '1.31.3',
    },
    {
      name: 'workflow-job',
      version: '1145.v7f2433caa07f',
    },
    {
      name: 'workflow-aggregator',
      version: '2.6',
    },
    {
      name: 'git',
      version: '4.10.3',
    },
    {
      name: 'job-dsl',
      version: '1.78.1',
    },
    {
      name: 'configuration-as-code',
      version: '1414.v878271fc496f',
    },
    {
      name: 'kubernetes-credentials-provider',
      version: '0.20',
    },
  ];

  if (basePluginsUpdates == undefined || basePluginsUpdates.length == 0) {
    return basePlugins;
  }

  basePluginsUpdates.forEach((basePluginUpdate) => {
    basePlugins.forEach((basePlugin) => {
      if (basePlugin.name == basePluginUpdate.name && basePlugin.version != basePluginUpdate.version) {
        basePlugin.version = basePluginUpdate.version;
      }
    });
  });

  return basePlugins;
}

function getContainerConfiguration(): JenkinsContainerConfiguration[] {
  let jenkinsContainersConfiguration: JenkinsContainerConfiguration[] = [
    {
      name: 'jenkins-master',
      image: 'jenkins/jenkins:lts',
      imagePullPolicy: 'Always',
      resources: {
        limits: {
          cpu: JenkinsContainerLimits.fromString('2'),
          memory: JenkinsContainerLimits.fromString('3Gi'),
        },
        requests: {
          cpu: JenkinsContainerLimits.fromString('1'),
          memory: JenkinsContainerLimits.fromString('500Mi'),
        },
      },
    },
  ];

  return jenkinsContainersConfiguration;
}