const middleware = require('../src/middleware-wrapper');
const defaultConfig = require('../src/helpers/default-config');

describe('hapijs-status-monitor', () => {
  describe('when initialised', () => {
    it('then it should be an instance of Function', () => {
      expect(middleware).toBeInstanceOf(Function);
    });

    describe('when invoked', () => {
      const server = { socket: {}, on: jest.fn(), route: jest.fn(), ext: jest.fn() };
      const options = { send: jest.fn() };
      const next = jest.fn();

      it(`and server.path === ${defaultConfig.path}, then next() called one times`, () => {
        server.path = defaultConfig.path;
        middleware(server, options, next);
        expect(next).toHaveBeenCalledTimes(1);
      });

      it(`and server.path !== ${defaultConfig.path}, then next() called two times`, () => {
        server.path = '/another-path';
        middleware(server, options, next);
        expect(next).toHaveBeenCalledTimes(2);
      });
    });
  });
});
