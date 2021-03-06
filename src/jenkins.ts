import * as cdk8s from 'cdk8s';
import { Construct } from 'constructs';
import * as jenkins from './imports/jenkins.io';

/**
 * Jenkins plugin.
 */
export interface Plugin {
  /**
   * The url from where plugin has to be downloaded.
   * @default - Plugins are downloaded from Jenkins Update Centers.
   * @see https://github.com/jenkinsci/kubernetes-operator/blob/master/pkg/configuration/base/resources/scripts_configmap.go#L121-L124
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
   * Metadata associated with Jenkins resource.
   *
   * @default: Default metadata values:
   *          {
   *              name: An app-unique name generated by the chart,
   *              annotations: No annotations,
   *              labels: { app: 'jenkins' },
   *              namespace: default,
   *              finalizers: No finalizers,
   *              ownerReferences: Automatically set by Kubernetes
   *          }
   */
  readonly metadata?: cdk8s.ApiObjectMetadata;
  /**
   * Toggle for CSRF Protection on Jenkins resource.
   *
   * @default - false
   */
  readonly disableCsrfProtection?: boolean;
  /**
   * List of plugins required by Jenkins operator.
   *
   * @default - Default base plugins:
   *
   *                { name: 'kubernetes', version: '1.31.3' },
   *                { name: 'workflow-job', version: '1145.v7f2433caa07f' },
   *                { name: 'workflow-aggregator', version: '2.6' },
   *                { name: 'git', version: '4.10.3' },
   *                { name: 'job-dsl', version: '1.78.1' },
   *                { name: 'configuration-as-code', version: '1414.v878271fc496f' },
   *                { name: 'kubernetes-credentials-provider', version: '0.20' }
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
   * For more information about seed jobs, please take a look at { @link https://github.com/jenkinsci/job-dsl-plugin/wiki/Tutorial---Using-the-Jenkins-Job-DSL Jenkins Seed Jobs Documentation }.
   *
   * @default - No seed jobs
   */
  readonly seedJobs?: SeedJob[];
}

/**
 * A jenkins instance.
 */
export class Jenkins extends Construct {
  private _plugins: Plugin[];
  private _basePlugins: Map<string, string>;
  private _seedJobs: SeedJob[];

  constructor(scope: Construct, id: string, props: JenkinsProps = {}) {
    super(scope, id);

    this._plugins = props.plugins ?? [];
    this._seedJobs = props.seedJobs ?? [];
    this._basePlugins = new Map<string, string>([
      ['kubernetes', '1.31.3'],
      ['workflow-job', '1145.v7f2433caa07f'],
      ['workflow-aggregator', '2.6'],
      ['git', '4.10.3'],
      ['job-dsl', '1.78.1'],
      ['configuration-as-code', '1414.v878271fc496f'],
      ['kubernetes-credentials-provider', '0.20'],
    ]);
    this.addBasePlugins(...(props.basePlugins ?? []));
    const metadata = {
      ...props.metadata,
      namespace: props.metadata?.namespace ?? 'default',
      labels: props.metadata?.labels ?? { app: 'jenkins' },
    };
    const authorizationStrategy = 'createUser';
    const disableCSRFProtection = props.disableCsrfProtection ?? false;
    // Keeping container resources defaults similar to Jenkins defaults here: https://jenkinsci.github.io/kubernetes-operator/docs/getting-started/latest/installing-the-operator/
    const containers = [
      {
        name: 'jenkins-master',
        image: 'jenkins/jenkins:lts',
        imagePullPolicy: 'Always',
        resources: {
          limits: {
            cpu: jenkins.JenkinsSpecMasterContainersResourcesLimits.fromString('1500m'),
            memory: jenkins.JenkinsSpecMasterContainersResourcesLimits.fromString('3Gi'),
          },
          requests: {
            cpu: jenkins.JenkinsSpecMasterContainersResourcesLimits.fromString('1'),
            memory: jenkins.JenkinsSpecMasterContainersResourcesLimits.fromString('500M'),
          },
        },
      },
    ];;

    const jenkinsCustomResource = new jenkins.Jenkins(this, 'Default', {
      metadata: metadata,
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
          basePlugins: cdk8s.Lazy.any({
            produce: () => {
              return Array.from(this._basePlugins, ([key, value]) => {
                return {
                  name: key,
                  version: value,
                };
              });
            },
          }),
          plugins: cdk8s.Lazy.any({
            produce: () => {
              return this._plugins;
            },
          }),
        },
        seedJobs: cdk8s.Lazy.any({
          produce: () => {
            return this._seedJobs;
          },
        }),
      },
    });

    this.node.defaultChild = jenkinsCustomResource;
  }

  /**
   * Add base plugins to jenkins instance.
   * @param basePlugins List of base plugins.
   */
  public addBasePlugins(...basePlugins: Plugin[]): void {
    for (const basePlugin of basePlugins) {
      this._basePlugins.set(basePlugin.name, basePlugin.version);
    }
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