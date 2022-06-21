import { Construct } from 'constructs';
import {
  Jenkins as JenkinsCustomResource,
  JenkinsSpecMasterContainers as JenkinsContainerConfiguration,
  JenkinsSpecMasterContainersResourcesLimits as JenkinsContainerLimits,
} from './imports/jenkins.io';

/**
 * Jenkins plugin.
 */
export interface Plugin {
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

/**
 * Jenkins seed job.
 */
export interface SeedJob {
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

/**
 * Props for `Jenkins`.
 */
export interface JenkinsProps {
  /**
   * Namespace to apply to all Jenkins resources. The Jenkins Operator must be
   * installed in this namespace for resources to be recognized.
   *
   * @default - 'default'
   */
  readonly namespace?: string;
  /**
   * Labels to apply to all Jenkins resources.
   *
   * @default - { app: 'jenkins' }
   */
  readonly labels?: {[name: string]: string};
  /**
   * Toggle for CSRF Protection on Jenkins resource.
   *
   * @default - false
   */
  readonly disableCsrfProtection?: boolean;
  /**
   * List of plugins required by Jenkins operator.
   *
   * @default - { name: 'kubernetes', version: '1.31.3' }, { name: 'workflow-job', version: '1145.v7f2433caa07f' }, { name: 'workflow-aggregator', version: '2.6' }, { name: 'git', version: '4.10.3' }, { name: 'job-dsl', version: '1.78.1' }, { name: 'configuration-as-code', version: '1414.v878271fc496f' }, { name: 'kubernetes-credentials-provider', version: '0.20' }
   */
  readonly basePlugins?: Plugin[];
  /**
   * List of custom plugins applied to Jenkins resource.
   *
   * @default - []
   */
  readonly plugins?: Plugin[];
  /**
   * List of seed job configuration for Jenkins resource.
   */
  readonly seedJobs?: SeedJob[];
}

/**
 * A jenkins instance.
 */
export class Jenkins extends Construct {
  private _plugins: Plugin[];
  private _basePlugins: Plugin[];
  private _seedJobs: SeedJob[];

  constructor(scope: Construct, id: string, props: JenkinsProps = {}) {
    super(scope, id);

    const namespace = props.namespace ?? 'default';
    const labels = props.labels ?? { app: 'jenkins' };
    const authorizationStrategy = 'createUser';
    const disableCSRFProtection = props.disableCsrfProtection ?? false;
    this._basePlugins = getJenkinsBasePlugins(props.basePlugins);
    this._plugins = props.plugins ?? [];
    const containers = getContainerConfiguration();
    this._seedJobs = props.seedJobs ?? [];

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
          basePlugins: this._basePlugins,
          plugins: this._plugins,
        },
        seedJobs: this._seedJobs,
      },
    });

    this.node.defaultChild = jenkinsCustomResource;
  }

  /**
   * Add base plugins to jenkins instance.
   * @param basePlugins List of base plugins.
   */
  public addBasePlugins(...basePlugins: Plugin[]): void {
    this._basePlugins.push(...basePlugins);
  }

  /**
   * Add custom plugins to jenkins instance.
   * @param plugins List of custom plugins.
   */
  public addPlugins(...plugins: Plugin[]): void {
    this._plugins.push(...plugins);
  }

  /**
   * Add seed jobs to jenkins instance.
   * @param seedJobs List of seed jobs.
   */
  public addSeedJobs(...seedJobs: SeedJob[]): void {
    this._seedJobs.push(...seedJobs);
  }
}

function getJenkinsBasePlugins(basePluginsUpdates: Plugin[] | undefined): Plugin[] {
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

  for (const basePluginUpdate of basePluginsUpdates ?? basePlugins) {
    for (const basePlugin of basePlugins) {
      if (basePlugin.name == basePluginUpdate.name && basePlugin.version != basePluginUpdate.version) {
        basePlugin.version = basePluginUpdate.version;
      }
    }
  }

  return basePlugins;
}

function getContainerConfiguration(): JenkinsContainerConfiguration[] {
  // Keeping container resources defaults similar to Jenkins defaults here: https://jenkinsci.github.io/kubernetes-operator/docs/getting-started/latest/installing-the-operator/
  const jenkinsContainersConfiguration: JenkinsContainerConfiguration[] = [
    {
      name: 'jenkins-master',
      image: 'jenkins/jenkins:lts',
      imagePullPolicy: 'Always',
      resources: {
        limits: {
          cpu: JenkinsContainerLimits.fromString('1500m'),
          memory: JenkinsContainerLimits.fromString('3Gi'),
        },
        requests: {
          cpu: JenkinsContainerLimits.fromString('1'),
          memory: JenkinsContainerLimits.fromString('500M'),
        },
      },
    },
  ];

  return jenkinsContainersConfiguration;
}