const socketIoInit = require('../../src/helpers/socket-io-init');
const defaultConfig = require('../../src/helpers/default-config');

jest.enableAutomock();

describe('helpers', () => {
  describe('socket-io-init', () => {
    describe('when invoked', () => {
      it('then all spans should have os and responses property', () => {
        const { spans } = defaultConfig;

        spans.forEach((span) => {
          expect(span.os).toBeUndefined();
        });

        socketIoInit({}, spans);

        spans.forEach((span) => {
          expect(span.os).toBeDefined();
          expect(span.responses).toBeDefined();
        });
      });
    });
  });
});
