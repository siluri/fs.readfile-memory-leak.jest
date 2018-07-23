const leak = require('../leak');

describe('leaky', () => {

    afterAll(() => {
        global.gc();
    });

    test('read files ', () => {
        try {
            leak.readFiles();
        } catch (e) {
            throw new Error(e);
        }
        expect(true).toBeTruthy();
    });
});
