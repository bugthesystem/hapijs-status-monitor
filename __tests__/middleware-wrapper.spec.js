const middleware = require('../src/middleware-wrapper');
const defaultConfig = require('../src/helpers/default-config');

describe('hapijs-status-monitor', () => {
  describe('when initialised', () => {
    it('then it should be an instance of Function', () => {
      expect(middleware).toBeInstanceOf(Function);
    });

    describe('when invoked', () => {
      let server;
      let options;

      beforeEach(() => {
        server = {
          socket: {},
          events: {
            on: jest.fn(),
          },
          route: jest.fn(),
          ext: jest.fn(),
        };

        options = { send: jest.fn() };
      });

      it(`and server.path === ${defaultConfig.path}, then on() called one times`, () => {
        server.path = defaultConfig.path;
        middleware(server, options);
        expect(server.events.on).toHaveBeenCalledTimes(1);
      });

      it(`and server.path === ${defaultConfig.path}, then route() called one times`, () => {
        server.path = defaultConfig.path;
        middleware(server, options);
        expect(server.route).toHaveBeenCalledTimes(1);
      });

      it(`and server.path === ${defaultConfig.path}, then ext() called one times`, () => {
        server.path = defaultConfig.path;
        middleware(server, options);
        expect(server.ext).toHaveBeenCalledTimes(1);
      });

      it(`and server.path !== ${defaultConfig.path}, then on() called one times`, () => {
        server.path = '/another-path';
        middleware(server, options);
        expect(server.events.on).toHaveBeenCalledTimes(1);
      });

      it(`and server.path !== ${defaultConfig.path}, then route() called one times`, () => {
        server.path = '/another-path';
        middleware(server, options);
        expect(server.route).toHaveBeenCalledTimes(1);
      });

      it(`and server.path !== ${defaultConfig.path}, then ext() called one times`, () => {
        server.path = '/another-path';
        middleware(server, options);
        expect(server.ext).toHaveBeenCalledTimes(1);
      });
    });
  });
});
