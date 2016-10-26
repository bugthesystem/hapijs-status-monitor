const sendMetrics = require('../../src/helpers/send-metrics');

describe('helpers', () => {
  describe('send-metrics', () => {
    describe('when invoked', () => {
      it('then io.emit called', () => {
        const io = { emit: jest.fn() };
        const span = { os: [], responses: [] };

        sendMetrics(io, span);

        expect(io.emit).toHaveBeenCalledWith('stats', {
          'interval': undefined,
          'os': undefined,
          'responses': undefined,
          'retention': undefined
        });
      });
    });
  });
});
