const path = require('path');

module.exports = {
    baseUrl: 'http://localhost:3000',
    gridUrl: 'http://0.0.0.0:4444/wd/hub',
    sets: {
        desktop: {
            files: 'tests/hermione',
        },
    },
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
            },
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
            },
        },
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'coverage/hermione',
        },
    },
    screenshotsDir: test => path.join(
        path.dirname(test.file), 'screens', test.id(), test.browserId
    )
};
