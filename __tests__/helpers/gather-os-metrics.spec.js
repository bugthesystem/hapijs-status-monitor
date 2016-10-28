const gatherOsMetrics = require('../../src/helpers/gather-os-metrics');
const defaultConfig = require('../../src/helpers/default-config');
const pidusage = require('pidusage');

describe('helpers', () => {
  describe('gather-os-metrics', () => {
    describe('when invoked', () => {
      it('then pidusage.stat should be called', () => {
        const span = defaultConfig.spans[0];
        pidusage.stat = jest.fn();

        gatherOsMetrics({}, span);

        expect(pidusage.stat).toHaveBeenCalled();
      });
    });
  });
});
