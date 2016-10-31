const defaultConfig = require('../../src/helpers/default-config');
const validate = require('../../src/helpers/validate');

describe('helpers', () => {
  describe('validate', () => {
    describe('when config is empty', () => {
      const config = validate();

      it(`then title === ${defaultConfig.title}`, () => {
        expect(config.title).toEqual(defaultConfig.title);
      });

      it(`then path === ${defaultConfig.path}`, () => {
        expect(config.path).toEqual(defaultConfig.path);
      });

      it(`then spans === ${JSON.stringify(defaultConfig.spans)}`, () => {
        expect(config.spans).toEqual(defaultConfig.spans);
      });

      it(`then route === ${defaultConfig.route}`, () => {
        expect(config.route).toEqual(defaultConfig.route);
      });
    });

    describe('when config is invalid', () => {
      const config = validate({
        title: true,
        path: false,
        spans: 'not-an-array',
        route: 'not-an-object'
      });

      it(`then title === ${defaultConfig.title}`, () => {
        expect(config.title).toEqual(defaultConfig.title);
      });

      it(`then path === ${defaultConfig.path}`, () => {
        expect(config.path).toEqual(defaultConfig.path);
      });

      it(`then spans === ${JSON.stringify(defaultConfig.spans)}`, () => {
        expect(config.spans).toEqual(defaultConfig.spans);
      });

      it(`then route === ${JSON.stringify(defaultConfig.route)}`, () => {
        expect(config.route).toEqual(defaultConfig.route);
      });
    });

    describe('when config is valid', () => {
      const customConfig = {
        title: 'Custom title',
        path: '/custom-path',
        spans: [{}, {}, {}],
        route: { auth: false }
      }

      const config = validate(customConfig);

      it(`then title === ${customConfig.title}`, () => {
        expect(config.title).toEqual(customConfig.title);
      });

      it(`then path === ${customConfig.path}`, () => {
        expect(config.path).toEqual(customConfig.path);
      });

      it(`then spans === ${JSON.stringify(customConfig.spans)}`, () => {
        expect(config.spans).toEqual(customConfig.spans);
      });

      it(`then route === ${JSON.stringify(customConfig.route)}`, () => {
        expect(config.route).toEqual(customConfig.route);
      });
    });
  });
});
