const defaultConfig = require('../../src/helpers/default-config');

describe('helpers', () => {
  describe('default-config', () => {
    describe('when default config', () => {
      it('then title === hapi.js Status', () => {
        expect('hapi.js Status').toEqual(defaultConfig.title);
      });

      it('then path === /status', () => {
        expect('/status').toEqual(defaultConfig.path);
      });

      it('then base === /', () => {
        expect('/').toEqual(defaultConfig.base);
      });


      it('then spans === array', () => {
        const spans = [
          { interval: 1, retention: 60, responses: [] },
          { interval: 5, retention: 60, responses: [] },
          { interval: 15, retention: 60, responses: [] },
        ];

        expect(spans).toEqual(defaultConfig.spans);
      });

      it('then routeConfig === {}', () => {
        expect({}).toEqual(defaultConfig.routeConfig);
      });
    });
  });
});
