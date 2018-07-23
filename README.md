### description
here it is shown that the modules fs-extra graceful-fs and archiver allocate within the jest test memory, which they no longer release.

### execute testcase
```bash
 yarn test-gc
```

### error
If one of the LEAKY dependencies is commented into leak.js, memory per file is no longer freed.

#### leak.js
```js
// const fs = require('fs-extra'); //TODO: LEAKY
// const fs = require('graceful-fs'); //TODO: LEAKY
// const archiver = require('archiver'); //TODO: LEAKY
```

#### result without one of "leaky" moduls. 
```bash
$ node --expose-gc ./node_modules/jest/bin/jest --runInBand --no-cache --logHeapUsage
 PASS  __tests__/leak.test.js (1).js (40 MB heap size)
 PASS  __tests__/leak.test.js (11).js (40 MB heap size)
 PASS  __tests__/leak.test.js (2).js (40 MB heap size)
 PASS  __tests__/leak.test.js (4).js (40 MB heap size)
 PASS  __tests__/leak.test.js (10).js (40 MB heap size)
 PASS  __tests__/leak.test.js (5).js (40 MB heap size)
 PASS  __tests__/leak.test.js (6).js (40 MB heap size)
 PASS  __tests__/leak.test.js (8).js (40 MB heap size)
 PASS  __tests__/leak.test.js (7).js (40 MB heap size)
 PASS  __tests__/leak.test.js (9).js (40 MB heap size)
 PASS  __tests__/leak.test.js (3).js (40 MB heap size)

Test Suites: 11 passed, 11 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        4.134s
Ran all test suites.
Done in 5.05s.
```

#### result with fs-extra
```bash
$ node --expose-gc ./node_modules/jest/bin/jest --runInBand --no-cache --logHeapUsage
 PASS  __tests__/leak.test.js (1).js (40 MB heap size)
 PASS  __tests__/leak.test.js (11).js (43 MB heap size)
 PASS  __tests__/leak.test.js (2).js (46 MB heap size)
 PASS  __tests__/leak.test.js (3).js (50 MB heap size)
 PASS  __tests__/leak.test.js (10).js (53 MB heap size)
 PASS  __tests__/leak.test.js (5).js (56 MB heap size)
 PASS  __tests__/leak.test.js (6).js (59 MB heap size)
 PASS  __tests__/leak.test.js (7).js (62 MB heap size)
 PASS  __tests__/leak.test.js (9).js (65 MB heap size)
 PASS  __tests__/leak.test.js (8).js (68 MB heap size)
 PASS  __tests__/leak.test.js (4).js (71 MB heap size)

Test Suites: 11 passed, 11 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        4.788s
Ran all test suites.
Done in 5.71s.
```

#### result with graceful-fs
```bash
$ node --expose-gc ./node_modules/jest/bin/jest --runInBand --no-cache --logHeapUsage
 PASS  __tests__/leak.test.js (1).js (40 MB heap size)
 PASS  __tests__/leak.test.js (11).js (43 MB heap size)
 PASS  __tests__/leak.test.js (2).js (46 MB heap size)
 PASS  __tests__/leak.test.js (3).js (49 MB heap size)
 PASS  __tests__/leak.test.js (10).js (52 MB heap size)
 PASS  __tests__/leak.test.js (5).js (55 MB heap size)
 PASS  __tests__/leak.test.js (6).js (58 MB heap size)
 PASS  __tests__/leak.test.js (7).js (61 MB heap size)
 PASS  __tests__/leak.test.js (8).js (64 MB heap size)
 PASS  __tests__/leak.test.js (9).js (66 MB heap size)
 PASS  __tests__/leak.test.js (4).js (69 MB heap size)

Test Suites: 11 passed, 11 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        4.682s
Ran all test suites.
Done in 5.57s.
```
#### result with node fs & archiver
```bash
$ node --expose-gc ./node_modules/jest/bin/jest --runInBand --no-cache --logHeapUsage
 PASS  __tests__/leak.test.js (1).js (43 MB heap size)
 PASS  __tests__/leak.test.js (2).js (47 MB heap size)
 PASS  __tests__/leak.test.js (3).js (51 MB heap size)
 PASS  __tests__/leak.test.js (4).js (54 MB heap size)
 PASS  __tests__/leak.test.js (11).js (58 MB heap size)
 PASS  __tests__/leak.test.js (6).js (62 MB heap size)
 PASS  __tests__/leak.test.js (7).js (65 MB heap size)
 PASS  __tests__/leak.test.js (8).js (69 MB heap size)
 PASS  __tests__/leak.test.js (9).js (72 MB heap size)
 PASS  __tests__/leak.test.js (10).js (76 MB heap size)
 PASS  __tests__/leak.test.js (5).js (80 MB heap size)

Test Suites: 11 passed, 11 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        5.335s
Ran all test suites.
Done in 6.26s.
```


