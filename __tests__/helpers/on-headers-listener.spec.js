const onHeadersListener = require('../../src/helpers/on-headers-listener');
const defaultConfig = require('../../src/helpers/default-config');

describe('helpers', () => {
  describe('on-headers-listener', () => {
    describe('when invoked', () => {
      const { spans } = defaultConfig;

      beforeEach(() => {
        spans.map((currentSpan) => {
          const span = currentSpan;
          span.responses = [];

          return span;
        });
      });

      it('then for all spans, responses length should equal 1', () => {
        onHeadersListener(404, process.hrtime(), spans);

        spans.forEach((span) => {
          expect(span.responses.length).toBe(1);
        });
      });

      describe('when invoked after 1 second', () => {
        it('then for span interval 1, responses length should equal 2', () => {
          setTimeout(() => {
            onHeadersListener(500, process.hrtime(), spans);

            spans.forEach((span) => {
              if (span.interval === 1) {
                expect(span.responses.length).toBe(2);
              } else {
                expect(span.responses.length).toBe(1);
              }
            });
          }, 1000);
        });
      });
    });
  });
});
