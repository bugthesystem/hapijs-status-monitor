const defaultConfig = require('../../src/helpers/default-config');
const validate = require('../../src/helpers/validate');

describe('helpers', () => {
  describe('validate', () => {
    describe('when config is null or undefined', () => {
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
    });

    describe('when config is invalid', () => {
      const config = validate({ title: true, path: false, spans: 'not-an-array' });

      it(`then title === ${defaultConfig.title}`, () => {
        expect(config.title).toEqual(defaultConfig.title);
      });

      it(`then path === ${defaultConfig.path}`, () => {
        expect(config.path).toEqual(defaultConfig.path);
      });

      it(`then spans === ${JSON.stringify(defaultConfig.spans)}`, () => {
        expect(config.spans).toEqual(defaultConfig.spans);
      });
    });

    describe('when config is valid', () => {
      const customConfig = { title: 'Custom title', path: '/custom-path', spans: [{}, {}, {}] }
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
    });
  });
});
