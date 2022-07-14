import { ApiObject, Chart, JsonPatch, Testing } from 'cdk8s';
import { Jenkins } from '../src';

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

  test('with metadata', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const namespace = 'jenkins-test-namespace';
    const labels = { customApp: 'my-jenkins' };
    const annotations = { custom: 'annotation' };

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      metadata: {
        namespace: namespace,
        labels: labels,
        annotations: annotations,
      },
    });

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    expect(manifest[0].metadata.namespace).toEqual(namespace);
    expect(manifest[0].metadata.labels).toEqual(labels);
    expect(manifest[0].metadata.annotations).toEqual(annotations);
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

  test('with an update to a base plugin in constructor', () => {
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

    for (const plugin of manifest[0].spec.master.basePlugins) {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      }
    }
  });

  test('with an update and a new base plugin in constructor', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const basePlugins = [{
      name: 'configuration-as-code',
      version: '1.55',
    },
    {
      name: 'a-new-base-plugin',
      version: '0.01',
    }];

    // WHEN
    new Jenkins(chart, 'my-jenkins', {
      basePlugins: basePlugins,
    });

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();

    for (const plugin of manifest[0].spec.master.basePlugins) {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      } else if (plugin.name == basePlugins[1].name) {
        expect(plugin.version).toEqual(basePlugins[1].version);
      }
    }
  });

  test('addBasePlugins function', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const basePlugins = [{
      name: 'configuration-as-code',
      version: '1.55',
    },
    {
      name: 'a-new-base-plugin',
      version: '0.01',
    }];

    // WHEN
    const jenkins = new Jenkins(chart, 'my-jenkins');
    jenkins.addBasePlugins(...basePlugins);

    // THEN
    const manifest = Testing.synth(chart);

    for (const plugin of manifest[0].spec.master.basePlugins) {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      } else if (plugin.name == basePlugins[1].name) {
        expect(plugin.version).toEqual(basePlugins[1].version);
      }
    }
  });

  test('with an update and a new base plugin in constructor and using addBasePlugin function', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const basePlugins = [{
      name: 'configuration-as-code',
      version: '1.55',
    },
    {
      name: 'a-new-base-plugin',
      version: '0.01',
    }];

    const newBasePlugins = [{
      name: 'kubernetes',
      version: '2.42',
    },
    {
      name: 'another-new-base-plugin',
      version: '0.011',
    }];

    // WHEN
    const jenkin = new Jenkins(chart, 'my-jenkins', {
      basePlugins: basePlugins,
    });

    jenkin.addBasePlugins(...newBasePlugins);

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();

    for (const plugin of manifest[0].spec.master.basePlugins) {
      switch (plugin.name) {
        case basePlugins[0].name:
          expect(plugin.version).toEqual(basePlugins[0].version);
          break;
        case basePlugins[1].name:
          expect(plugin.version).toEqual(basePlugins[1].version);
          break;
        case newBasePlugins[0].name:
          expect(plugin.version).toEqual(newBasePlugins[0].version);
          break;
        case newBasePlugins[1].name:
          expect(plugin.version).toEqual(newBasePlugins[1].version);
          break;
      }
    }
  });

  test('with a user added plugin in constructor', () => {
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
    jenkins.addPlugins(...plugins);

    // THEN
    const manifest = Testing.synth(chart);

    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.master.plugins[0].name).toEqual(plugins[0].name);
    expect(manifest[0].spec.master.plugins[0].version).toEqual(plugins[0].version);
  });

  test('with a user added plugin in constructor and addPlugins function', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'test');
    const plugins = [{
      name: 'simple-theme-plugin',
      version: '0.7',
    }];

    const morePlugins = [{
      name: 'a-new-plugin',
      version: '0.1',
    }];

    // WHEN
    const jenkins = new Jenkins(chart, 'my-jenkins', {
      plugins: plugins,
    });

    jenkins.addPlugins(...morePlugins);

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.master.plugins[0].name).toEqual(plugins[0].name);
    expect(manifest[0].spec.master.plugins[0].version).toEqual(plugins[0].version);
    expect(manifest[0].spec.master.plugins[1].name).toEqual(morePlugins[0].name);
    expect(manifest[0].spec.master.plugins[1].version).toEqual(morePlugins[0].version);
  });

  test('with seed jobs in constructor', () => {
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
    expect(manifest[0].spec.seedJobs[0]).toEqual(seedJobs[0]);
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
    jenkins.addSeedJobs(...seedJobs);

    // THEN
    const manifest = Testing.synth(chart);

    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.seedJobs[0]).toEqual(seedJobs[0]);
  });

  test('with seed jobs in constructor and addSeedJobs function', () => {
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

    const moreSeedJobs = [{
      id: 'jenkins-worker',
      targets: 'cicd/jobs/*.jenkins',
      description: 'Jenkins Worker repository',
      repositoryBranch: 'main',
      repositoryUrl: 'https://github.com/jenkinsci/kubernetes-operator.git',
    }];

    // WHEN
    const jenkins = new Jenkins(chart, 'my-jenkins', {
      seedJobs: seedJobs,
    });

    jenkins.addSeedJobs(...moreSeedJobs);

    // THEN
    const manifest = Testing.synth(chart);
    expect(manifest).toMatchSnapshot();
    expect(manifest[0].spec.seedJobs[0]).toEqual(seedJobs[0]);
    expect(manifest[0].spec.seedJobs[1]).toEqual(moreSeedJobs[0]);
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
      metadata: {
        namespace: namespace,
        labels: labels,
      },
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

    for (const plugin of manifest[0].spec.master.basePlugins) {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      }
    }
    expect(manifest[0].spec.master.plugins[0].name).toEqual(plugins[0].name);
    expect(manifest[0].spec.master.plugins[0].version).toEqual(plugins[0].version);
    expect(manifest[0].spec.seedJobs[0]).toEqual(seedJobs[0]);
  });

  test('with two jenkins instances with separate configurations', () => {
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
    new Jenkins(chart, 'instance-1', {
      metadata: {
        namespace: 'jenkins-instance-1',
        labels: { customApp: 'instance-1' },
      },
      disableCsrfProtection: true,
      basePlugins: [{
        name: 'configuration-as-code',
        version: '1.55',
      }],
      plugins: [{
        name: 'simple-theme-plugin',
        version: '0.7',
      }],
      seedJobs: seedJobs,
    });

    new Jenkins(chart, 'instance-2', {
      metadata: {
        namespace: 'jenkins-instance-2',
        labels: { customApp: 'instance-2' },
        annotations: { annotations: 'example-2' },
      },
      disableCsrfProtection: false,
      basePlugins: [{
        name: 'kubernetes',
        version: '2.14',
      }, {
        name: 'new-base-plugin',
        version: '0.01',
      }],
    });

    // THEN
    const manifest = Testing.synth(chart);

    expect(manifest).toMatchSnapshot();

    // Validating first jenkins instance
    expect(manifest[0].metadata.namespace).toEqual('jenkins-instance-1');
    expect(manifest[0].metadata.labels).toEqual({ customApp: 'instance-1' });
    expect(manifest[0].spec.master.disableCSRFProtection).toEqual(true);

    for (const plugin of manifest[0].spec.master.basePlugins) {
      if (plugin.name == 'configuration-as-code') {
        expect(plugin.version).toEqual('1.55');
      }
    }
    expect(manifest[0].spec.master.plugins[0].name).toEqual('simple-theme-plugin');
    expect(manifest[0].spec.master.plugins[0].version).toEqual('0.7');
    expect(manifest[0].spec.seedJobs[0]).toEqual(seedJobs[0]);

    // Validating second jenkins instance
    expect(manifest[1].metadata.namespace).toEqual('jenkins-instance-2');
    expect(manifest[1].metadata.labels).toEqual({ customApp: 'instance-2' });
    expect(manifest[1].metadata.annotations).toEqual({ annotations: 'example-2' });
    expect(manifest[1].spec.master.disableCSRFProtection).toEqual(false);

    for (const plugin of manifest[1].spec.master.basePlugins) {
      if (plugin.name == 'kubernetes') {
        expect(plugin.version).toEqual('2.14');
      } else if (plugin.name == 'new-base-plugin') {
        expect(plugin.version).toEqual('0.01');
      }
    }
    expect(manifest[1].spec.master.plugins).toEqual([]);
    expect(manifest[1].spec.seedJobs).toEqual([]);
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

    for (const plugin of manifest[0].spec.master.basePlugins) {
      if (plugin.name == basePlugins[0].name) {
        expect(plugin.version).toEqual(basePlugins[0].version);
      }
    }
  });
});