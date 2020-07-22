'use strict';

const createRazzleTestConfig = require('razzle/config/createRazzleTestConfig');
const pluginFunc = require('../index');
const { fileLoaderFinder, mdxLoaderFinder } = require('../helpers');

describe('razzle-mdx-plugin', () => {
  let config;
  beforeAll(async () => {
    config = await createRazzleTestConfig('web', 'dev', {
      plugins: [{ func: pluginFunc }],
    });
  });

  it('should add .md and .mdx to extensions', () => {
    expect(config.resolve.extensions).toContain('.md');
    expect(config.resolve.extensions).toContain('.mdx');
  });

  it('should add mdx-loader', () => {
    const rule = config.module.rules.find(mdxLoaderFinder);
    expect(rule).not.toBeUndefined();
  });

  it('should add mdx format to exclude', () => {
    const fileRule = config.module.rules.find(fileLoaderFinder);
    expect(fileRule.exclude).toContainEqual(/\.mdx?$/);
  });
});
