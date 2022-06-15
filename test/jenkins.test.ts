import { ApiObject, Chart, JsonPatch, Testing } from 'cdk8s';
import { Jenkins } from '../src';
import {
  JenkinsSpecMasterBasePlugins as JenkinsBasePlugins,
} from '../src/imports/jenkins.io';

describe('a jenkins instance', () => {
  test('with defaults', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');

    // WHEN
    new Jenkins(chart, 'my-jenkins');

    // THEN
    expect(Testing.synth(chart)).toMatchSnapshot();
  });

  test('with namespace', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const namespace = 'jenkins-test-namespace';

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      namespace: namespace,
    });

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    expect(manifest[0].metadata.namespace).toEqual(namespace);
  });

  test('with labels', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const labels = { customApp: 'my-jenkins' };

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      labels: labels,
    });

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    expect(manifest[0].metadata.labels).toEqual(labels);
  });

  test('with disableCsrfProtection as true', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const disableCSRFProtection = true;

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      disableCsrfProtection: disableCSRFProtection,
    });

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.master.disableCSRFProtection).toEqual(disableCSRFProtection);
  });

  test('with an update to a base plugin', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const basePlugins = [{
      name: 'configuration-as-code',
      version: '1.55',
    }];

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      basePlugins: basePlugins,
    });

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    manifest[0].spec.master.basePlugins.forEach((plugin: JenkinsBasePlugins) => {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      }
    });
  });

  test('with a user added plugin', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const plugins = [{
      name: 'simple-theme-plugin',
      version: '0.7',
    }];

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      plugins: plugins,
    });

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.master.plugins[0].name).toEqual(plugins[0].name);
    expect(manifest[0].spec.master.plugins[0].version).toEqual(plugins[0].version);
  });

  test('with seed jobs', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    // Seed Jobs Example: https://jenkinsci.github.io/kubernetes-operator/docs/getting-started/latest/deploying-jenkins/
    const seedJobs = [{
      id: 'jenkins-operator',
      targets: 'cicd/jobs/*.jenkins',
      description: 'Jenkins Operator repository',
      repositoryBranch: 'master',
      repositoryUrl: 'https://github.com/jenkinsci/kubernetes-operator.git',
    }];

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      seedJobs: seedJobs,
    });

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.seedJobs).toEqual(seedJobs);
  });

  test('addBasePlugins function', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const basePlugins = [{
      name: 'workflow-api',
      version: '2.76',
    }];

    // WHEN
    const jenkins = new Jenkins(chart, 'my-jenkins');
    jenkins.addBasePlugins(basePlugins);

    // THEN
    const manifest = Testing.synth(chart);

    expect(manifest).toMatchSnapshot();
    manifest[0].spec.master.basePlugins.forEach((plugin: JenkinsBasePlugins) => {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      }
    });
  });

  test('addPlugins function', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const plugins = [{
      name: 'simple-theme-plugin',
      version: '0.7',
    }];

    // WHEN
    const jenkins = new Jenkins(chart, 'my-jenkins');
    jenkins.addPlugins(plugins);

    // THEN
    const manifest = Testing.synth(chart);

    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.master.plugins[0].name).toEqual(plugins[0].name);
    expect(manifest[0].spec.master.plugins[0].version).toEqual(plugins[0].version);
  });

  test('addSeedJobs function', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    // Seed Jobs Example: https://jenkinsci.github.io/kubernetes-operator/docs/getting-started/latest/deploying-jenkins/
    const seedJobs = [{
      id: 'jenkins-operator',
      targets: 'cicd/jobs/*.jenkins',
      description: 'Jenkins Operator repository',
      repositoryBranch: 'master',
      repositoryUrl: 'https://github.com/jenkinsci/kubernetes-operator.git',
    }];

    // WHEN
    const jenkins = new Jenkins(chart, 'my-jenkins');
    jenkins.addSeedJobs(seedJobs);

    // THEN
    const manifest = Testing.synth(chart);

    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.seedJobs).toEqual(seedJobs);
  });

  test('with all fields mentioned', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');

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
    // Seed Jobs Example: https://jenkinsci.github.io/kubernetes-operator/docs/getting-started/latest/deploying-jenkins/
    const seedJobs = [{
      id: 'jenkins-operator',
      targets: 'cicd/jobs/*.jenkins',
      description: 'Jenkins Operator repository',
      repositoryBranch: 'master',
      repositoryUrl: 'https://github.com/jenkinsci/kubernetes-operator.git',
    }];

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      namespace: namespace,
      labels: labels,
      disableCsrfProtection: disableCSRFProtection,
      basePlugins: basePlugins,
      plugins: plugins,
      seedJobs: seedJobs,
    });

    // THEN
    const manifest = Testing.synth(chart);

    expect(manifest).toMatchSnapshot();
    expect(manifest[0].metadata.namespace).toEqual(namespace);
    expect(manifest[0].metadata.labels).toEqual(labels);
    expect(manifest[0].spec.master.disableCSRFProtection).toEqual(disableCSRFProtection);
    manifest[0].spec.master.basePlugins.forEach((plugin: JenkinsBasePlugins) => {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      }
    });
    expect(manifest[0].spec.master.plugins[0].name).toEqual(plugins[0].name);
    expect(manifest[0].spec.master.plugins[0].version).toEqual(plugins[0].version);
    expect(manifest[0].spec.seedJobs).toEqual(seedJobs);
  });

  test(('modify base plugin version using escape hatches'), () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const basePlugins = [{
      name: 'workflow-job',
      version: '3.00',
    }];

    // WHEN
    const jenkins = new Jenkins(chart, 'my-jenkins');
    const jenkinsApiObject = ApiObject.of(jenkins);
    jenkinsApiObject.addJsonPatch(JsonPatch.replace('/spec/master/basePlugins/1', basePlugins[0]));

    // THEN
    const manifest = Testing.synth(chart);

    expect(manifest).toMatchSnapshot();
    manifest[0].spec.master.basePlugins.forEach((plugin: JenkinsBasePlugins) => {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      }
    });
  });
});